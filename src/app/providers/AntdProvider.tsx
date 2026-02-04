/**
 * @file AntdProvider.tsx
 * @description Ant Design theme configuration provider
 * @author HoangPhuc
 * @created 04-02-2026
 */

import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import { ReactNode } from 'react';

const theme = {
    token: {
        colorPrimary: '#0ba1ddc4',
        borderRadius: 8,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    components: {
        Menu: {
            itemSelectedBg: '#cbfcffff',
            // itemSelectedColor: '#000000',
            itemHoverBg: '#cbfcffff',
        },
        Button: {
            primaryShadow: 'none',
        },
        Table: {
            headerBg: '#FAFAFA',
        },
    },
};

export function AntdProvider({ children }: { children: ReactNode }) {
    return (
        <ConfigProvider theme={theme} locale={viVN}>
            {children}
        </ConfigProvider>
    );
}
