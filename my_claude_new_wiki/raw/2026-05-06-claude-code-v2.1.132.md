---
source: claude-code
label: Claude Code
version: v2.1.132
date: 2026-05-06
url: https://github.com/anthropics/claude-code/releases/tag/v2.1.132
---

# Claude Code v2.1.132 (2026-05-06)

## What's changed

- Added `CLAUDE_CODE_SESSION_ID` environment variable to the Bash tool subprocess environment, matching the `session_id` passed to hooks
- Added `CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN=1` env var to opt out of the fullscreen alternate-screen renderer and keep the conversation in the normal scrollback buffer
