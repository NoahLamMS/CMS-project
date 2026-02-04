/**
 * @file Input.tsx
 * @description Input component
 * @author HoangPhuc
 * @created 03-02-2026
 */

import { InputHTMLAttributes } from 'react';
import { cn } from '@/utils/format';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      <input
        className={cn(
          'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
          error ? 'border-red-500' : 'border-gray-300',
          className
        )}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

