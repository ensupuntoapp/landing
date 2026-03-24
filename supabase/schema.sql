create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  role text not null default 'parent',
  children_count text not null,
  school_name text,
  planning_time text not null,
  frustrations jsonb not null,
  interest text not null,
  school_integration text not null,
  source text not null default 'landing_b2c'
);

-- Compatibilidad si vienes del esquema anterior:
alter table public.leads add column if not exists school_name text;
alter table public.leads add column if not exists school_integration text;
alter table public.leads alter column role set default 'parent';

-- Guardamos email normalizado en minúsculas desde la API.
create unique index if not exists leads_email_key on public.leads (email);

-- Restricciones alineadas con app/page.tsx + app/api/lead/route.ts.
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'leads_role_check'
      and conrelid = 'public.leads'::regclass
  ) then
    alter table public.leads
      add constraint leads_role_check
      check (role = 'parent') not valid;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'leads_children_count_check'
      and conrelid = 'public.leads'::regclass
  ) then
    alter table public.leads
      add constraint leads_children_count_check
      check (children_count is not null and children_count in ('1', '2', '3+')) not valid;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'leads_planning_time_check'
      and conrelid = 'public.leads'::regclass
  ) then
    alter table public.leads
      add constraint leads_planning_time_check
      check (planning_time in ('lt30', '30to60', '1to2h', 'gt2h')) not valid;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'leads_interest_check'
      and conrelid = 'public.leads'::regclass
  ) then
    alter table public.leads
      add constraint leads_interest_check
      check (interest in ('definitely_yes', 'probably_yes', 'not_sure', 'probably_no', 'definitely_no')) not valid;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'leads_school_integration_check'
      and conrelid = 'public.leads'::regclass
  ) then
    alter table public.leads
      add constraint leads_school_integration_check
      check (school_integration is not null and school_integration in ('yes_time_saver', 'neutral', 'not_needed')) not valid;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'leads_school_name_len_check'
      and conrelid = 'public.leads'::regclass
  ) then
    alter table public.leads
      add constraint leads_school_name_len_check
      check (school_name is null or char_length(school_name) <= 160) not valid;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'leads_source_check'
      and conrelid = 'public.leads'::regclass
  ) then
    alter table public.leads
      add constraint leads_source_check
      check (source = 'landing_b2c') not valid;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'leads_frustrations_shape_check'
      and conrelid = 'public.leads'::regclass
  ) then
    alter table public.leads
      add constraint leads_frustrations_shape_check
      check (
        jsonb_typeof(frustrations) = 'object'
        and frustrations ? 'daily_decision'
        and frustrations ? 'food_waste'
        and (frustrations ->> 'daily_decision') ~ '^[1-5]$'
        and (frustrations ->> 'food_waste') ~ '^[1-5]$'
      ) not valid;
  end if;
end $$;

alter table public.leads enable row level security;

-- Sin políticas públicas: ningún cliente anónimo/autenticado inserta directo.
-- Las inserciones se hacen desde /api/lead con SUPABASE_SERVICE_ROLE_KEY.
