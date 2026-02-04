/**
 * @file ProductDetailModal.tsx
 * @description Modal for viewing product details
 */

import { Modal, Button, Descriptions, Tag, Image, Typography, Spin } from 'antd';
import { useProductDetail } from '../hooks/useProducts';
import type { IProduct } from '../types/product.types';

const { Title, Text, Paragraph } = Typography;

interface ProductDetailModalProps {
    open: boolean;
    productId: string | null;
    onClose: () => void;
}

export function ProductDetailModal({ open, productId, onClose }: ProductDetailModalProps) {
    const { data: product, isLoading } = useProductDetail(productId || '');

    if (!productId) return null;

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={[
                <Button key="close" onClick={onClose}>
                    Đóng
                </Button>,
            ]}
            width={700}
            title={<Title level={4}>Chi tiết sản phẩm</Title>}
            destroyOnClose
        >
            {isLoading ? (
                <div className="flex justify-center items-center py-10">
                    <Spin size="large" />
                </div>
            ) : product ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Image
                            src={product.image || 'https://via.placeholder.com/300?text=No+Image'}
                            alt={product.name}
                            className="rounded-lg w-full"
                            fallback="https://via.placeholder.com/300?text=Error"
                        />
                    </div>
                    <div className="space-y-2 px-2">
                        <div>
                            <Text type="secondary" className="block text-xs uppercase tracking-wide">ID: {product._id}</Text>
                            <Title level={3} className="!mt-0 !mb-1">{product.name}</Title>
                            <Text className="text-2xl font-bold text-orange-600 block">
                                {product.price?.toLocaleString('vi-VN')} VNĐ
                            </Text>
                        </div>

                        <Descriptions column={1} bordered size="small">
                            <Descriptions.Item label="Ngày tạo">
                                {product.createdAt ? new Date(product.createdAt).toLocaleDateString('vi-VN') : '-'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày cập nhật">
                                {product.updatedAt ? new Date(product.updatedAt).toLocaleDateString('vi-VN') : '-'}
                            </Descriptions.Item>
                        </Descriptions>

                        <div>
                            <Text strong className="block mb-1">Mô tả:</Text>
                            <Paragraph className="text-gray-600 bg-gray-50 rounded-md">
                                {product.description || 'Chưa có mô tả chi tiết cho sản phẩm này.'}
                            </Paragraph>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-10 text-red-500">
                    Không tìm thấy thông tin sản phẩm
                </div>
            )}
        </Modal>
    );
}
