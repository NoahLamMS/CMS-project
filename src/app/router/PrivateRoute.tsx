/**
 * @file PrivateRoute.tsx
 * @description Auth guard for protected routes
 * @author HoangPhuc
 * @created 04-02-2026
 */

import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store/authStore';
import { ReactNode } from 'react';

interface PrivateRouteProps {
    children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
