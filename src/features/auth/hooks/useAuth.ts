/**
 * @file useAuth.ts
 * @description useAuth hook
 * @author HoangPhuc
 * @created 03-02-2026
 */

import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };
}

