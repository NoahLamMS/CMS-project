/**
 * @file MainLayout.tsx
 * @description Main layout wrapper with Sidebar and Header
 * @author HoangPhuc
 * @created 03-02-2026
 */

import { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

const { Content } = Layout;

interface MainLayoutProps {
    title?: string;
}

export function MainLayout({ title }: MainLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);

    const handleCollapse = useCallback((value: boolean) => {
        setCollapsed(value);
    }, []);

    return (
        <Layout className="min-h-screen">
            <Sidebar collapsed={collapsed} onCollapse={handleCollapse} />

            <Layout className="bg-gray-50">
                <Header title={title} />

                <Content className="p-6">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default MainLayout;
