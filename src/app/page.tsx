/**
 * @file page.tsx
 * @description Home page - redirect to login or dashboard
 * @author HoangPhuc
 * @created 03-02-2026
 */

import { redirect } from 'next/navigation';

export default function Home() {
  // For demo, redirect to login
  // In production, check auth state and redirect accordingly
  redirect('/login');
}
