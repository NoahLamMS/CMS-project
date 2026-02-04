import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Card } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAuthStore } from '../../../stores/auth.store';
import { appImages } from '../../../constants/app-info';

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const LoginPage = () => {
    const navigate = useNavigate();
    const login = useAuthStore((s) => s.login);

    const onFinish = (_values: LoginFormValues) => {
        login();
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card
                className="w-[460px] px-2 py-4 shadow-xl"
                bordered={false}
            >
                <div className="mb-8 flex items-center justify-center">
                    <img src={appImages.logo} alt="img"/>
                </div>

                <Form
                    layout="vertical"
                    className="space-y-1"
                    initialValues={{
                        email: 'admin@gmail.com',
                        password: 'zaQ@1234',
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item name="email">
                    <Input
                        size="large"
                        className="h-12"
                        prefix={<UserOutlined />}
                        placeholder="Email"
                    />
                    </Form.Item>

                    <Form.Item name="password">
                        <Input.Password
                            size="large"
                            className="h-12"
                            prefix={<LockOutlined />}
                            placeholder="Password"
                        />
                    </Form.Item>

                    <div className="flex items-center justify-between mb-6">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a className="!text-orange-500 text-sm">Forgot password?</a>
                    </div>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className="h-12 !bg-orange-500 text-base"
                            block
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
                <div className="text-center text-sm text-gray-500 mt-4">
                    Don&apos;t have an account?{' '}
                    <a className="!text-orange-500">Register now</a>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;
