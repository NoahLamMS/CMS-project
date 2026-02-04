/**
 * @file ProductsPage.tsx
 * @description Products management page with full CRUD - List, Add, Edit, Delete, View Detail
 */

import { useState, useCallback, useMemo } from 'react';
import {
    Card,
    Table,
    Input,
    Button,
    Space,
    Avatar,
    Dropdown,
    Typography,
    Flex,
    message,
    Popconfirm,
    Empty,
} from 'antd';
import type { TableProps } from 'antd';
import {
    SearchOutlined,
    PlusOutlined,
    MoreOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    ReloadOutlined,
} from '@ant-design/icons';
import { useProducts, useDeleteProduct } from '../hooks/useProducts';
import { ProductModal } from '../components/ProductModal';
import { ProductDetailModal } from '../components/ProductDetailModal';
import type { IProduct } from '../types/product.types';

const { Text } = Typography;

interface ProductsPageProps {
    className?: string;
}

export function ProductsPage({ className }: ProductsPageProps) {
    const [searchValue, setSearchValue] = useState('');

    // Edit/Add Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

    // View Detail Modal State
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [viewingProductId, setViewingProductId] = useState<string | null>(null);

    const {
        products,
        total,
        isLoading,
        isFetching,
        page,
        pageSize,
        setPage,
        setPageSize,
        setSearch,
        refetch,
    } = useProducts();

    const deleteProduct = useDeleteProduct();

    const handleSearch = useCallback((value: string) => {
        setSearchValue(value);
        setSearch(value);
    }, [setSearch]);

    const handlePageChange = useCallback((newPage: number, newPageSize: number) => {
        setPage(newPage);
        setPageSize(newPageSize);
    }, [setPage, setPageSize]);

    const handleAddProduct = useCallback(() => {
        setEditingProduct(null);
        setModalOpen(true);
    }, []);

    const handleEdit = useCallback((product: IProduct) => {
        setEditingProduct(product);
        setModalOpen(true);
    }, []);

    const handleView = useCallback((product: IProduct) => {
        setViewingProductId(product._id);
        setDetailModalOpen(true);
    }, []);

    const handleDelete = useCallback(async (product: IProduct) => {
        try {
            await deleteProduct.mutateAsync(product._id);
            message.success('Xóa sản phẩm thành công!');
        } catch {
            message.error('Xóa sản phẩm thất bại!');
        }
    }, [deleteProduct]);

    const handleModalClose = useCallback(() => {
        setModalOpen(false);
        setEditingProduct(null);
    }, []);

    const handleDetailModalClose = useCallback(() => {
        setDetailModalOpen(false);
        setViewingProductId(null);
    }, []);

    const handleModalSuccess = useCallback(() => {
        refetch();
    }, [refetch]);

    const columns = useMemo<TableProps<IProduct>['columns']>(() => [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            width: 100,
            render: (id: string) => (
                <Text className="text-gray-500 text-xs font-mono">
                    ...{id.slice(-6)}
                </Text>
            ),
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (name: string, record: IProduct) => (
                <Flex align="center" gap={12}>
                    <Avatar
                        shape="square"
                        size={48}
                        src={record.image}
                        className="bg-gradient-to-br from-orange-100 to-orange-200"
                    >
                        🛒
                    </Avatar>
                    <div>
                        <Text strong className="block">{name}</Text>
                        <Text className="text-gray-400 text-xs">
                            {record.description?.slice(0, 50) || 'Chưa có mô tả'}
                            {record.description && record.description.length > 50 ? '...' : ''}
                        </Text>
                    </div>
                </Flex>
            ),
        },
        {
            title: 'Giá bán',
            dataIndex: 'price',
            key: 'price',
            width: 150,
            align: 'right',
            sorter: (a, b) => a.price - b.price,
            render: (price: number) => (
                <Text className="text-blue-600 font-semibold">
                    {price?.toLocaleString('vi-VN')} đ
                </Text>
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
            render: (date: string) => (
                <Text className="text-gray-500 text-sm">
                    {date ? new Date(date).toLocaleDateString('vi-VN') : '-'}
                </Text>
            ),
        },
        {
            title: '',
            key: 'actions',
            width: 60,
            fixed: 'right',
            render: (_: unknown, record: IProduct) => (
                <div onClick={(e) => e.stopPropagation()}>
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
                                    danger: true,
                                    label: (
                                        <Popconfirm
                                            title="Xác nhận xóa?"
                                            description={`Bạn có chắc muốn xóa "${record.name}"?`}
                                            onConfirm={() => handleDelete(record)}
                                            okText="Xóa"
                                            cancelText="Hủy"
                                            okButtonProps={{ danger: true }}
                                        >
                                            <span className="text-red-500">Xóa sản phẩm</span>
                                        </Popconfirm>
                                    ),
                                },
                            ],
                        }}
                        trigger={['click']}
                        placement="bottomRight"
                    >
                        <Button type="text" icon={<MoreOutlined />} />
                    </Dropdown>
                </div>
            ),
        },
    ], [handleView, handleEdit, handleDelete]);

    return (
        <div className={className}>
            <Flex justify="space-between" align="center" className="mb-6">
                <div>
                    <Text strong className="text-2xl text-gray-800 block">
                        Quản lý sản phẩm
                    </Text>
                    <Text className="text-gray-500">
                        Tổng cộng {total} sản phẩm
                    </Text>
                </div>
            </Flex>

            <Card className="shadow-sm rounded-xl p-4">
                <div className='p-4'>
                <Flex justify="space-between" align="center" className="mb-4">
                    <Space>
                        <Input
                            placeholder="Tìm kiếm sản phẩm..."
                            prefix={<SearchOutlined className="text-gray-400" />}
                            value={searchValue}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-72"
                            allowClear
                        />
                    </Space>

                    <Flex>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAddProduct}
                            size="large"
                            className="bg-orange-500 hover:bg-orange-600"
                        >
                            Thêm sản phẩm
                        </Button>
                    </Flex>
                </Flex>
                </div>
                <Table<IProduct>
                    columns={columns}
                    dataSource={products}
                    rowKey="_id"
                    loading={isLoading}
                    onRow={(record) => ({
                        onClick: () => handleView(record),
                    })}
                    style={{ cursor: 'pointer' }}
                    pagination={{
                        current: page,
                        pageSize: pageSize,
                        total: total,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSizeOptions: ['5', '10', '20', '50'],
                        onChange: handlePageChange,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} của ${total} sản phẩm`,
                    }}
                    locale={{
                        emptyText: (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description="Chưa có sản phẩm nào"
                            >
                                <Button type="primary" onClick={handleAddProduct}>
                                    Thêm sản phẩm đầu tiên
                                </Button>
                            </Empty>
                        ),
                    }}
                    scroll={{ x: 800 }}
                />
            </Card>

            <ProductModal
                open={modalOpen}
                product={editingProduct}
                onClose={handleModalClose}
                onSuccess={handleModalSuccess}
            />

            <ProductDetailModal
                open={detailModalOpen}
                productId={viewingProductId}
                onClose={handleDetailModalClose}
            />
        </div>
    );
}

export default ProductsPage;
