/**
 * @file ProductsPage.tsx
 * @description Products management page with Table, Tabs, Search, Filter
 * @author Kindy
 * @created 2025-11-16
 */

import { useState, useCallback, useMemo } from 'react';
import {
    Card,
    Table,
    Input,
    Button,
    Tabs,
    Tag,
    Space,
    Avatar,
    Dropdown,
    Typography,
    Flex,
} from 'antd';
import type { TableProps, TabsProps } from 'antd';
import {
    SearchOutlined,
    FilterOutlined,
    PlusOutlined,
    MoreOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import { useProducts } from '../hooks/useProducts';
import { ProductStatus } from '../types/product.types';
import type { IProduct } from '../types/product.types';

const { Text } = Typography;

interface ProductsPageProps {
    className?: string;
}

interface TabConfig {
    key: string;
    label: string;
    status?: ProductStatus;
    count?: number;
}

export function ProductsPage({ className }: ProductsPageProps) {
    const [activeTab, setActiveTab] = useState<string>('all');
    const [searchValue, setSearchValue] = useState('');

    const {
        products,
        total,
        isLoading,
        page,
        pageSize,
        setPage,
        setPageSize,
        setSearch,
        setStatus,
    } = useProducts();

    const handleSearch = useCallback((value: string) => {
        setSearchValue(value);
        setSearch(value);
    }, [setSearch]);

    const handleTabChange = useCallback((key: string) => {
        setActiveTab(key);
        switch (key) {
            case 'in_stock':
                setStatus(ProductStatus.IN_STOCK);
                break;
            case 'out_of_stock':
                setStatus(ProductStatus.OUT_OF_STOCK);
                break;
            default:
                setStatus(undefined);
        }
    }, [setStatus]);

    const handlePageChange = useCallback((newPage: number, newPageSize: number) => {
        setPage(newPage);
        setPageSize(newPageSize);
    }, [setPage, setPageSize]);

    const handleAddProduct = useCallback(() => {
        console.log('Add product clicked');
    }, []);

    const handleEdit = useCallback((product: IProduct) => {
        console.log('Edit product:', product.id);
    }, []);

    const handleDelete = useCallback((product: IProduct) => {
        console.log('Delete product:', product.id);
    }, []);

    const handleView = useCallback((product: IProduct) => {
        console.log('View product:', product.id);
    }, []);

    const columns = useMemo<TableProps<IProduct>['columns']>(() => [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            render: (id: string) => (
                <Text className="text-gray-600">{id}</Text>
            ),
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (name: string, record: IProduct) => (
                <Flex align="center" gap={12}>
                    <Avatar
                        shape="square"
                        size={40}
                        src={record.image}
                        className="bg-orange-100"
                    >
                        🥚
                    </Avatar>
                    <Text strong>{name}</Text>
                </Flex>
            ),
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
            width: 120,
            render: (category: IProduct['category']) => (
                <Tag color="blue" className="rounded-full">
                    {category.name}
                </Tag>
            ),
        },
        {
            title: 'Giá bán',
            dataIndex: 'price',
            key: 'price',
            width: 120,
            align: 'right',
            render: (price: number) => (
                <Text>{price.toLocaleString('vi-VN')} VNĐ</Text>
            ),
        },
        {
            title: 'Số lượng tồn kho',
            dataIndex: 'stockQuantity',
            key: 'stockQuantity',
            width: 150,
            align: 'center',
            render: (qty: number) => (
                <Text className={qty === 0 ? 'text-red-500' : 'text-gray-800'}>
                    {qty}
                </Text>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status: ProductStatus) => (
                <Tag
                    color={status === ProductStatus.IN_STOCK ? 'success' : 'error'}
                    className="rounded-full"
                >
                    {status === ProductStatus.IN_STOCK ? 'Còn hàng' : 'Hết hàng'}
                </Tag>
            ),
        },
        {
            title: '',
            key: 'actions',
            width: 50,
            render: (_: unknown, record: IProduct) => (
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

    const tabItems = useMemo<TabsProps['items']>(() => {
        const tabs: TabConfig[] = [
            { key: 'all', label: 'Tất cả', count: 100 },
            { key: 'in_stock', label: 'Còn hàng', count: 90 },
            { key: 'out_of_stock', label: 'Hết hàng', count: 10 },
        ];

        return tabs.map(tab => ({
            key: tab.key,
            label: (
                <span>
                    {tab.label}
                    {tab.count !== undefined && (
                        <span className="ml-1 text-gray-400">({tab.count})</span>
                    )}
                </span>
            ),
        }));
    }, []);

    return (
        <div className={className}>
            <Flex justify="space-between" align="center" className="mb-6">
                <Text strong className="text-2xl text-gray-800">
                    Quản lý sản phẩm
                </Text>
            </Flex>

            <Card className="shadow-sm rounded-lg">
                <Flex justify="space-between" align="center" className="mb-4">
                    <Space>
                        <Input
                            placeholder="Tìm kiếm"
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
                        onClick={handleAddProduct}
                        className="bg-orange-500 hover:bg-orange-600"
                    >
                        Thêm sản phẩm
                    </Button>
                </Flex>

                <Flex justify="space-between" align="center" className="mb-4">
                    <Tabs
                        activeKey={activeTab}
                        onChange={handleTabChange}
                        items={tabItems}
                        className="mb-0"
                    />

                    <Button type="text" className="text-gray-500">
                        Ẩn/Hiện cột ▾
                    </Button>
                </Flex>

                <Table<IProduct>
                    columns={columns}
                    dataSource={products}
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
                            `${range[0]}-${range[1]} của ${total} sản phẩm`,
                    }}
                    className="products-table"
                />
            </Card>
        </div>
    );
}

export default ProductsPage;
