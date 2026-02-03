/**
 * @file page.tsx
 * @description Login page
 * @author HoangPhuc
 * @created 03-02-2026
 */

import { LoginForm } from '@/features/auth';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Đăng Nhập</h1>
        <LoginForm />
      </div>
    </div>
  );
}

