/**
 * @file handleApi.ts
 * @description API call wrapper with error handling
 * @author HoangPhuc
 * @created 04-02-2026
 */

import { AxiosError, AxiosResponse } from 'axios';
import { ApiResponse } from './types';

export async function handleApi<T>(
    promise: Promise<AxiosResponse<T>>
): Promise<ApiResponse<T>> {
    try {
        const response = await promise;
        return {
            data: response.data,
            error: null,
            status: response.status,
        };
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        return {
            data: null,
            error: error.response?.data?.message || error.message || 'An error occurred',
            status: error.response?.status || 500,
        };
    }
}
