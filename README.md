# cocapn.ai — The Agent Runtime 🦀

You don't need a thousand dependencies to run AI agents.

This is a forkable agent runtime you can deploy and control today. Many platforms lock you in or require persistent servers. This is built for people who want something that works and is theirs.

**Live Playground:** https://cocapn-ai.casey-digennaro.workers.dev

## Quick Start

1. **Fork** this repository.
2. **Deploy** to Cloudflare Workers. It's one file with zero dependencies.
3. **Edit** `src/index.js` to adjust models, credits, or prompts.

## How It Works

The runtime is a single Cloudflare Worker that orchestrates AI agents on the edge. It provides a public playground, configurable credit system, and multi-provider routing. User API keys are handled client-side for security.

## Features

*   **Anonymous Credit System**: Visitors get trial credits based on a fingerprint. No account required.
*   **Client-Side BYOK Routing**: When users bring their own keys, requests go directly from their browser to the provider. Your worker never touches them.
*   **Multi-Provider Support**: Works with OpenAI, Anthropic, DeepSeek, and others. Configurable failover.
*   **Zero Dependencies**: A single JavaScript file. No build step, no `node_modules`.
*   **Fork First**: No upstream to break your deployment. Once forked, it's yours.
*   **Global Edge Network**: Deploys to Cloudflare's edge for low latency.

## Limitations

The anonymous credit system uses a browser fingerprint, which users can clear. It's not suitable for strict per-user accounting.

## What Makes This Different

*   **No Proxy for BYOK**: User API keys are never sent to your worker.
*   **No Breaking Updates**: Fork it once, and it will keep working.
*   **Free Tier Friendly**: Runs on Cloudflare's free tier.
*   **No Company, No Hidden Costs**: This is open source code, not a product.

## Contributing

This project is part of the Cocapn Fleet. Fork the repository to create your own vessel. Pull requests are welcome for bug fixes and improvements that benefit the whole fleet.

## License

MIT

Superinstance & Lucineer (DiGennaro et al.)

---

<div align="center">
  <a href="https://the-fleet.casey-digennaro.workers.dev">The Fleet</a> • 
  <a href="https://cocapn.ai">Cocapn</a>
</div>