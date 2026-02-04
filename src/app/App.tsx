/**
 * @file App.tsx
 * @description Root application component
 * @author HoangPhuc
 * @created 03-02-2026
 */

import { AntdProvider } from './providers/AntdProvider';
import { QueryProvider } from './providers/QueryProvider';
import Router from './router';

export default function App() {
    return (
        <QueryProvider>
            <AntdProvider>
                <Router />
            </AntdProvider>
        </QueryProvider>
    );
}
