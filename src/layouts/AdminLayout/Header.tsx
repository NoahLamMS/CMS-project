/**
 * @file Header.tsx
 * @description Header component with search, notifications, and user info
 * @author HoangPhuc
 * @created 03-02-2026
 */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Avatar, Badge, Dropdown, Select, Space, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { BellOutlined, UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

interface HeaderProps {
    title?: string;
}

interface UserInfo {
    name: string;
    role: string;
    avatar?: string;
}

const mockUser: UserInfo = {
    name: 'Lâm Huỳnh Hoàng Phúc',
    role: 'Admin',
    avatar: undefined,
};

export function Header({ title }: HeaderProps) {
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    const userMenuItems: MenuProps['items'] = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'Tài khoản',
            onClick: () => navigate('/profile'),
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Cài đặt',
            onClick: () => navigate('/settings'),
        },
        { type: 'divider' },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Đăng xuất',
            danger: true,
            onClick: handleLogout,
        },
    ];

    return (
        <AntHeader
            className="px-6 flex items-center justify-between border-b border-gray-100 h-16 sticky top-0 z-10"
            style={{ background: '#ffffff' }}
        >
            <div>
                {title && (
                    <Text strong className="text-xl text-gray-800">
                        {title}
                    </Text>
                )}
            </div>

            <Space size="large">
                <Select
                    defaultValue="vi"
                    style={{ width: 80 }}
                    options={[
                        { value: 'vi', label: '🇻🇳 VIE' },
                        { value: 'en', label: '🇺🇸 ENG' },
                    ]}
                    variant="borderless"
                />

                <Badge count={10} size="small">
                    <BellOutlined className="text-xl text-gray-600 cursor-pointer hover:text-orange-500 transition-colors" />
                </Badge>

                <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
                    <Space className="cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors">
                        <Avatar
                            size={36}
                            src={mockUser.avatar}
                            icon={!mockUser.avatar && <UserOutlined />}
                            className="bg-orange-500"
                        />
                        <div className="hidden md:flex flex-col justify-center">
                            <Text strong className="block text-sm leading-tight">
                                {mockUser.name}
                            </Text>
                            <Text type="secondary" className="text-xs">
                                {mockUser.role}
                            </Text>
                        </div>
                    </Space>
                </Dropdown>
            </Space>
        </AntHeader>
    );
}

export default Header;
