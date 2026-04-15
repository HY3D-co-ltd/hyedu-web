import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isGithubPages ? '/hyedu-web' : '',
  assetPrefix: isGithubPages ? '/hyedu-web/' : '',
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
