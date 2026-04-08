# cocapn-ai — The Agent Runtime

## Quick Start
This is a Cloudflare Worker. Deploy with `npx wrangler deploy`.

## Architecture
- **Single file**: `src/worker.ts` — all routes, HTML, and logic inline
- **Zero runtime deps** — only Cloudflare Worker APIs + fetch
- **KV binding**: `CREDIT_KV` — fingerprint-based credit tracking (30-day TTL)
- **Secret**: `DEEPSEEK_API_KEY` — used for credit-gated playground chat

## Endpoints
| Route | Method | Description |
|-------|--------|-------------|
| `/` | GET | Landing page (26KB, all sections) |
| `/health` | GET | `{ status: "ok" }` |
| `/vessel.json` | GET | Fleet metadata |
| `/api/credits` | GET | Credit balance (fingerprint-based) |
| `/api/play` | POST | Credit-gated chat (DeepSeek) |
| `/api/play/byok` | POST | Unlimited BYOK chat (6 providers) |
| `/api/discover` | GET | 24 featured vessels |
| `/api/equipment` | GET | 12 equipment modules |
| `/api/archetypes` | GET | 12 domain archetypes |

## Landing Page Sections
1. **Hero** — "The Agent Runtime" + value pills + CTAs
2. **Stats bar** — 64 vessels, 0 keys stored, $0 to fork, 6 providers, 12 equipment
3. **Fleet grid** — 24 clickable vessels with colored status dots
4. **Equipment Catalog** — 12 modules (Trust, Crystal Graph, Keeper, Emergence Bus, etc.)
5. **Domain Archetypes** — 12 specialization templates (Coding, Classroom, DM, Business, etc.)
6. **Pricing table** — Free/Standard/Gold/Enterprise with cost-plus model
7. **How It Works** — 6 concept cards (Fork, BYOK, Equipment, Captain, Emergence, Economy)
8. **Playground** — Credit-gated chat with fleet-aware system prompt
9. **BYOK modal** — 6 providers, localStorage-only keys

## Key Patterns
- **String concatenation** for HTML — no template literals (esbuild compat)
- **Static arrays** for vessels/equipment — avoids CF error 1042 (worker-to-worker fetch blocked)
- **CSP + frame-ancestors 'none'** + X-Frame-Options: DENY on all responses
- **Fingerprint credits**: IP+UA hash → KV with 30-day TTL, 5 free per visitor
- **BYOK flow**: browser stores key in localStorage, sends directly to provider API

## Brand
- Colors: `#7c3aed` (purple), `#00e6d6` (teal accent), `#3b82f6` (blue)
- Theme: dark (`#0a0a0f` bg, `#1a1a2e` surface, `#2a2a4a` border)

## Cloudflare
- Account: `049ff5e84ecf636b53b162cbb580aae6`
- Worker name: `cocapn-ai`
- KV namespace: `426edfb907024c50984b3a74fea8380e` (CREDIT_KV)
- Branch: **master**
