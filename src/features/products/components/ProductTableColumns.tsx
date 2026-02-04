import { Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Product } from '../types/product.types';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';

export const getProductColumns = (): ColumnsType<Product> => [
    {
        title: 'MSP',
        dataIndex: 'code',
        key: 'code',
        width: 100,
        render: (code: string) => (
            <div className="flex items-center gap-2">
                <span className="font-medium">{code}</span>
            </div>
        ),
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',
        width: 300,
        render: (name: string, record: Product) => (
            <div className="flex items-center gap-3">
                <img
                    src={record.image}
                    alt={name}
                    className="w-10 h-10 rounded object-cover"
                />
                <span>{name}</span>
            </div>
        ),
    },
    {
        title: 'Danh mục',
        dataIndex: 'category',
        key: 'category',
        width: 150,
        render: (category: Product['category']) => (
            <Tag
                color={category.color}
                style={{
                    borderRadius: '4px',
                    padding: '2px 12px',
                    border: 'none',
                }}
            >
                {category.name}
            </Tag>
        ),
    },
    {
        title: 'Giá bán',
        dataIndex: 'price',
        key: 'price',
        width: 120,
        render: (price: number) => (
            <span className="font-medium">
                {price.toLocaleString('vi-VN')} VNĐ
            </span>
        ),
    },
    {
        title: 'Số lượng kho',
        dataIndex: 'stock',
        key: 'stock',
        width: 120,
        align: 'center',
        render: (stock: number) => <span>{stock}</span>,
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        width: 120,
        render: (status: Product['status']) => {
            const isInStock = status === 'in-stock';
            return (
                <Tag
                    style={{
                        backgroundColor: isInStock ? '#D1FAE5' : '#FEE2E2',
                        borderRadius: '4px',
                        padding: '2px 12px',
                        // border: `1px solid ${isInStock ? '#10B981' : '#EF4444'}`,
                        color: isInStock ? '#065F46' : '#991B1B',
                        fontWeight: 500,
                    }}
                >
                    {isInStock ? 'Còn hàng' : 'Hết hàng'}
                </Tag>
            );
        },
    },
    {
        title: '',
        key: 'actions',
        width: 50,
        render: () => (
            <Dropdown
                menu={{
                    items: [
                        { key: 'edit', label: 'Chỉnh sửa' },
                        { key: 'delete', label: 'Xóa' },
                        { key: 'view', label: 'Xem chi tiết' },
                    ],
                }}
                trigger={['click']}
            >
                <MoreOutlined className="cursor-pointer text-lg" />
            </Dropdown>
        ),
    },
];
