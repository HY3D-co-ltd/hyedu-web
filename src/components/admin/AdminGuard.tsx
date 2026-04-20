'use client';

import { useEffect, useState } from 'react';
import { isLoggedIn } from '@/lib/admin-auth';
import { adminHref } from '@/lib/admin-paths';

type AuthState = 'checking' | 'authed' | 'anon';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>('checking');

  useEffect(() => {
    if (isLoggedIn()) {
      setState('authed');
    } else {
      window.location.replace(adminHref('/admin/login/'));
    }
  }, []);

  if (state === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        인증 확인 중...
      </div>
    );
  }
  if (state !== 'authed') return null;
  return <>{children}</>;
}
