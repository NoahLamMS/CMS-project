/**
 * @file env.ts
 * @description Environment configuration for Vite
 * @author Kindy
 * @created 2025-11-16
 */

export const ENV = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  NODE_ENV: import.meta.env.MODE || 'development',
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10),
} as const;

export const isDevelopment = ENV.NODE_ENV === 'development';
export const isProduction = ENV.NODE_ENV === 'production';
