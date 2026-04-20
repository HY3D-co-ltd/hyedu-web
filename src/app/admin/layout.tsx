import type { Metadata } from 'next';
import '../[locale]/globals.css';

export const metadata: Metadata = {
  title: '관리자 | 한양미래연구소',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
