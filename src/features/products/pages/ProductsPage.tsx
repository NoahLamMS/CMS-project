import { Input, Button, Tabs, Table, Flex } from 'antd';
import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { useProducts } from '../hooks/useProducts';
import { getProductColumns } from '../components/ProductTableColumns';
import { useMemo, useCallback } from 'react';

const ProductsPage = () => {
    const {
        products,
        total,
        page,
        pageSize,
        isLoading,
        filters,
        handleSearch,
        handleStatusFilter,
        handlePageChange,
    } = useProducts();

    const columns = useMemo(() => getProductColumns(), []);

    const handleSearchChange = useCallback(
        (value: string) => {
            handleSearch(value);
        },
        [handleSearch]
    );

    const allCount = useMemo(() => {
        return total;
    }, [total]);

    const inStockCount = useMemo(() => {
        return products.filter((p) => p.status === 'in-stock').length;
    }, [products]);

    const outOfStockCount = useMemo(() => {
        return products.filter((p) => p.status === 'out-of-stock').length;
    }, [products]);

    const tabItems = [
        {
            key: 'all',
            label: `Tất cả (${allCount})`,
            children: null,
        },
        {
            key: 'in-stock',
            label: `Còn hàng (${inStockCount})`,
            children: null,
        },
        {
            key: 'out-of-stock',
            label: `Hết hàng (${outOfStockCount})`,
            children: null,
        },
    ];

    return (
        <div className="bg-white rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <Flex gap={10}>
                    {/* <Space.Compact> */}
                    <Input.Search
                        size='large'
                        placeholder="Tìm kiếm"
                        // prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                        allowClear
                        onChange={(e) => handleSearchChange(e.target.value)}
                        value={filters.search}
                    />
                    {/* </Space.Compact> */}
                    <Button icon={<FilterOutlined />} size='large'>Lọc</Button>
                </Flex>

                <Button type="primary" icon={<PlusOutlined />} size="large">
                    Thêm sản phẩm
                </Button>
            </div>

            <Tabs
                activeKey={filters.status}
                items={tabItems}
                onChange={(key) =>
                    handleStatusFilter(key as 'all' | 'in-stock' | 'out-of-stock')
                }
                className="mb-4"
            />

            <Table
                columns={columns}
                dataSource={products}
                rowKey="id"
                loading={isLoading}
                pagination={{
                    current: page,
                    pageSize: pageSize,
                    total: total,
                    showSizeChanger: true,
                    // showTotal: (total) => `${total} sản phẩm`,
                    onChange: handlePageChange,
                    position: ['bottomRight'],
                }}
            />
        </div>
    );
};

export default ProductsPage;
