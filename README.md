# Cocapn Fleet

You can run a public AI agent playground without requiring user accounts. The entire system runs on a single Cloudflare Worker file with zero dependencies. 🛸

---

## Why this exists
Most AI demos require an email signup before you can test them. This project removes that barrier for prototypes and experiments. You control the rate limits and the code.

**Live playground:** [https://cocapn-ai.casey-digennaro.workers.dev](https://cocapn-ai.casey-digennaro.workers.dev)

---

## Quick start
1.  Fork this repository.
2.  Deploy it to Cloudflare Workers.
3.  Edit the 3 configuration variables in `src/index.js` to set models, credits per session, and prompts.

---

## How it works
Once forked, you run your own instance. There is no upstream connection. You own every line of code that executes.

The credit system operates without accounts or a database. It uses a browser fingerprint hash stored in local storage to track trial usage.

Client-side routing means your worker never handles user API keys—requests go directly from the browser to the provider you select.

---

## Features
- Anonymous trial credits via browser fingerprint
- Client-side BYOK (Bring Your Own Key) routing to providers
- Fallback support for OpenAI, Anthropic, and DeepSeek models
- Included playground UI
- Runs on Cloudflare's edge network
- Fork-first: no forced updates after you deploy

---

## Limitations
The browser fingerprint used for anonymous credits resets when a user clears local storage. In browsers with strict privacy settings, this may happen more frequently than typical session expiration.

---

## Architecture
The project is a single Cloudflare Worker file that serves a static playground UI and manages a configurable credit system. The UI handles provider routing client-side.

## License
MIT

<div style="text-align:center;padding:16px;color:#64748b;font-size:.8rem"><a href="https://the-fleet.casey-digennaro.workers.dev" style="color:#64748b">The Fleet</a> &middot; <a href="https://cocapn.ai" style="color:#64748b">Cocapn</a></div>