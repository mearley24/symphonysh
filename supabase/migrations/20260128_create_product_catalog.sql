-- Product catalog + packages (SnapAV-oriented)
-- Notes:
-- - Specs/manual URLs are preferred sources of truth.
-- - Pricing is stored for INTERNAL reference (price_history) and should not be exposed publicly.

-- Extensions (safe no-op if already enabled)
create extension if not exists pgcrypto;

-- Brands / categories
create table if not exists public.product_brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  website text,
  created_at timestamptz not null default now()
);

create table if not exists public.product_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  parent_id uuid references public.product_categories(id) on delete set null,
  created_at timestamptz not null default now()
);

-- Core product table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),

  -- Vendor SKU / model info
  vendor text not null default 'snapav',
  vendor_sku text not null,
  model text,
  name text not null,

  brand_id uuid references public.product_brands(id) on delete set null,
  category_id uuid references public.product_categories(id) on delete set null,

  -- Public references
  product_url text,
  manual_url text,
  datasheet_url text,

  -- Flexible specs: ports, poe_budget_w, wifi_standard, uplink_speed, etc.
  specs jsonb not null default '{}'::jsonb,

  -- Flags
  is_active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (vendor, vendor_sku)
);

create index if not exists products_vendor_sku_idx on public.products(vendor, vendor_sku);
create index if not exists products_brand_idx on public.products(brand_id);
create index if not exists products_category_idx on public.products(category_id);

-- Price history (INTERNAL)
create table if not exists public.product_price_history (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  vendor text not null default 'snapav',
  currency text not null default 'USD',

  -- Store integer cents to avoid float issues
  price_cents integer not null check (price_cents >= 0),

  scraped_at timestamptz not null default now(),
  source text not null default 'manual',

  created_at timestamptz not null default now()
);

create index if not exists product_price_history_product_idx on public.product_price_history(product_id, scraped_at desc);

-- Packages (public-facing uses only starting_at_installed_cents)
create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),

  service_slug text not null, -- e.g. 'networking'
  tier_name text not null,    -- e.g. '1Gb' | '2.5Gb' | '10Gb'

  title text,
  description text,
  brand_stack text, -- freeform: e.g. 'Araknis + WattBox'

  -- What we show on the website
  starting_at_installed_cents integer,
  starting_at_note text,

  -- Internal calculation context
  assumptions jsonb not null default '{}'::jsonb,

  is_active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (service_slug, tier_name)
);

create index if not exists packages_service_idx on public.packages(service_slug);

create table if not exists public.package_items (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.packages(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,

  qty integer not null default 1 check (qty > 0),
  role text, -- e.g. 'router', 'switch', 'ap', 'ups', 'rack'

  created_at timestamptz not null default now(),

  unique (package_id, product_id)
);

create index if not exists package_items_package_idx on public.package_items(package_id);

-- updated_at trigger helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

drop trigger if exists set_packages_updated_at on public.packages;
create trigger set_packages_updated_at
before update on public.packages
for each row
execute function public.set_updated_at();
