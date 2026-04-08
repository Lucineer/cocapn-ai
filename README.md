# cocapn-ai

> [Cocapn.ai](https://cocapn.ai) — the runtime agent web interface. Operate your cocapn instances.

Cocapn is the agent that's actually running on the device. You build it with Deckboss, then operate it here.

## What is a Cocapn?

A cocapn is a git-native agent that evolves through PRs. It's not a platform — it's a presence.

- A **content creator's cocapn** manages their content pipeline: drop files into folders, the cocapn schedules and distributes
- An **engineer's cocapn** displays real-time AR suggestions based on camera feeds, evolving its display logic through usage
- A **captain's cocapn** runs the ship's monitoring, alerting, and maintenance systems
- A **teacher's cocapn** tutors students, adapts to learning styles, tracks progress

Every cocapn develops its repo completely differently based on its role.

## The Cocapn Lifecycle

```
1. BUILD (Deckboss.ai)     — Design the agent, develop its git-agent fleet
2. ONBOARD (Cocapn)        — Deploy to hardware, activate runtime
3. OPERATE (Cocapn.ai)     — Monitor, configure, interact with running instances
4. EVOLVE (PRs)            — Agent self-improves through git commits
5. MAINTAIN (memberships)  — Updates, support, fleet management via Cocapn.com
```

## Features

- Multi-cocapn dashboard — view all your running instances
- Real-time agent interaction — chat, configure, monitor
- Git-agent fleet view — see each instance's repo structure and recent commits
- BYOK model management — configure which LLMs each cocapn uses
- Privacy controls — what data leaves the device, what stays local
- Alert routing — critical alerts forwarded to phone/email
- OTA updates — push agent improvements to deployed hardware

## Content Creator Example

```yaml
# Content creator's cocapn repo structure
content-repo/
├── posts/           # Long-form content (high priority, weekly)
├── stories/         # Short-form stories (medium priority, daily)
├── replies/         # Comment responses (low priority, real-time)
├── analytics/       # Performance data (auto-ingested)
├── drafts/          # Work in progress
└── cocapn.yaml      # Cocapn configuration
```

Drop a file into `posts/` and the cocapn knows: this is long-form, high priority, schedule for next Tuesday. The cocapn develops its own posting strategy, learns what times get engagement, and evolves through PRs.

## Engineer Example

```yaml
# Engineer's AR cocapn
cocapn:
  role: "AR engineering assistant"
  input: "camera feed from safety glasses"
  output: "real-time display overlay"
  feedback: "user corrections via gesture/voice"
  evolution: "PRs to display pipeline based on usage patterns"
```

The cocapn develops its own pipelines for what to grab, how to display it, and what to show based on real-time collaboration with the user. The app itself evolves through PRs.

## Tech Stack

- Cloudflare Workers (web interface)
- Git-native (each cocapn = a git repo)
- BYOK (your API keys, your models)
- Local-first (works offline, syncs when connected)

## Brand Family

| Domain | Role |
|--------|------|
| [Deckboss.ai](https://deckboss.ai) | Build-phase chatbot |
| [Deckboss.net](https://deckboss.net) | Physical hardware |
| **Cocapn.ai** | **Runtime agent interface (this repo)** |
| [Cocapn.com](https://cocapn.com) | Company, membership, billing |
| [Capitaine.ai](https://capitaine.ai) | Premium platform, education |

---

<i>Built by [Superinstance](https://github.com/superinstance) & [Lucineer](https://github.com/Lucineer) (DiGennaro et al.)</i>
