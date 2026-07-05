-- MANAM Platform — Initial Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('requestor', 'caretaker', 'admin')),
  full_name text not null,
  phone text,
  email text,
  created_at timestamptz default now()
);

-- Auto-create profile on sign-up
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, role, full_name, phone, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'requestor'),
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'phone', ''),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ============================================================
-- PARENT PROFILES
-- ============================================================
create table parent_profiles (
  id uuid primary key default uuid_generate_v4(),
  requestor_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  age integer,
  address text,
  city text,
  state text,
  photo_url text,
  health_notes text,
  primary_physician text,
  physician_phone text,
  insurance_provider text,
  insurance_policy_number text,
  emergency_contact_name text,
  emergency_contact_phone text,
  created_at timestamptz default now()
);

-- ============================================================
-- HEALTH RECORDS
-- ============================================================
create table health_records (
  id uuid primary key default uuid_generate_v4(),
  parent_id uuid not null references parent_profiles(id) on delete cascade,
  file_url text not null,
  file_name text,
  file_type text,
  notes text,
  uploaded_by uuid references profiles(id),
  uploaded_at timestamptz default now()
);

-- ============================================================
-- SERVICE PLANS
-- ============================================================
create table service_plans (
  id uuid primary key default uuid_generate_v4(),
  requestor_id uuid not null references profiles(id) on delete cascade,
  caretaker_id uuid references profiles(id),
  parent_id uuid not null references parent_profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'active', 'paused', 'cancelled')),
  services text[] default '{}',
  monthly_cost integer default 0,
  start_date date,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- VISITS
-- ============================================================
create table visits (
  id uuid primary key default uuid_generate_v4(),
  plan_id uuid references service_plans(id) on delete cascade,
  caretaker_id uuid not null references profiles(id),
  parent_id uuid not null references parent_profiles(id),
  scheduled_at timestamptz not null,
  checked_in_at timestamptz,
  checked_out_at timestamptz,
  gps_checkin jsonb,   -- { lat, lng }
  gps_checkout jsonb,
  notes text,
  status text not null default 'scheduled' check (status in ('scheduled', 'in_progress', 'completed', 'missed')),
  created_at timestamptz default now()
);

-- ============================================================
-- VISIT TASKS (checklist per visit)
-- ============================================================
create table visit_tasks (
  id uuid primary key default uuid_generate_v4(),
  visit_id uuid not null references visits(id) on delete cascade,
  task_name text not null,
  completed boolean default false,
  completed_at timestamptz,
  created_at timestamptz default now()
);

-- ============================================================
-- VISIT UPLOADS (photos, receipts, documents)
-- ============================================================
create table visit_uploads (
  id uuid primary key default uuid_generate_v4(),
  visit_id uuid not null references visits(id) on delete cascade,
  uploaded_by uuid references profiles(id),
  file_url text not null,
  file_name text,
  file_type text check (file_type in ('photo', 'receipt', 'document', 'health_report')),
  notes text,
  uploaded_at timestamptz default now()
);

-- ============================================================
-- RIDE REQUESTS
-- ============================================================
create table ride_requests (
  id uuid primary key default uuid_generate_v4(),
  parent_id uuid not null references parent_profiles(id),
  requestor_id uuid references profiles(id),
  caretaker_id uuid references profiles(id),
  origin_address text not null,
  destination_address text not null,
  scheduled_at timestamptz not null,
  status text not null default 'requested' check (status in ('requested', 'assigned', 'in_progress', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz default now()
);

-- ============================================================
-- EMERGENCY LOGS
-- ============================================================
create table emergency_logs (
  id uuid primary key default uuid_generate_v4(),
  parent_id uuid references parent_profiles(id),
  reported_by uuid references profiles(id),
  type text,
  description text,
  resolved_at timestamptz,
  created_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

alter table profiles enable row level security;
alter table parent_profiles enable row level security;
alter table health_records enable row level security;
alter table service_plans enable row level security;
alter table visits enable row level security;
alter table visit_tasks enable row level security;
alter table visit_uploads enable row level security;
alter table ride_requests enable row level security;
alter table emergency_logs enable row level security;

-- Profiles: users can read their own
create policy "Users can read own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Admin reads all profiles
create policy "Admin reads all profiles" on profiles for select
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Parent profiles: requestor owns theirs, caretaker reads assigned, admin reads all
create policy "Requestors manage own parent profiles" on parent_profiles
  using (requestor_id = auth.uid());

create policy "Caretakers read assigned parent profiles" on parent_profiles for select
  using (exists (
    select 1 from service_plans
    where service_plans.parent_id = parent_profiles.id
    and service_plans.caretaker_id = auth.uid()
  ));

create policy "Admin reads all parent profiles" on parent_profiles for select
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Service plans
create policy "Requestors manage own plans" on service_plans
  using (requestor_id = auth.uid());

create policy "Caretakers read assigned plans" on service_plans for select
  using (caretaker_id = auth.uid() or caretaker_id is null);

create policy "Caretakers accept plans" on service_plans for update
  using (caretaker_id = auth.uid() or caretaker_id is null);

create policy "Admin manages all plans" on service_plans
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Visits
create policy "Caretakers manage own visits" on visits
  using (caretaker_id = auth.uid());

create policy "Requestors read visits for their parent" on visits for select
  using (exists (
    select 1 from parent_profiles
    where parent_profiles.id = visits.parent_id
    and parent_profiles.requestor_id = auth.uid()
  ));

create policy "Admin reads all visits" on visits
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Storage buckets (run separately in Supabase dashboard or via CLI)
-- Bucket: visit-uploads (for photos, receipts)
-- Bucket: health-records (for medical documents)
