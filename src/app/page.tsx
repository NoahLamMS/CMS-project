/**
 * @file page.tsx
 * @description Home page - redirect to login or dashboard
 * @author Kindy
 * @created 2025-11-16
 */

import { redirect } from 'next/navigation';

export default function Home() {
  // For demo, redirect to login
  // In production, check auth state and redirect accordingly
  redirect('/login');
}
