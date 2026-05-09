---
title: API・仕様変更
type: category
updated: 2026-05-09
---

# API・仕様変更

開発者向けのAPI（Claudeをプログラムから使うための仕組み）に関する追加・変更・廃止をまとめています。新しい順に並んでいます。

> **非エンジニアの方へ**: このページの内容はプログラムを書く人向けの技術的な変更です。Claudeを普通に使っている分には影響ありません。

---

### [Anthropic Python SDK] 複数AIエージェント連携APIの整備
**バージョン**: v0.100.0 | **日付**: 2026-05-06

複数のAIエージェントが連携する「Managed Agents」向けのAPIが追加・整備されました。エージェント同士の連携（multiagents）・作業結果の記録（outcomes）・外部通知（webhooks）・データ保管（vault validation）の各エンドポイントが利用できるようになっています。

---

### [Anthropic Python SDK] クラウド環境からの認証連携（Workload Identity Federation）
**バージョン**: v0.98.0 | **日付**: 2026-05-04

Google CloudやAWSなどのクラウド環境が持つ認証基盤（IAMなど）を使って、APIキーなしでClaudeにアクセスできる仕組みが追加されました。セキュリティを高めながら運用できます。

---

### [Anthropic Python SDK] Managed AgentsのAPI強化
**バージョン**: v0.98.0 | **日付**: 2026-05-04

前バージョンで追加されたManaged AgentsのAPIがさらに改良されました。

---

### [Anthropic Python SDK] CMAメモリAPI パブリックベータ開始
**バージョン**: v0.97.0 | **日付**: 2026-04-23

AIが会話をまたいで情報を記憶できる「CMA（Claude Memory Agents）メモリ機能」のAPIがパブリックベータとして公開されました。試験段階のため今後仕様が変わる可能性があります。
