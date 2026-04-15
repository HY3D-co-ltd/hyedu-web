import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const isGithubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGithubPages ? '/hyedu-web' : '';

const nextConfig: NextConfig = {
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
