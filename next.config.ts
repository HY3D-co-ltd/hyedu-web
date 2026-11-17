import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const isGithubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGithubPages ? '/hyedu-web' : '';

const nextConfig: NextConfig = {
  // Pin the workspace root to this repo. Without it, Next.js walks up the tree for
  // lockfiles and picks any parent npm project (e.g. one in the home directory) as the root.
  outputFileTracingRoot: __dirname,
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: isGithubPages ? '/hyedu-web/' : '',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default withNextIntl(nextConfig);
