# Catalog + Packages (internal tooling)

Goal: keep a structured product catalog (specs-first) and package definitions that drive "Starting at" installed pricing.

- **Supabase**: canonical storage for products + packages.
- **SQLite**: local working cache for scraping/import and fast iteration.

## What we store

### Products
- `vendor` (default: `snapav`)
- `vendor_sku`
- `name`, `model`
- `brand`, `category`
- `specs` (JSON)
- `manual_url` / `datasheet_url` / `product_url`

### Pricing (internal)
- stored in `product_price_history` (cents, currency, timestamp)
- website should only show **Starting-at installed** totals, not itemized dealer pricing.

## Next steps
- Add a small importer that builds a local sqlite db and syncs into Supabase.
- Add a curated SKU list per service/tier to minimize SnapAV lookups.
