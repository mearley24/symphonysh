/**
 * Zapier Catch Hook — single source of truth for appointment notifications.
 *
 * Override in Cloudflare Pages: Project → Settings → Environment variables
 *   VITE_ZAPIER_WEBHOOK_URL = https://hooks.zapier.com/hooks/catch/XXXXX/YYYYY/
 *
 * Zap flow: Webhooks by Zapier (Catch Hook) → Zoho Mail (or filter → Gmail, etc.)
 */
export const ZAPIER_WEBHOOK_URL =
  import.meta.env.VITE_ZAPIER_WEBHOOK_URL ||
  'https://hooks.zapier.com/hooks/catch/22322669/2cwoj8b/';
