/**
 * @type {import('next-export-optimize-images').Config}
 */
const config = {
  basePath: process.env.GITHUB_ACTIONS ? "/nextjs-tutorial-blog" : "",
};

module.exports = config;
