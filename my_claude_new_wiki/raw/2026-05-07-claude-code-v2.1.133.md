---
source: claude-code
label: Claude Code
version: v2.1.133
date: 2026-05-07
url: https://github.com/anthropics/claude-code/releases/tag/v2.1.133
---

# Claude Code v2.1.133 (2026-05-07)

## What's changed

- Added `worktree.baseRef` setting (`fresh` | `head`) to choose whether `--worktree`, `EnterWorktree`, and agent-isolation worktrees branch from `origin/<default>` or local `HEAD`. Note: the default `fresh` changes `EnterWorktree`'s base back to `origin/<default>`
