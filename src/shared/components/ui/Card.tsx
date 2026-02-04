/**
 * @file Card.tsx
 * @description Card component
 * @author HoangPhuc
 * @created 03-02-2026
 */

import { ReactNode } from 'react';
import { cn } from '@/utils/format';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white p-4 shadow-sm',
        className
      )}
    >
      {children}
    </div>
  );
}

