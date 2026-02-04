/**
 * @file format.ts
 * @description Utility functions
 * @author HoangPhuc
 * @created 03-02-2026
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
