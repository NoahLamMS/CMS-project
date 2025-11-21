/**
 * @file LoginForm.tsx
 * @description LoginForm component
 * @author Kindy
 * @created 2025-11-16
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { Input, Button } from '@/shared/components/ui';

export function LoginForm() {
  const router = useRouter();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      await login({ email, password });
      router.push('/dashboard');
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
          {error}
        </div>
      )}
      
      <Input
        label="Email"
        type="email"
        placeholder="Nhập email của bạn"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      
      <Input
        label="Mật Khẩu"
        type="password"
        placeholder="Nhập mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span className="text-gray-600">Ghi nhớ đăng nhập</span>
        </label>
        <a href="#" className="text-blue-600 hover:text-blue-800">
          Quên mật khẩu?
        </a>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={loading}
      >
        {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
      </Button>

      <div className="text-center text-sm text-gray-600">
        Chưa có tài khoản?{' '}
        <a href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
          Đăng ký ngay
        </a>
      </div>
    </form>
  );
}
