'use client';

import AdminGuard from '@/components/admin/AdminGuard';
import AdminHeader from '@/components/admin/AdminHeader';
import BoardManager from '@/components/admin/BoardManager';

export default function AdminEventsPage() {
  return (
    <AdminGuard>
      <AdminHeader />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <BoardManager kind="events" />
      </main>
    </AdminGuard>
  );
}
