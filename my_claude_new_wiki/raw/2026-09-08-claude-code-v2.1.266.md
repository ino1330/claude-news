---
source: claude-code
label: Claude Code
version: v2.1.266
date: 2026-09-08
url: https://github.com/anthropics/claude-code/releases/tag/v2.1.266
---

# Claude Code v2.1.266 (2026-09-08)

## What's changed

- Fixed a 2.1.265 regression affecting LLM-gateway and proxy setups: the undocumented `CLAUDE_CODE_USE_GATEWAY` environment variable, previously ignored unless `ANTHROPIC_BASE_URL` and `ANTHROPIC_AUTH_TOKEN` were both set, began forcing Cloud-gateway sign-in on its own in 2.1.265, so configurations that set it alongside an API key, `apiKeyHelper`, or custom auth headers failed every request with "Not signed in to the Cloud gateway". The variable on its own is ignored again; no configuration change is needed