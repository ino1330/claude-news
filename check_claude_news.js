import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LAST_CHECKED_FILE = path.join(__dirname, 'last_checked.json');
const RAW_DIR = path.join(__dirname, 'my_claude_new_wiki', 'raw');
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

const REPOS = [
  {
    id: 'claude-code',
    repo: 'anthropics/claude-code',
    label: 'Claude Code',
    emoji: '🖥️',
  },
  {
    id: 'anthropic-sdk-python',
    repo: 'anthropics/anthropic-sdk-python',
    label: 'Anthropic Python SDK',
    emoji: '🐍',
  },
];

function loadLastChecked() {
  if (!fs.existsSync(LAST_CHECKED_FILE)) return {};
  return JSON.parse(fs.readFileSync(LAST_CHECKED_FILE, 'utf8'));
}

function saveLastChecked(data) {
  fs.writeFileSync(LAST_CHECKED_FILE, JSON.stringify(data, null, 2));
}

function saveRaw(id, label, tag, release) {
  const date = release.published_at.slice(0, 10);
  const filename = `${date}-${id}-${tag}.md`;
  const filepath = path.join(RAW_DIR, filename);

  const content = [
    '---',
    `source: ${id}`,
    `label: ${label}`,
    `version: ${tag}`,
    `date: ${date}`,
    `url: ${release.html_url}`,
    '---',
    '',
    `# ${label} ${tag} (${date})`,
    '',
    release.body ? release.body.trim() : '（リリースノートなし）',
  ].join('\n');

  fs.writeFileSync(filepath, content);
  console.log(`[${label}] raw/ に保存: ${filename}`);
}

async function fetchLatestRelease(repo) {
  const res = await axios.get(
    `https://api.github.com/repos/${repo}/releases/latest`,
    {
      headers: {
        'User-Agent': 'claude-news-checker/1.0',
        Accept: 'application/vnd.github+json',
      },
      timeout: 15000,
    }
  );
  return res.data;
}

async function sendSlack(message) {
  await axios.post(SLACK_WEBHOOK_URL, { text: message }, { timeout: 10000 });
}

async function main() {
  if (!SLACK_WEBHOOK_URL) {
    console.error('SLACK_WEBHOOK_URL が設定されていません');
    process.exit(1);
  }

  const lastChecked = loadLastChecked();
  const updated = { ...lastChecked };
  const notifications = [];

  for (const { id, repo, label, emoji } of REPOS) {
    const release = await fetchLatestRelease(repo);
    const tag = release.tag_name;
    const prevTag = lastChecked[id]?.tag;

    if (tag === prevTag) {
      console.log(`[${label}] 新しいリリースなし: ${tag}`);
      continue;
    }

    console.log(`[${label}] 新しいリリースを検出: ${tag}`);

    // raw/ にリリースノート全文を保存
    saveRaw(id, label, tag, release);

    // Slack通知用の本文（最大300文字）
    const body = release.body
      ? release.body.replace(/#+\s/g, '').trim().slice(0, 300)
      : '（リリースノートなし）';

    notifications.push(
      [
        `${emoji} *${label} ${tag} がリリースされました*`,
        body,
        `🔗 <${release.html_url}|リリースノートを見る>`,
      ].join('\n')
    );

    updated[id] = { tag, publishedAt: release.published_at };
  }

  if (notifications.length === 0) {
    console.log('新しいリリースはありませんでした');
    return;
  }

  const message = notifications.join('\n\n---\n\n');
  await sendSlack(message);
  saveLastChecked(updated);
  console.log(`Slack通知を送信しました（${notifications.length}件）`);
}

main().catch(err => {
  console.error('エラー:', err.message);
  process.exit(1);
});
