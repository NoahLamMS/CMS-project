/**
 * @file LoginPage.tsx
 * @description Login page connected to backend /api/signin
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuthStore } from '../store/authStore';

const { Title, Text } = Typography;

interface LoginFormValues {
    email: string;
    password: string;
}

export function LoginPage() {
    const navigate = useNavigate();
    const { login, loading } = useAuthStore();
    const [form] = Form.useForm();

    const handleSubmit = async (values: LoginFormValues) => {
        try {
            await login(values);
            message.success('Đăng nhập thành công!');
            navigate('/dashboard');
        } catch (error) {
            if (error instanceof Error) {
                message.error(error.message || 'Đăng nhập thất bại!');
            } else {
                message.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
            <Card
                className="w-full max-w-md shadow-2xl rounded-2xl border-0"
                styles={{ body: { padding: '40px' } }}
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <span className="text-3xl">🛒</span>
                    </div>
                    <Title level={2} className="!mb-2 !text-gray-800">
                        Đăng nhập
                    </Title>
                    <Text className="text-gray-500">
                        Chào mừng bạn quay trở lại!
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
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder="Email"
                            className="rounded-lg"
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

                    <Form.Item className="mb-2">
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                            className="h-12 rounded-lg bg-orange-500 hover:bg-orange-600 text-base font-medium"
                        >
                            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </Button>
                    </Form.Item>
                </Form>

                <Divider className="!text-gray-400">hoặc</Divider>

                <div className="text-center">
                    <Text className="text-gray-500">
                        Chưa có tài khoản?{' '}
                        <Link to="/register" className="text-orange-500 hover:text-orange-600 font-medium">
                            Đăng ký ngay
                        </Link>
                    </Text>
                </div>
            </Card>
        </div>
    );
}

export default LoginPage;
