/**
 * @file App.tsx
 * @description Root application component
 * @author Kindy
 * @created 2025-11-16
 */

import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import { AppRoutes } from './routes';

const theme = {
    token: {
        colorPrimary: '#F97316',
        borderRadius: 8,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    components: {
        Menu: {
            itemSelectedBg: '#FFF7ED',
            itemSelectedColor: '#EA580C',
            itemHoverBg: '#FFF7ED',
        },
        Button: {
            primaryShadow: 'none',
        },
        Table: {
            headerBg: '#FAFAFA',
        },
    },
};

export default function App() {
    return (
        <ConfigProvider theme={theme} locale={viVN}>
            <AppRoutes />
        </ConfigProvider>
    );
}
