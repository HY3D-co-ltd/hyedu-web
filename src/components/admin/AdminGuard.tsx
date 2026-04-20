'use client';

import { useEffect, useState } from 'react';
import {
  getStoredToken,
  validateToken,
  clearStoredAuth,
} from '@/lib/admin-auth';

type AuthState = 'checking' | 'authed' | 'anon';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>('checking');

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      window.location.replace('/admin/login/');
      return;
    }
    let cancelled = false;
    validateToken(token).then((result) => {
      if (cancelled) return;
      if (result.ok) {
        setState('authed');
      } else {
        clearStoredAuth();
        window.location.replace('/admin/login/');
      }
    });
    return () => {
      cancelled = true;
    };
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
