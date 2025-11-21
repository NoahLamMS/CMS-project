/**
 * @file env.d.ts
 * @description Environment variables type definitions
 * @author Kindy
 * @created 2025-11-16
 */

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL?: string;
    NEXT_PUBLIC_API_TIMEOUT?: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

