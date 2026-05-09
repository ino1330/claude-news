---
source: claude-code
label: Claude Code
version: v2.1.129
date: 2026-05-06
url: https://github.com/anthropics/claude-code/releases/tag/v2.1.129
---

# Claude Code v2.1.129 (2026-05-06)

## What's changed

- Added `--plugin-url <url>` flag to fetch a plugin `.zip` archive from a URL for the current session
- Added `CLAUDE_CODE_FORCE_SYNC_OUTPUT=1` env var to force-enable synchronized output on terminals that auto-detection misses (e.g. Emacs `eat`)
- Added `CLAUDE_CODE_PACKAGE_MANAGER` env var to override the package manager used by Claude Code
