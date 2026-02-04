/**
 * @file Sidebar.tsx
 * @description Sidebar navigation component using Ant Design Menu
 * @author HoangPhuc
 * @created 03-02-2026
 */

import { useState, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Typography, Button } from 'antd';
import type { MenuProps } from 'antd';
import {
    DashboardOutlined,
    ShoppingOutlined,
    CarOutlined,
    DatabaseOutlined,
    TeamOutlined,
    ShoppingCartOutlined,
    GiftOutlined,
    UserOutlined,
    MessageOutlined,
    LeftOutlined,
    RightOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { Text } = Typography;

interface MenuItem {
    key: string;
    icon: React.ReactNode;
    label: string;
    children?: MenuItem[];
}

interface SidebarProps {
    collapsed?: boolean;
    onCollapse?: (collapsed: boolean) => void;
}

const menuItems: MenuItem[] = [
    { key: '/dashboard', icon: <DashboardOutlined />, label: 'Tổng quan' },
    { key: '/products', icon: <ShoppingOutlined />, label: 'Quản lý sản phẩm' },
    { key: '/drivers', icon: <CarOutlined />, label: 'Quản lý tài xế' },
    {
        key: '/warehouse',
        icon: <DatabaseOutlined />,
        label: 'Quản lý kho',
        children: [
            { key: '/warehouse/inventory', icon: null, label: 'Tồn kho' },
            { key: '/warehouse/import', icon: null, label: 'Nhập kho' },
            { key: '/warehouse/export', icon: null, label: 'Xuất kho' },
        ],
    },
    { key: '/collaborators', icon: <TeamOutlined />, label: 'Quản lý cộng tác viên' },
    { key: '/orders', icon: <ShoppingCartOutlined />, label: 'Xử lý đơn hàng' },
    { key: '/marketing', icon: <GiftOutlined />, label: 'Tiếp thị & Khuyến mãi' },
    { key: '/customers', icon: <UserOutlined />, label: 'Quản lý khách hàng' },
    { key: '/messages', icon: <MessageOutlined />, label: 'Tin nhắn' },
];

export function Sidebar({ collapsed = false, onCollapse }: SidebarProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(collapsed);

    const selectedKeys = useMemo(() => {
        return [location.pathname];
    }, [location.pathname]);

    const defaultOpenKeys = useMemo(() => {
        const path = location.pathname;
        const parent = menuItems.find(item =>
            item.children?.some(child => child.key === path)
        );
        return parent ? [parent.key] : [];
    }, [location.pathname]);

    const handleMenuClick: MenuProps['onClick'] = useCallback(({ key }: { key: string }) => {
        navigate(key);
    }, [navigate]);

    const handleCollapse = useCallback((value: boolean) => {
        setIsCollapsed(value);
        onCollapse?.(value);
    }, [onCollapse]);

    return (
        <Sider
            collapsible
            collapsed={isCollapsed}
            onCollapse={handleCollapse}
            width={260}
            collapsedWidth={80}
            trigger={null}
            className="h-screen sticky top-0 left-0 bg-white border-r border-gray-200"
            theme="light"
        >
            <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">M</span>
                </div>
                {!isCollapsed && (
                    <div>
                        <Text strong className="text-blue-600 text-lg block leading-tight">
                            CMS project
                        </Text>
                    </div>
                )}
            </div>

            <Menu
                mode="inline"
                selectedKeys={selectedKeys}
                defaultOpenKeys={defaultOpenKeys}
                onClick={handleMenuClick}
                items={menuItems as MenuProps['items']}
                className="border-none flex-1"
                style={{ height: 'calc(100vh - 140px)', overflowY: 'auto' }}
            />

            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <Button
                    type="text"
                    icon={isCollapsed ? <RightOutlined /> : <LeftOutlined />}
                    onClick={() => handleCollapse(!isCollapsed)}
                    className="text-gray-400 hover:text-gray-600"
                />
            </div>
        </Sider>
    );
}

export default Sidebar;
