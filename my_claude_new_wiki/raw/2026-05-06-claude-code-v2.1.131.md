---
source: claude-code
label: Claude Code
version: v2.1.131
date: 2026-05-06
url: https://github.com/anthropics/claude-code/releases/tag/v2.1.131
---

# Claude Code v2.1.131 (2026-05-06)

## What's changed

- Fixed VS Code extension failing to activate on Windows due to a hardcoded build path in the bundled SDK (createRequire polyfill bug)
- Fixed Mantle endpoint authentication failing with missing `x-api-key` header
