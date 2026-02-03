/**
 * @file Card.tsx
 * @description Card component
 * @author Kindy
 * @created 2025-11-16
 */

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

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

