/**
 * @file api-routes.ts
 * @description API Endpoints for ecommerce-nodejs backend
 */

export const API_ENDPOINTS = {
    AUTH: {
        SIGNIN: '/signin',
        SIGNUP: '/signup',
    },
    PRODUCTS: {
        LIST: '/products',
        DETAIL: (id: string) => `/products/${id}`,
        CREATE: '/products',
        UPDATE: (id: string) => `/products/${id}`,
        DELETE: (id: string) => `/products/${id}`,
    },
} as const;
