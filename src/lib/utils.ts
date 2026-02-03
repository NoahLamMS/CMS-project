/**
 * @file utils.ts
 * @description Utility functions
 * @author Kindy
 * @created 2025-11-16
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

