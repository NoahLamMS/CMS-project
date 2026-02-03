/**
 * @file routes.tsx
 * @description Application routes configuration with auth pages
 */

import { useRoutes, Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { MainLayout } from '@/shared/components/layout';
import { ProductsPage } from '@/features/products';
import { CollaboratorsPage } from '@/features/collaborators';
import { LoginPage, RegisterPage } from '@/features/auth';

function DashboardPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Tổng quan</h1>
            <p className="text-gray-600">Dashboard content will be here</p>
        </div>
    );
}

function PlaceholderPage({ title }: { title: string }) {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
            <p className="text-gray-600">Trang này đang được phát triển...</p>
        </div>
    );
}

const routes: RouteObject[] = [
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace />,
            },
            {
                path: 'dashboard',
                element: <DashboardPage />,
            },
            {
                path: 'products',
                element: <ProductsPage />,
            },
            {
                path: 'drivers',
                element: <PlaceholderPage title="Quản lý tài xế" />,
            },
            {
                path: 'warehouse',
                element: <PlaceholderPage title="Quản lý kho" />,
                children: [
                    {
                        path: 'inventory',
                        element: <PlaceholderPage title="Tồn kho" />,
                    },
                    {
                        path: 'import',
                        element: <PlaceholderPage title="Nhập kho" />,
                    },
                    {
                        path: 'export',
                        element: <PlaceholderPage title="Xuất kho" />,
                    },
                ],
            },
            {
                path: 'collaborators',
                element: <CollaboratorsPage />,
            },
            {
                path: 'orders',
                element: <PlaceholderPage title="Xử lý đơn hàng" />,
            },
            {
                path: 'marketing',
                element: <PlaceholderPage title="Tiếp thị & Khuyến mãi" />,
            },
            {
                path: 'customers',
                element: <PlaceholderPage title="Quản lý khách hàng" />,
            },
            {
                path: 'messages',
                element: <PlaceholderPage title="Tin nhắn" />,
            },
            {
                path: 'settings',
                element: <PlaceholderPage title="Cài đặt" />,
            },
            {
                path: 'profile',
                element: <PlaceholderPage title="Tài khoản" />,
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/dashboard" replace />,
    },
];

export function AppRoutes() {
    const element = useRoutes(routes);
    return element;
}

export default AppRoutes;
