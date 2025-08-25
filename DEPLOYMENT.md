# GitHub Pages デプロイ設定手順

このアプリをGitHub Pagesで自動デプロイするための設定手順です。

## 1. GitHubリポジトリの設定

### Pages設定の有効化
1. GitHubリポジトリのページに移動
2. 「Settings」タブをクリック
3. 左サイドバーから「Pages」を選択
4. 「Source」セクションで「GitHub Actions」を選択
5. 設定を保存

## 2. GitHub Actionsワークフロー

### 自動実行の確認
- `main`ブランチにプッシュすると自動的に実行されます
- ワークフローの実行状況は「Actions」タブで確認できます

### ワークフローの内容
1. **ビルドステップ**
   - Node.js 18環境でのセットアップ
   - 依存関係のインストール
   - テストの実行
   - 本番用ビルドの作成

2. **デプロイステップ**
   - GitHub Pagesへの自動デプロイ
   - デプロイ完了後のURL出力

## 3. デプロイの確認

### 初回デプロイ
- 初回デプロイには5-10分かかる場合があります
- 「Actions」タブで進行状況を確認してください

### デプロイ完了後
- サイトは `https://sabafish1216.github.io/report` でアクセス可能
- 設定が正しく行われている場合、自動的に更新されます

## 4. トラブルシューティング

### よくある問題

#### ビルドエラー
- TypeScriptの型エラー
- 依存関係の問題
- テストの失敗

#### デプロイエラー
- GitHub Pagesの設定が正しくない
- 権限の問題
- ワークフローの設定ミス

### 解決方法
1. 「Actions」タブでエラーログを確認
2. ローカルで `npm run build` を実行してビルドエラーを確認
3. ローカルで `npm test` を実行してテストエラーを確認
4. 必要に応じてGitHubリポジトリの設定を確認

## 5. 手動デプロイ

### 手動実行
- 「Actions」タブから「Deploy to GitHub Pages」ワークフローを選択
- 「Run workflow」ボタンをクリック
- 必要に応じてブランチを選択して実行

## 6. 設定ファイル

### 重要なファイル
- `.github/workflows/deploy.yml` - GitHub Actionsワークフロー
- `package.json` - ビルド設定とスクリプト
- `tsconfig.json` - TypeScript設定

### カスタマイズ
- ビルド設定の変更は `package.json` で行います
- デプロイ設定の変更は `.github/workflows/deploy.yml` で行います
- 環境変数が必要な場合は、GitHubリポジトリの「Secrets」で設定します

## 7. セキュリティ

### 権限設定
- ワークフローは必要最小限の権限のみを使用
- `contents: read` - リポジトリの読み取り
- `pages: write` - GitHub Pagesへの書き込み
- `id-token: write` - 認証トークンの書き込み

### 推奨事項
- 定期的に依存関係の更新を行う
- セキュリティアラートを監視する
- 必要に応じてGitHub Security Advisoriesを確認する
