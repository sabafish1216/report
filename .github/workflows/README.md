# GitHub Actions ワークフロー

このディレクトリには、GitHub Pagesへの自動デプロイを管理するGitHub Actionsワークフローが含まれています。

## ワークフロー: deploy.yml

### トリガー
- `main`ブランチへのプッシュ
- `main`ブランチへのプルリクエスト
- 手動実行（workflow_dispatch）

### 実行内容

#### 1. ビルドジョブ
- Node.js 18環境でのセットアップ
- 依存関係のインストール（`npm ci`）
- テストの実行
- 本番用ビルドの作成
- GitHub Pages用アーティファクトのアップロード

#### 2. デプロイジョブ
- `main`ブランチの場合のみ実行
- GitHub Pagesへの自動デプロイ
- デプロイ完了後のURL出力

### 必要な権限
- `contents: read` - リポジトリの読み取り
- `pages: write` - GitHub Pagesへの書き込み
- `id-token: write` - 認証トークンの書き込み

### 設定手順

1. リポジトリの設定で「Pages」を有効化
2. Sourceを「GitHub Actions」に設定
3. mainブランチにプッシュすると自動的にデプロイが実行される

### 注意事項
- 初回デプロイには数分かかる場合があります
- ビルドが失敗した場合はデプロイは実行されません
- テストが失敗した場合もデプロイは実行されません
