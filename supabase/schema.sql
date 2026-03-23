create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  role text not null,
  children_count text,
  planning_time text not null,
  frustrations jsonb not null,
  interest text not null,
  valuable_features text[] not null,
  must_have text,
  source text not null default 'landing'
);

-- Guardamos email normalizado en minúsculas desde la API.
create unique index if not exists leads_email_key on public.leads (email);

alter table public.leads enable row level security;

-- Sin políticas públicas: ningún cliente anónimo/autenticado inserta directo.
-- Las inserciones se hacen desde /api/lead con SUPABASE_SERVICE_ROLE_KEY.
