/**
 * @file ProductModal.tsx
 * @description Modal for creating and editing products
 */

import { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, message } from 'antd';
import { useCreateProduct, useUpdateProduct } from '../hooks/useProducts';
import type { IProduct, CreateProductData, UpdateProductData } from '../types/product.types';

interface ProductModalProps {
    open: boolean;
    product?: IProduct | null;
    onClose: () => void;
    onSuccess: () => void;
}

export function ProductModal({ open, product, onClose, onSuccess }: ProductModalProps) {
    const [form] = Form.useForm();
    const createProduct = useCreateProduct();
    const updateProduct = useUpdateProduct();

    const isEditing = !!product;
    const isLoading = createProduct.isPending || updateProduct.isPending;

    useEffect(() => {
        if (open && product) {
            form.setFieldsValue({
                name: product.name,
                price: product.price,
                image: product.image,
                description: product.description,
            });
        } else if (open) {
            form.resetFields();
        }
    }, [open, product, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            if (isEditing && product) {
                const updateData: UpdateProductData = {
                    name: values.name,
                    price: values.price,
                    image: values.image || undefined,
                    description: values.description || undefined,
                };
                await updateProduct.mutateAsync({ id: product._id, data: updateData });
                message.success('Cập nhật sản phẩm thành công!');
            } else {
                const createData: CreateProductData = {
                    name: values.name,
                    price: values.price,
                    image: values.image || undefined,
                    description: values.description || undefined,
                };
                await createProduct.mutateAsync(createData);
                message.success('Thêm sản phẩm thành công!');
            }

            onSuccess();
            onClose();
            form.resetFields();
        } catch (error) {
            if (error instanceof Error) {
                message.error(error.message || 'Có lỗi xảy ra!');
            }
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title={isEditing ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
            open={open}
            onOk={handleSubmit}
            onCancel={handleCancel}
            okText={isEditing ? 'Cập nhật' : 'Thêm'}
            cancelText="Hủy"
            confirmLoading={isLoading}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                className="mt-4"
            >
                <Form.Item
                    name="name"
                    label="Tên sản phẩm"
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên sản phẩm!' },
                        { min: 2, message: 'Tên sản phẩm phải có ít nhất 2 ký tự!' },
                    ]}
                >
                    <Input placeholder="Nhập tên sản phẩm" />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Giá bán (VNĐ)"
                    rules={[
                        { required: true, message: 'Vui lòng nhập giá!' },
                        { type: 'number', min: 0, message: 'Giá phải lớn hơn 0!' },
                    ]}
                >
                    <InputNumber
                        placeholder="Nhập giá"
                        className="w-full"
                        style={{ width: '100%' }}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value?.replace(/,/g, '') as unknown as number}
                    />
                </Form.Item>

                <Form.Item
                    name="image"
                    label="URL Hình ảnh"
                >
                    <Input placeholder="https://example.com/image.jpg" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Mô tả"
                >
                    <Input.TextArea
                        placeholder="Nhập mô tả sản phẩm"
                        rows={3}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}
