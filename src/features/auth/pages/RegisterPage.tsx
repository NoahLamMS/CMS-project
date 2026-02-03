/**
 * @file RegisterPage.tsx
 * @description Register page connected to backend /api/signup
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message, Divider, InputNumber } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useAuthStore } from '../store/authStore';

const { Title, Text } = Typography;

interface RegisterFormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    age?: number;
}

export function RegisterPage() {
    const navigate = useNavigate();
    const { register, loading } = useAuthStore();
    const [form] = Form.useForm();

    const handleSubmit = async (values: RegisterFormValues) => {
        if (values.password !== values.confirmPassword) {
            message.error('Mật khẩu xác nhận không khớp!');
            return;
        }

        try {
            await register({
                username: values.username,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
                age: values.age,
            });
            message.success('Đăng ký thành công!');
            navigate('/dashboard');
        } catch (error) {
            if (error instanceof Error) {
                message.error(error.message || 'Đăng ký thất bại!');
            } else {
                message.error('Đăng ký thất bại. Vui lòng thử lại.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 py-8">
            <Card
                className="w-full max-w-md shadow-2xl rounded-2xl border-0"
                styles={{ body: { padding: '40px' } }}
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <span className="text-3xl">🛒</span>
                    </div>
                    <Title level={2} className="!mb-2 !text-gray-800">
                        Đăng ký
                    </Title>
                    <Text className="text-gray-500">
                        Tạo tài khoản mới để bắt đầu
                    </Text>
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    autoComplete="off"
                    size="large"
                >
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: 'Vui lòng nhập tên người dùng!' },
                            { min: 3, message: 'Tên phải có ít nhất 3 ký tự!' },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder="Tên người dùng"
                            className="rounded-lg"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="text-gray-400" />}
                            placeholder="Email"
                            className="rounded-lg"
                        />
                    </Form.Item>

                    <Form.Item
                        name="age"
                    >
                        <InputNumber
                            placeholder="Tuổi (không bắt buộc)"
                            className="w-full rounded-lg"
                            min={1}
                            max={120}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu!' },
                            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Mật khẩu"
                            className="rounded-lg"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Xác nhận mật khẩu"
                            className="rounded-lg"
                        />
                    </Form.Item>

                    <Form.Item className="mb-2">
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                            className="h-12 rounded-lg bg-orange-500 hover:bg-orange-600 text-base font-medium"
                        >
                            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                        </Button>
                    </Form.Item>
                </Form>

                <Divider className="!text-gray-400">hoặc</Divider>

                <div className="text-center">
                    <Text className="text-gray-500">
                        Đã có tài khoản?{' '}
                        <Link to="/login" className="text-orange-500 hover:text-orange-600 font-medium">
                            Đăng nhập
                        </Link>
                    </Text>
                </div>
            </Card>
        </div>
    );
}

export default RegisterPage;
