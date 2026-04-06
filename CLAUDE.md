# CLAUDE.md — cocapn.ai

## What This Is
The cocapn.ai playground. A credit-gated chat interface with BYOK support.

## Deployment
- Cloudflare Worker on dad's account (049ff5e84ecf636b53b162cbb580aae6)
- KV: CREDIT_KV (visitor credits, 30-day TTL)
- Secret: DEEPSEEK_API_KEY (playground key)

## Architecture
- /health — health check
- /vessel.json — vessel manifest
- /api/credits — GET remaining credits
- /api/play — POST credit-gated chat (uses DEEPSEEK_API_KEY)
- /api/play/byok — POST unlimited chat (user's own key)
- Landing page — inline HTML, zero dependencies

## Key Decisions
- Credits fingerprinted by IP+UA hash
- BYOK: browser sends directly to provider, never to our servers
- CSP: connect-src https://* for BYOK providers
