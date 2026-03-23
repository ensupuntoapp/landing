import { NextResponse } from "next/server";

type ChildrenCount = "1" | "2" | "3+";
type PlanningTime = "lt30" | "30to60" | "1to2h" | "gt2h";
type InterestLevel =
  | "definitely_yes"
  | "probably_yes"
  | "not_sure"
  | "probably_no"
  | "definitely_no";
type SchoolIntegration = "yes_time_saver" | "neutral" | "not_needed";

interface LeadPayload {
  email: string;
  childrenCount: ChildrenCount;
  schoolName: string;
  planningTime: PlanningTime;
  frustrations: {
    daily_decision: number;
    food_waste: number;
  };
  interest: InterestLevel;
  schoolIntegration: SchoolIntegration;
}

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

const childrenOptions = new Set<ChildrenCount>(["1", "2", "3+"]);
const planningTimes = new Set<PlanningTime>(["lt30", "30to60", "1to2h", "gt2h"]);
const interests = new Set<InterestLevel>([
  "definitely_yes",
  "probably_yes",
  "not_sure",
  "probably_no",
  "definitely_no",
]);
const schoolIntegrationOptions = new Set<SchoolIntegration>([
  "yes_time_saver",
  "neutral",
  "not_needed",
]);

const RATE_LIMIT_MAX_REQUESTS = Number(process.env.LEAD_RATE_LIMIT_MAX_REQUESTS ?? 8);
const RATE_LIMIT_WINDOW_SECONDS = Number(process.env.LEAD_RATE_LIMIT_WINDOW_SECONDS ?? 600);
const RATE_LIMIT_WINDOW_MS = RATE_LIMIT_WINDOW_SECONDS * 1000;

declare global {
  var leadRateLimitStore: Map<string, RateLimitBucket> | undefined;
}

function getRateLimitStore(): Map<string, RateLimitBucket> {
  if (!globalThis.leadRateLimitStore) {
    globalThis.leadRateLimitStore = new Map<string, RateLimitBucket>();
  }
  return globalThis.leadRateLimitStore;
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) {
      return firstIp;
    }
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

function consumeRateLimit(ip: string): { limited: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const store = getRateLimitStore();
  const current = store.get(ip);

  if (!current || current.resetAt <= now) {
    store.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { limited: false, retryAfterSeconds: RATE_LIMIT_WINDOW_SECONDS };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterSeconds = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
    return { limited: true, retryAfterSeconds };
  }

  current.count += 1;
  store.set(ip, current);
  return {
    limited: false,
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
}

function validateEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isValidFrustration(value: number): boolean {
  return Number.isInteger(value) && value >= 1 && value <= 5;
}

function parsePayload(body: unknown): { data?: LeadPayload; error?: string } {
  if (!isObject(body)) {
    return { error: "Cuerpo de petición inválido." };
  }

  const website = String(body.website ?? "").trim();
  if (website.length > 0) {
    return { error: "Solicitud inválida." };
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!validateEmail(email)) {
    return { error: "Email inválido." };
  }

  const childrenCountRaw = String(body.childrenCount ?? "");
  if (!childrenOptions.has(childrenCountRaw as ChildrenCount)) {
    return { error: "Número de hijos inválido." };
  }

  const planningTime = body.planningTime;
  if (typeof planningTime !== "string" || !planningTimes.has(planningTime as PlanningTime)) {
    return { error: "Tiempo de planificación inválido." };
  }

  const interest = body.interest;
  if (typeof interest !== "string" || !interests.has(interest as InterestLevel)) {
    return { error: "Interés inválido." };
  }

  const schoolIntegration = body.schoolIntegration;
  if (
    typeof schoolIntegration !== "string" ||
    !schoolIntegrationOptions.has(schoolIntegration as SchoolIntegration)
  ) {
    return { error: "Opción de integración escolar inválida." };
  }

  const schoolName = String(body.schoolName ?? "").trim();
  if (schoolName.length > 160) {
    return { error: "Nombre de colegio demasiado largo." };
  }

  if (!isObject(body.frustrations)) {
    return { error: "Bloque de frustraciones inválido." };
  }

  const dailyDecision = Number(body.frustrations.daily_decision);
  const foodWaste = Number(body.frustrations.food_waste);

  if (!isValidFrustration(dailyDecision) || !isValidFrustration(foodWaste)) {
    return { error: "Valores de frustración inválidos." };
  }

  return {
    data: {
      email,
      childrenCount: childrenCountRaw as ChildrenCount,
      schoolName,
      planningTime: planningTime as PlanningTime,
      frustrations: {
        daily_decision: dailyDecision,
        food_waste: foodWaste,
      },
      interest: interest as InterestLevel,
      schoolIntegration: schoolIntegration as SchoolIntegration,
    },
  };
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const rateLimitResult = consumeRateLimit(clientIp);
  if (rateLimitResult.limited) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Inténtalo más tarde." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimitResult.retryAfterSeconds) },
      },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = parsePayload(body);
  if (!parsed.data) {
    return NextResponse.json({ error: parsed.error ?? "Payload inválido." }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing Supabase env vars.");
    return NextResponse.json(
      { error: "Configuración del servidor incompleta." },
      { status: 500 },
    );
  }

  const leadToInsert = {
    email: parsed.data.email,
    role: "parent",
    children_count: parsed.data.childrenCount,
    school_name: parsed.data.schoolName || null,
    planning_time: parsed.data.planningTime,
    frustrations: parsed.data.frustrations,
    interest: parsed.data.interest,
    school_integration: parsed.data.schoolIntegration,
    source: "landing_b2c",
  };

  const response = await fetch(`${supabaseUrl}/rest/v1/leads?on_conflict=email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: "return=minimal,resolution=merge-duplicates",
    },
    body: JSON.stringify(leadToInsert),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Supabase insert failed:", errorText);
    return NextResponse.json(
      { error: "No se pudo guardar el lead en este momento." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
