/**
 * @file CollaboratorsPage.tsx
 * @description Collaborators management page with Table, Search, Filter
 * @author HoangPhuc
 * @created 03-02-2026
 */

import { useState, useCallback, useMemo } from 'react';
import {
    Card,
    Table,
    Input,
    Button,
    Tag,
    Space,
    Avatar,
    Dropdown,
    Typography,
    Flex,
} from 'antd';
import type { TableProps } from 'antd';
import {
    SearchOutlined,
    FilterOutlined,
    PlusOutlined,
    MoreOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useCollaborators } from '../hooks/useCollaborators';
import { CollaboratorRank } from '../types/collaborator.types';
import type { ICollaborator } from '../types/collaborator.types';

const { Text } = Typography;

interface CollaboratorsPageProps {
    className?: string;
}

const RANK_CONFIG: Record<CollaboratorRank, { label: string; color: string }> = {
    [CollaboratorRank.GOLD]: { label: 'Vàng', color: 'gold' },
    [CollaboratorRank.SILVER]: { label: 'Bạc', color: 'default' },
    [CollaboratorRank.BRONZE]: { label: 'Đồng', color: 'orange' },
};

export function CollaboratorsPage({ className }: CollaboratorsPageProps) {
    const [searchValue, setSearchValue] = useState('');

    const {
        collaborators,
        total,
        isLoading,
        page,
        pageSize,
        setPage,
        setPageSize,
        setSearch,
    } = useCollaborators();

    const handleSearch = useCallback((value: string) => {
        setSearchValue(value);
        setSearch(value);
    }, [setSearch]);

    const handlePageChange = useCallback((newPage: number, newPageSize: number) => {
        setPage(newPage);
        setPageSize(newPageSize);
    }, [setPage, setPageSize]);

    const handleAddCollaborator = useCallback(() => {
        console.log('Add collaborator clicked');
    }, []);

    const handleEdit = useCallback((collaborator: ICollaborator) => {
        console.log('Edit collaborator:', collaborator.id);
    }, []);

    const handleDelete = useCallback((collaborator: ICollaborator) => {
        console.log('Delete collaborator:', collaborator.id);
    }, []);

    const handleView = useCallback((collaborator: ICollaborator) => {
        console.log('View collaborator:', collaborator.id);
    }, []);

    const columns = useMemo<TableProps<ICollaborator>['columns']>(() => [
        {
            title: 'Mã CTV',
            dataIndex: 'code',
            key: 'code',
            width: 120,
            render: (code: string) => (
                <Text className="text-gray-600">{code}</Text>
            ),
        },
        {
            title: 'Tên CTV',
            dataIndex: 'name',
            key: 'name',
            render: (name: string, record: ICollaborator) => (
                <Flex align="center" gap={12}>
                    <Avatar
                        size={32}
                        src={record.avatar}
                        icon={!record.avatar && <UserOutlined />}
                        className="bg-orange-100"
                    />
                    <Text>{name}</Text>
                </Flex>
            ),
        },
        {
            title: 'Tổng đơn hàng',
            dataIndex: 'totalOrders',
            key: 'totalOrders',
            width: 130,
            align: 'center',
            render: (value: number) => (
                <Text>{value.toLocaleString('vi-VN')}</Text>
            ),
        },
        {
            title: 'Tổng giá trị đơn hàng',
            dataIndex: 'totalOrderValue',
            key: 'totalOrderValue',
            width: 180,
            align: 'right',
            render: (value: number) => (
                <Text>{value.toLocaleString('vi-VN')}đ</Text>
            ),
        },
        {
            title: '% Hoa hồng',
            dataIndex: 'commissionPercent',
            key: 'commissionPercent',
            width: 120,
            align: 'center',
            render: (value: number) => (
                <Text>{value}%</Text>
            ),
        },
        {
            title: 'Cấp bậc',
            dataIndex: 'rank',
            key: 'rank',
            width: 100,
            align: 'center',
            render: (rank: CollaboratorRank) => {
                const config = RANK_CONFIG[rank];
                return (
                    <Tag color={config.color}>
                        {config.label}
                    </Tag>
                );
            },
        },
        {
            title: 'Hoa hồng nhận được',
            dataIndex: 'commissionReceived',
            key: 'commissionReceived',
            width: 168,
            align: 'right',
            render: (value: number) => (
                <Text className="font-medium">{value.toLocaleString('vi-VN')}đ</Text>
            ),
        },
        {
            title: '',
            key: 'actions',
            width: 50,
            render: (_: unknown, record: ICollaborator) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: 'view',
                                icon: <EyeOutlined />,
                                label: 'Xem chi tiết',
                                onClick: () => handleView(record),
                            },
                            {
                                key: 'edit',
                                icon: <EditOutlined />,
                                label: 'Chỉnh sửa',
                                onClick: () => handleEdit(record),
                            },
                            { type: 'divider' },
                            {
                                key: 'delete',
                                icon: <DeleteOutlined />,
                                label: 'Xóa',
                                danger: true,
                                onClick: () => handleDelete(record),
                            },
                        ],
                    }}
                    trigger={['click']}
                >
                    <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>
            ),
        },
    ], [handleView, handleEdit, handleDelete]);

    return (
        <div className={className}>
            <Flex justify="space-between" align="center" className="mb-6">
                <Text strong className="text-2xl text-gray-800">
                    Quản lý cộng tác viên
                </Text>
            </Flex>

            <Card className="shadow-sm rounded-lg">
                <Flex justify="space-between" align="center" className="mb-4">
                    <Space>
                        <Input
                            placeholder="Tìm kiếm tài xế"
                            prefix={<SearchOutlined className="text-gray-400" />}
                            value={searchValue}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-64"
                            allowClear
                        />
                        <Button icon={<FilterOutlined />}>
                            Lọc
                        </Button>
                    </Space>

                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddCollaborator}
                        className="bg-orange-500 hover:bg-orange-600"
                    >
                        Thêm cộng tác viên
                    </Button>
                </Flex>

                <Flex justify="space-between" align="center" className="mb-4">
                    <Text className="text-gray-600">
                        {total} cộng tác viên
                    </Text>

                    <Button type="text" className="text-gray-500">
                        Ẩn/Hiện cột ▾
                    </Button>
                </Flex>

                <Table<ICollaborator>
                    columns={columns}
                    dataSource={collaborators}
                    rowKey="id"
                    loading={isLoading}
                    pagination={{
                        current: page,
                        pageSize: pageSize,
                        total: total,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSizeOptions: ['10', '20', '50', '100'],
                        onChange: handlePageChange,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} của ${total} cộng tác viên`,
                    }}
                    className="collaborators-table"
                />
            </Card>
        </div>
    );
}

export default CollaboratorsPage;
