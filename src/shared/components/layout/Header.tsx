/**
 * @file Header.tsx
 * @description Header component
 * @author Kindy
 * @created 2025-11-16
 */

'use client';

import { useAuth } from '@/features/auth';
import { Button } from '@/shared/components/ui/Button';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Xin chào, <span className="font-medium">{user?.name || 'User'}</span>
          </div>
          <Button variant="outline" onClick={logout}>
            Đăng Xuất
          </Button>
        </div>
      </div>
    </header>
  );
}

