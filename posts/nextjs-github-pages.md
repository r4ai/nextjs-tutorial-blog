---
title: 'Next.js の公式チュートリアルで作ったブログを GitHub Pages でデプロイした'
date: '2022-12-26'
---

ふと自分のポートフォリオを作りたいなと思い、Next.jsに入門してきた。公式チュートリアルが滅茶苦茶分かりやすくて良かった。

## 困った点

### SSGでの画像最適化

Next.js の画像最適化はSSR時に行われるらしく、SSGに対応していないらしい。`yarn export`時にエラーが出る。

```yaml
Error: Image Optimization using Next.js' default loader is not compatible with `next export`.
  Possible solutions:
    - Use `next start` to run a server, which includes the Image Optimization API.
    - Configure `images.unoptimized = true` in `next.config.js` to disable the Image Optimization API.
```

[Next Export Optimize Images](https://next-export-optimize-images.vercel.app/)を使うことで解決した。開発者は日本人らしく、公式ドキュメントも分かりやすくて良かった。注意点として、GitHub Pagesでデプロイするには以下の通りの設定ファイルを作成する必要がある。場所はプロジェクト直下で、ファイル名は`export-images.config.js`。`<YOUR_REPOSITORY_NAME>`にはあなたのGitHub Pagesのリポジトリ名が入る。

```js
/**
 * @type {import('next-export-optimize-images').Config}
 */
const config = {
  basePath: process.env.GITHUB_ACTIONS ? "/<YOUR_REPOSITORY_NAME>" : "",
};

module.exports = config;
```

### プロジェクトサイトとしてデプロイすると、URLがおかしくなる。

URLが全て`<GITHUB_USERNAME>/hoge`みたいな感じになっているので、おかしくなってる。

- 現状(誤り): `<GITHUB_USERNAME>.github.io/hoge/fuga`
- 修正版(正しい): `<GITHUB_USERNAME>.github.io/<GITHUB_REPOSITORY_NAME>/hoge/fuga`

これは、`next.config.js`の`basePath`を`<GITHUB_REPOSITORY_NAME>/`にすることで治った。次が実際に使った`next.config.js`で、`<GITHUB_REPOSITORY_NAME>`にはリポジトリ名が入る。

```js
const withExportImages = require("next-export-optimize-images");

module.exports = withExportImages({
  reactStrictMode: true,
  basePath: process.env.GITHUB_ACTIONS ? "/<GITHUB_REPOSITORY_NAME>" : "",
  trailingSlash: true,
});
```
