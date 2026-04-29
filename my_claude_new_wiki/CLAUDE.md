# LLM Wiki Schema

This is a personal knowledge base maintained by an LLM. The human curates sources and asks questions. The LLM does all the writing, cross-referencing, and maintenance.

## Directory Structure

```
my_wiki/
├── CLAUDE.md       # This file — rules and conventions for the LLM
├── raw/            # Source documents (immutable — LLM reads, never modifies)
├── wiki/           # LLM-generated wiki pages
│   ├── index.md    # Master catalog of all wiki pages
│   └── log.md      # Chronological operation log
└── .gitignore
```

## Domains

This wiki covers two areas:
- **Personal** — 自己改善、目標、健康、心理、習慣、日記、学びなど
- **Business** — 仕事、プロジェクト、会議メモ、競合分析、業界知識など

## Language

ソースの言語に合わせて柔軟に対応する。日本語ソースなら日本語で、英語ソースなら英語で書く。ページタイトルやタグも同様。混在してよい。

## Page Types

Every wiki page has YAML frontmatter:

```yaml
---
title: "ページタイトル"
type: source | entity | concept | synthesis
tags: [tag1, tag2]
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: ["raw/filename.md"]   # optional — which raw files informed this page
---
```

### source
ソース要約ページ。raw/ 内のファイル1つにつき1ページ。元文書の要点を構造的にまとめる。

### entity
人物、組織、プロジェクト、ツール、場所など固有名詞のページ。複数ソースから情報を集約する。

### concept
概念、テーマ、手法、フレームワークなど抽象的なトピックのページ。

### synthesis
複数ソースや複数ページを横断した分析、比較、まとめページ。Queryの結果を保存する場合もこの型。

## Link Convention

Use standard Markdown links: `[ページ名](ページ名.md)`

All wiki pages live in `wiki/` — links are relative within that directory.

> **Note**: Obsidianへ移行する場合は `[[ページ名]]` 記法に一括変換できる。

## Workflows

### 1. Ingest（取り込み）

ユーザーが raw/ に新しいソースを追加したら、以下の手順で処理する：

1. ソースを全文読む
2. ユーザーと要点を確認・議論する
3. `wiki/` に source ページを作成（ファイル名はソース内容を反映した簡潔な英語スラッグ）
4. 関連する既存の entity / concept ページを更新（なければ新規作成）
5. `wiki/index.md` を更新
6. `wiki/log.md` にエントリを追加

**重要**: 1つのソースが複数ページに影響することがある。関連ページは漏れなく更新する。

### 2. Query（質問）

ユーザーが質問したら：

1. `wiki/index.md` を読んで関連ページを特定
2. 関連ページを読んで回答を組み立てる
3. 回答にはページへのリンクを含める
4. 価値のある回答（分析、比較、発見）は synthesis ページとしてWikiに保存するか、ユーザーに提案する

### 3. Lint（健康診断）

ユーザーが依頼したら、または定期的に提案する：

- [ ] 矛盾する記述がないか
- [ ] 新しいソースで古い情報が更新されていないか
- [ ] 他のページからリンクされていない孤立ページ
- [ ] 頻出するが専用ページがない概念やエンティティ
- [ ] 欠落しているクロスリファレンス
- [ ] Webで補完できそうなデータギャップ

結果をユーザーに報告し、修正を提案する。

## Index Format (wiki/index.md)

```markdown
# Wiki Index

## Sources
- [ページ名](ページ名.md) — 一行要約 (YYYY-MM-DD)

## Entities
- [ページ名](ページ名.md) — 一行要約

## Concepts
- [ページ名](ページ名.md) — 一行要約

## Syntheses
- [ページ名](ページ名.md) — 一行要約
```

## Log Format (wiki/log.md)

```markdown
## [YYYY-MM-DD] operation | Title
Brief description of what was done.
Pages affected: page1.md, page2.md, ...
```

Operations: `ingest`, `query`, `lint`, `update`

## Guidelines

- **正確性優先**: ソースに書かれていないことを推測で書かない。不明点は明示する。
- **簡潔に**: 各ページは要点を絞る。冗長な説明より構造的な箇条書き。
- **クロスリファレンス**: 関連ページへのリンクを積極的に張る。
- **差分を明示**: 既存ページを更新する際は、何が変わったかをlog.mdに記録する。
- **ユーザーと相談**: 判断に迷う場合（ページの分割/統合、重要度の判断など）はユーザーに確認する。
