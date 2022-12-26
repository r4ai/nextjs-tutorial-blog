const withExportImages = require("next-export-optimize-images");

module.exports = withExportImages({
  reactStrictMode: true,
  basePath: process.env.GITHUB_ACTIONS ? "/nextjs-tutorial-blog" : "",
  trailingSlash: true,
});
