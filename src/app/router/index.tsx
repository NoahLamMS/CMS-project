/**
 * @file index.tsx
 * @description Router component using useRoutes
 * @author HoangPhuc
 * @created 04-02-2026
 */

import { useRoutes } from 'react-router-dom';
import { routes } from './routes';

export function Router() {
    return useRoutes(routes);
}

export default Router;
