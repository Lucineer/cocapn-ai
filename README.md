# cocapn.ai — Agent Runtime 🦀

A minimal, forkable runtime for AI agents built on Cloudflare Workers.

**Live Example:** https://cocapn-ai.casey-digennaro.workers.dev

---

## What It Is
This is a lightweight runtime that handles the orchestration for an AI agent. It manages visitor access and safely routes requests. Fork it to create your own independent agent endpoint.

### What It Handles
*   **Visitor Credits**: Rate limiting and free tiers based on browser fingerprint. No user accounts needed.
*   **Key-Safe Routing**: User API keys are sent directly from the browser to the AI provider (OpenAI, Anthropic, DeepSeek, etc.). The runtime only passes configuration.
*   **Single-File Simplicity**: The entire runtime is one file with no external dependencies. You can deploy it in under a minute.
*   **Fork-First Design**: This isn't a library you install. You fork this repository once to get a complete, modifiable agent that you control.

### One Honest Limitation
This runtime is designed for the serverless edge (Cloudflare Workers). It's excellent for creating public agent endpoints, but if you need persistent server processes or complex state management, you'll need to extend it.

---

## Quick Start
1.  Fork this repository.
2.  Deploy it to [Cloudflare Workers](https://workers.cloudflare.com).
3.  Edit the single `src/index.js` file to adjust prompts, credits, or model support.

You'll have a live agent endpoint in minutes.

---

## The Fleet Protocol
This repository is part of a fleet—a network of independent, forked agents. The protocol is simple:
*   **Fork** to create your vessel.
*   **Branch** to run experiments.
*   **Open a PR** back here if you fix a bug or improvement that benefits everyone.

You own your fork. There is no central platform or mandatory upgrades.

---

## License
MIT — Superinstance & Lucineer (DiGennaro et al.)

---

<div align="center">
  <a href="https://the-fleet.casey-digennaro.workers.dev">The Fleet</a> • 
  <a href="https://cocapn.ai">Cocapn</a>
</div>