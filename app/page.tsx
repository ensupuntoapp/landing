"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  Calendar,
  ShoppingCart,
  Clock,
  CheckCircle,
  School,
  ChefHat,
  ListChecks,
  Brain,
  Leaf,
  Users,
  Shield,
} from "lucide-react";

type ChildrenCount = "1" | "2" | "3+";
type PlanningTime = "lt30" | "30to60" | "1to2h" | "gt2h";
type InterestLevel =
  | "definitely_yes"
  | "probably_yes"
  | "not_sure"
  | "probably_no"
  | "definitely_no";
type SchoolIntegration = "yes_time_saver" | "neutral" | "not_needed";

interface SurveyFormValues {
  email: string;
  website: string;
  childrenCount: ChildrenCount | "";
  schoolName: string;
  planningTime: PlanningTime | "";
  frustrationDecision: number;
  frustrationWaste: number;
  interest: InterestLevel | "";
  schoolIntegration: SchoolIntegration | "";
}

interface FormErrors {
  email?: string;
  childrenCount?: string;
  planningTime?: string;
  interest?: string;
  schoolIntegration?: string;
}

const planningTimeOptions: Array<{ value: PlanningTime; label: string }> = [
  { value: "lt30", label: "Menos de 30 minutos" },
  { value: "30to60", label: "30 min - 1 hora" },
  { value: "1to2h", label: "1-2 horas" },
  { value: "gt2h", label: "Más de 2 horas" },
];

const interestOptions: Array<{ value: InterestLevel; label: string }> = [
  { value: "definitely_yes", label: "Definitivamente sí" },
  { value: "probably_yes", label: "Probablemente sí" },
  { value: "not_sure", label: "No estoy seguro/a" },
  { value: "probably_no", label: "Probablemente no" },
  { value: "definitely_no", label: "Definitivamente no" },
];

const schoolIntegrationOptions: Array<{ value: SchoolIntegration; label: string }> = [
  { value: "yes_time_saver", label: "Sí, me ahorraría mucho tiempo" },
  { value: "neutral", label: "Me daría igual" },
  { value: "not_needed", label: "No lo veo necesario" },
];

const scoreOptions = [1, 2, 3, 4, 5];

const initialFormValues: SurveyFormValues = {
  email: "",
  website: "",
  childrenCount: "",
  schoolName: "",
  planningTime: "",
  frustrationDecision: 3,
  frustrationWaste: 3,
  interest: "",
  schoolIntegration: "",
};

function validateEmail(value: string): boolean {
  const trimmed = value.trim();
  const atPosition = trimmed.indexOf("@");
  const dotPosition = trimmed.lastIndexOf(".");
  return atPosition > 0 && dotPosition > atPosition + 1 && dotPosition < trimmed.length - 1;
}

function HeroSection() {
  const bullets = [
    "Ahorra 2-3h cada semana",
    "Menos desperdicio de comida",
    "Cenas equilibradas sin esfuerzo",
  ];

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white via-emerald-50/60 to-slate-50">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-200/50 blur-3xl" />
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-sm font-semibold text-emerald-900">
              Lanzamiento primavera 2026
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Deja de pensar qué cocinar cada día
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-700 sm:text-xl">
            Recibe cenas semanales para tu familia basadas en lo que tus hijos han comido en el
            colegio.
          </p>
          <ul className="mt-8 space-y-3 text-base font-medium text-slate-800">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-sm text-white">
                  ✓
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#encuesta"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-300/40 transition hover:bg-emerald-700"
            >
              Quiero mi menú semanal
            </a>
            <p className="text-sm text-slate-600">
              Acceso anticipado • <span className="font-semibold">Primeras 100 familias</span>
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-emerald-100/80">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">
              Así se ve tu semana en EnSuPunto
            </p>
            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <School className="h-4 w-4" />
                  Colegio (mediodía)
                </div>
                <p className="mt-2 font-semibold text-slate-900">Legumbres + pollo + fruta</p>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-800">
                  <ChefHat className="h-4 w-4" />
                  Tu cena recomendada
                </div>
                <p className="mt-2 font-semibold text-slate-900">
                  Crema + pescado al horno + yogur
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <ShoppingCart className="h-4 w-4" />
                  Lista de la compra
                </div>
                <p className="mt-2 font-semibold text-slate-900">Todo calculado para 7 días</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const cards = [
    {
      title: "No sé qué cocinar hoy",
      description:
        "La pregunta diaria te quita energía y acaba en improvisación de última hora.",
      icon: Brain,
    },
    {
      title: "Se desperdicia comida",
      description:
        "Compras sin plan claro y terminas tirando parte de lo que hay en la nevera.",
      icon: Leaf,
    },
    {
      title: "Todo recae en ti",
      description:
        "Planificar menús, comprar y coordinar horarios añade carga mental cada semana.",
      icon: Users,
    },
  ];

  return (
    <section id="problema" className="border-b border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 md:py-24">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          ¿Te suena familiar?
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                  <Icon className="h-6 w-6 text-emerald-700" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-3 text-slate-600">{card.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Indica el colegio de tus hijos",
      icon: School,
    },
    {
      number: "2",
      title: "Recibe cenas personalizadas automáticamente",
      icon: ChefHat,
    },
    {
      number: "3",
      title: "Obtén tu lista de la compra lista",
      icon: ShoppingCart,
    },
  ];

  return (
    <section id="como-funciona" className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 md:py-24">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Así de simple
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.number} className="rounded-2xl border border-slate-200 bg-white p-7">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
                    {step.number}
                  </span>
                  <Icon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{step.title}</h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProductMockupSection() {
  return (
    <section id="producto" className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 md:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Tu copiloto de alimentación familiar
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Mira cómo funciona EnSuPunto en tu día a día
          </p>
        </div>

        {/* Product Mockup */}
        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/10 sm:p-8">
          {/* Fake browser chrome */}
          <div className="mb-6 flex items-center gap-2 border-b border-slate-200 pb-4">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-slate-300"></div>
              <div className="h-3 w-3 rounded-full bg-slate-300"></div>
              <div className="h-3 w-3 rounded-full bg-slate-300"></div>
            </div>
            <div className="ml-4 flex-1 rounded-lg bg-slate-100 px-4 py-1.5 text-xs text-slate-600">
              app.ensupunto.es/semana
            </div>
          </div>

          {/* Mockup grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left: School context */}
            <div className="space-y-4 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex items-center gap-2">
                <School className="h-5 w-5 text-emerald-700" />
                <h3 className="text-sm font-semibold text-emerald-900">
                  Comida en el colegio (hoy)
                </h3>
              </div>
              <div className="space-y-3">
                <div className="rounded-lg bg-white p-3">
                  <p className="text-sm font-medium text-slate-900">Lentejas estofadas</p>
                  <p className="mt-1 text-xs text-slate-600">Legumbres • Verduras</p>
                </div>
                <div className="rounded-lg bg-white p-3">
                  <p className="text-sm font-medium text-slate-900">Pollo al horno</p>
                  <p className="mt-1 text-xs text-slate-600">Proteína • Bajo en grasa</p>
                </div>
                <div className="rounded-lg bg-white p-3">
                  <p className="text-sm font-medium text-slate-900">Fruta de temporada</p>
                  <p className="mt-1 text-xs text-slate-600">Vitaminas</p>
                </div>
              </div>
            </div>

            {/* Center: Weekly plan */}
            <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-slate-700" />
                  <h3 className="text-sm font-semibold text-slate-900">Tu menú semanal</h3>
                </div>
                <button className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700">
                  Generar nuevo
                </button>
              </div>

              <div className="space-y-2">
                {[
                  { day: "Lunes", dinner: "Crema de calabaza + Merluza", time: "25 min", completed: true },
                  { day: "Martes", dinner: "Ensalada completa + Tortilla", time: "20 min", completed: true },
                  { day: "Miércoles", dinner: "Sopa de fideos + Pollo limón", time: "30 min", completed: false },
                  { day: "Jueves", dinner: "Revuelto de setas + Pan integral", time: "15 min", completed: false },
                  { day: "Viernes", dinner: "Verduras al vapor + Salmón", time: "25 min", completed: false },
                ].map((item) => (
                  <div
                    key={item.day}
                    className={`flex items-center justify-between rounded-lg border p-3 text-sm transition ${
                      item.completed
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-slate-200 bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        readOnly
                        className="h-4 w-4 rounded border-slate-300 text-emerald-600"
                      />
                      <div>
                        <p className="font-medium text-slate-900">{item.day}</p>
                        <p className="text-xs text-slate-600">{item.dinner}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="h-3 w-3" />
                      {item.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shopping list */}
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-slate-700" />
                <h3 className="text-sm font-semibold text-slate-900">
                  Lista de compra (cantidades exactas)
                </h3>
              </div>
              <button className="text-xs font-medium text-emerald-700 transition hover:text-emerald-800">
                Exportar PDF →
              </button>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { item: "Merluza", qty: "400g", checked: false },
                { item: "Calabaza", qty: "600g", checked: false },
                { item: "Huevos", qty: "6 uds", checked: true },
                { item: "Limones", qty: "3 uds", checked: false },
                { item: "Setas", qty: "250g", checked: false },
                { item: "Pan integral", qty: "1 barra", checked: true },
                { item: "Salmón", qty: "300g", checked: false },
                { item: "Fideos", qty: "200g", checked: false },
              ].map((item, i) => (
                <label
                  key={i}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg p-2 text-xs transition ${
                    item.checked
                      ? "bg-emerald-100 text-emerald-900 line-through"
                      : "bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    readOnly
                    className="h-3 w-3 rounded border-slate-300 text-emerald-600"
                  />
                  <span>
                    {item.item}: <span className="font-medium">{item.qty}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* CTA after mockup */}
        <div className="mt-12 text-center">
          <a
            href="#encuesta"
            className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-300/40 transition hover:bg-emerald-700"
          >
            Quiero probarlo primero →
          </a>
          <p className="mt-4 text-sm text-slate-600">
            Acceso gratuito al piloto • Sin tarjeta • Primeras 100 familias
          </p>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      title: "Menos carga mental diaria",
      icon: Brain,
      color: "emerald",
    },
    {
      title: "Menos comida desperdiciada",
      icon: Leaf,
      color: "emerald",
    },
    {
      title: "Más organización familiar",
      icon: ListChecks,
      color: "emerald",
    },
    {
      title: "Cenas equilibradas sin pensar",
      icon: CheckCircle,
      color: "emerald",
    },
  ];

  return (
    <section id="beneficios" className="border-b border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 md:py-24">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Beneficios para tu familia
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article
                key={benefit.title}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                  <Icon className="h-6 w-6 text-emerald-700" />
                </div>
                <p className="text-lg font-semibold text-slate-900">{benefit.title}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SocialProofSection() {
  const testimonials = [
    {
      quote:
        "Con una propuesta cerrada de cenas, por fin dejamos de discutir qué preparar cada noche.",
      author: "Marta",
      context: "Madre de 2 niños, Pozuelo",
    },
    {
      quote:
        "Antes improvisaba y compraba de más. Ahora tengo una guía semanal y desperdiciamos mucho menos.",
      author: "Carlos",
      context: "Padre de primaria, Chamberí",
    },
    {
      quote: "Me ahorra tiempo mental. Solo abro la app, veo plan y listo.",
      author: "Lucía",
      context: "Madre de 1 niño, Las Rozas",
    },
  ];

  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 md:py-24">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Pensado para familias como la tuya
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.author} className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-slate-700">"{item.quote}"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                  {item.author[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.author}</p>
                  <p className="text-xs text-slate-600">{item.context}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

interface SurveySectionProps {
  formValues: SurveyFormValues;
  errors: FormErrors;
  submitSuccess: boolean;
  submitError: string | null;
  isSubmitting: boolean;
  onInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  onInterestChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSchoolIntegrationChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function SurveySection({
  formValues,
  errors,
  submitSuccess,
  submitError,
  isSubmitting,
  onInputChange,
  onInterestChange,
  onSchoolIntegrationChange,
  onSubmit,
}: SurveySectionProps) {
  return (
    <section id="encuesta" className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 sm:px-10 md:py-24 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1">
            <span className="text-xs font-semibold text-emerald-900">PASO 1 DE 2</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Empieza a planificar sin estrés
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Déjanos tus datos y te avisamos cuando abramos el acceso para familias.
          </p>
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <span>Gratis durante el piloto</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <span>Sin tarjeta ni compromiso</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <span>Solo primeras 100 familias</span>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <Shield className="h-5 w-5 text-slate-600" />
            <p className="text-xs text-slate-600">
              Tus datos están protegidos según RGPD. Lee nuestra{" "}
              <a href="/privacidad" className="font-medium text-emerald-700 underline">
                Política de Privacidad
              </a>
            </p>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-7 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8"
        >
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            value={formValues.website}
            onChange={onInputChange}
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            className="hidden"
          />

          {/* Section 1: Basic info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                1
              </span>
              <h3 className="text-sm font-semibold text-slate-900">Información básica</h3>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-800">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={onInputChange}
                placeholder="tu@email.com"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-emerald-500 transition focus:ring-2"
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="childrenCount" className="block text-sm font-semibold text-slate-800">
                  ¿Cuántos hijos tienes? *
                </label>
                <select
                  id="childrenCount"
                  name="childrenCount"
                  value={formValues.childrenCount}
                  onChange={onInputChange}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-emerald-500 transition focus:ring-2"
                >
                  <option value="">Selecciona</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3+">3 o más</option>
                </select>
                {errors.childrenCount && (
                  <p className="mt-2 text-sm text-red-600">{errors.childrenCount}</p>
                )}
              </div>

              <div>
                <label htmlFor="schoolName" className="block text-sm font-semibold text-slate-800">
                  Colegio <span className="font-normal text-slate-500">(opcional)</span>
                </label>
                <input
                  id="schoolName"
                  name="schoolName"
                  type="text"
                  value={formValues.schoolName}
                  onChange={onInputChange}
                  placeholder="Ej: San José (Madrid)"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-emerald-500 transition focus:ring-2"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Situation */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                2
              </span>
              <h3 className="text-sm font-semibold text-slate-900">Tu situación actual</h3>
            </div>

            <div>
              <label htmlFor="planningTime" className="block text-sm font-semibold text-slate-800">
                ¿Cuánto tiempo dedicas semanalmente a planificar qué cocinar? *
              </label>
              <p className="mt-1 text-xs text-slate-500">
                Nos ayuda a entender tu punto de partida
              </p>
              <select
                id="planningTime"
                name="planningTime"
                value={formValues.planningTime}
                onChange={onInputChange}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-emerald-500 transition focus:ring-2"
              >
                <option value="">Selecciona una opción</option>
                {planningTimeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.planningTime && (
                <p className="mt-2 text-sm text-red-600">{errors.planningTime}</p>
              )}
            </div>

            <fieldset>
              <legend className="text-sm font-semibold text-slate-800">
                ¿Cuánto te identificas con estas frases?
              </legend>
              <p className="mt-1 text-xs text-slate-500">1 = nada, 5 = mucho</p>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="frustrationDecision" className="block text-sm text-slate-700">
                    Me cuesta decidir qué cocinar cada día
                  </label>
                  <select
                    id="frustrationDecision"
                    name="frustrationDecision"
                    value={formValues.frustrationDecision}
                    onChange={onInputChange}
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-emerald-500 transition focus:ring-2"
                  >
                    {scoreOptions.map((score) => (
                      <option key={score} value={score}>
                        {score}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="frustrationWaste" className="block text-sm text-slate-700">
                    Siento que desperdiciamos comida
                  </label>
                  <select
                    id="frustrationWaste"
                    name="frustrationWaste"
                    value={formValues.frustrationWaste}
                    onChange={onInputChange}
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-emerald-500 transition focus:ring-2"
                  >
                    {scoreOptions.map((score) => (
                      <option key={score} value={score}>
                        {score}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>
          </div>

          {/* Section 3: Interest */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                3
              </span>
              <h3 className="text-sm font-semibold text-slate-900">Tu interés</h3>
            </div>

            <fieldset>
              <legend className="text-sm font-semibold text-slate-800">
                Si existiera una app que generara menús para tu familia según lo que comió tu hijo
                en el colegio, ¿la usarías? *
              </legend>
              <div className="mt-3 space-y-2">
                {interestOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                      formValues.interest === option.value
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-300 bg-white hover:border-slate-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="interest"
                      value={option.value}
                      checked={formValues.interest === option.value}
                      onChange={onInterestChange}
                      className="mt-0.5 h-4 w-4 accent-emerald-600"
                    />
                    <span className="text-slate-700">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.interest && <p className="mt-2 text-sm text-red-600">{errors.interest}</p>}
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-slate-800">
                ¿Te gustaría que tu colegio estuviera integrado automáticamente? *
              </legend>
              <div className="mt-3 space-y-2">
                {schoolIntegrationOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                      formValues.schoolIntegration === option.value
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-300 bg-white hover:border-slate-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="schoolIntegration"
                      value={option.value}
                      checked={formValues.schoolIntegration === option.value}
                      onChange={onSchoolIntegrationChange}
                      className="mt-0.5 h-4 w-4 accent-emerald-600"
                    />
                    <span className="text-slate-700">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.schoolIntegration && (
                <p className="mt-2 text-sm text-red-600">{errors.schoolIntegration}</p>
              )}
            </fieldset>
          </div>

          <div className="space-y-4 border-t border-slate-200 pt-6">
            <p className="text-xs leading-relaxed text-slate-500">
              Al enviar este formulario, aceptas que guardemos tus datos para informarte sobre el
              proyecto. Podrás darte de baja en cualquier momento escribiendo a hola@ensupunto.es
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-300/40 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Enviando..." : "Quiero acceso prioritario"}
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Datos protegidos
              </span>
              <span>•</span>
              <span>Sin spam</span>
              <span>•</span>
              <span>Cancelación fácil</span>
            </div>
          </div>

          {submitSuccess && (
            <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-700" />
                <div>
                  <p className="font-semibold text-emerald-900">¡Perfecto!</p>
                  <p className="mt-1 text-sm text-emerald-800">
                    Te avisaremos en cuanto abramos acceso prioritario. Revisa tu email en los
                    próximos días.
                  </p>
                </div>
              </div>
            </div>
          )}
          {submitError && (
            <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
              {submitError}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function TeamSection() {
  const members: Array<{
    name: string;
    jobTitle: string;
    bio: string;
    imageSrc: string;
  }> = [
    {
      name: "Rubén Blanco Baeza",
      jobTitle: "CTO & Co-founder",
      bio: "Ingeniero de software especializado en arquitectura y sistemas distribuidos. En EnSuPunto convierte complejidad técnica en una experiencia simple para familias.",
      imageSrc: "/founders/ruben.png",
    },
    {
      name: "Iván",
      jobTitle: "CEO & Co-founder",
      bio: "Lidera producto y crecimiento con foco en resolver problemas reales del día a día de los hogares con hijos.",
      imageSrc: "/founders/ivan.png",
    },
  ];

  return (
    <section id="equipo" className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 md:py-24">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Quiénes somos
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {members.map((member) => (
            <article key={member.name} className="rounded-2xl border border-slate-200 bg-white p-6">
              <Image
                src={member.imageSrc}
                alt={`Foto de ${member.name}`}
                width={112}
                height={112}
                className="h-28 w-28 rounded-2xl border border-slate-300 object-cover"
              />
              <h3 className="mt-5 text-xl font-semibold text-slate-900">{member.name}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-emerald-700">
                {member.jobTitle}
              </p>
              <p className="mt-3 text-slate-600">{member.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p>Contacto: hola@ensupunto.es</p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://www.linkedin.com/company/ensupuntoapp/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/ensupuntoapp"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            Instagram
          </a>
          <a
            href="https://x.com/ensupuntoapp"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            X / Twitter
          </a>
          <a href="/privacidad" className="transition hover:text-white">
            Política de privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const [formValues, setFormValues] = useState<SurveyFormValues>(initialFormValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setSubmitSuccess(false);
    setSubmitError(null);
    setErrors((previous) => ({ ...previous, [name]: undefined }));

    if (name === "frustrationDecision" || name === "frustrationWaste") {
      setFormValues((previous) => ({
        ...previous,
        [name]: Number(value),
      }));
      return;
    }

    setFormValues((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleInterestChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedInterest = event.target.value as InterestLevel;
    setSubmitSuccess(false);
    setSubmitError(null);
    setErrors((previous) => ({ ...previous, interest: undefined }));
    setFormValues((previous) => ({ ...previous, interest: selectedInterest }));
  };

  const handleSchoolIntegrationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as SchoolIntegration;
    setSubmitSuccess(false);
    setSubmitError(null);
    setErrors((previous) => ({ ...previous, schoolIntegration: undefined }));
    setFormValues((previous) => ({ ...previous, schoolIntegration: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const newErrors: FormErrors = {};
    const trimmedEmail = formValues.email.trim();
    const trimmedSchool = formValues.schoolName.trim();

    if (!validateEmail(trimmedEmail)) {
      newErrors.email = "Introduce un email válido.";
    }
    if (!formValues.childrenCount) {
      newErrors.childrenCount = "Selecciona cuántos hijos tienes.";
    }
    if (!formValues.planningTime) {
      newErrors.planningTime = "Selecciona una opción.";
    }
    if (!formValues.interest) {
      newErrors.interest = "Selecciona una opción.";
    }
    if (!formValues.schoolIntegration) {
      newErrors.schoolIntegration = "Selecciona una opción.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setSubmitSuccess(false);
      return;
    }

    const payload = {
      email: trimmedEmail,
      website: formValues.website,
      childrenCount: formValues.childrenCount,
      schoolName: trimmedSchool,
      planningTime: formValues.planningTime,
      frustrations: {
        daily_decision: formValues.frustrationDecision,
        food_waste: formValues.frustrationWaste,
      },
      interest: formValues.interest,
      schoolIntegration: formValues.schoolIntegration,
    };

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "No se pudo guardar tu respuesta.");
      }

      setSubmitSuccess(true);
    } catch (error) {
      console.error("Lead submission failed", error);
      setSubmitSuccess(false);
      setSubmitError(
        "No hemos podido guardar tu respuesta ahora mismo. Inténtalo de nuevo en unos minutos.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
          <a href="#" className="text-lg font-bold tracking-tight text-slate-900">
            EnSuPunto
          </a>
          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 md:flex">
              <a href="#como-funciona" className="transition hover:text-slate-900">
                Cómo funciona
              </a>
              <a href="#producto" className="transition hover:text-slate-900">
                Producto
              </a>
              <a href="#encuesta" className="transition hover:text-slate-900">
                Acceso
              </a>
            </nav>
            <a
              href="#encuesta"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Quiero mi menú semanal
            </a>
          </div>
        </div>
      </header>

      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <ProductMockupSection />
        <BenefitsSection />
        <section className="bg-white py-12">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <a
              href="#encuesta"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-emerald-700"
            >
              Quiero mi menú semanal
            </a>

            <p className="mt-3 text-sm text-slate-500">
              Gratis • Sin compromiso • Acceso anticipado
            </p>
          </div>
        </section>
        <SocialProofSection />
        <SurveySection
          formValues={formValues}
          errors={errors}
          submitSuccess={submitSuccess}
          submitError={submitError}
          isSubmitting={isSubmitting}
          onInputChange={handleInputChange}
          onInterestChange={handleInterestChange}
          onSchoolIntegrationChange={handleSchoolIntegrationChange}
          onSubmit={handleSubmit}
        />
        <TeamSection />
      </main>

      <SiteFooter />
    </div>
  );
}