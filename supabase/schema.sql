create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  role text not null default 'parent',
  children_count text,
  school_name text,
  planning_time text not null,
  frustrations jsonb not null,
  interest text not null,
  school_integration text,
  source text not null default 'landing_b2c'
);

-- Compatibilidad si vienes del esquema anterior:
alter table public.leads add column if not exists school_name text;
alter table public.leads add column if not exists school_integration text;
alter table public.leads alter column role set default 'parent';

-- Guardamos email normalizado en minúsculas desde la API.
create unique index if not exists leads_email_key on public.leads (email);

alter table public.leads enable row level security;

-- Sin políticas públicas: ningún cliente anónimo/autenticado inserta directo.
-- Las inserciones se hacen desde /api/lead con SUPABASE_SERVICE_ROLE_KEY.
