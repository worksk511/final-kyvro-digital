create table public.quote_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  business text,
  email text not null,
  phone text,
  help_with text not null,
  has_website text not null,
  timeline text,
  details text
);

alter table public.quote_enquiries enable row level security;

-- Anyone (including anonymous visitors) can submit a quote enquiry
create policy "Anyone can submit a quote enquiry"
on public.quote_enquiries
for insert
to anon, authenticated
with check (true);

-- No one can read enquiries from the client (owner reviews them in the database dashboard)
-- Intentionally no SELECT policy.