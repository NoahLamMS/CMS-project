/**
 * @file types.ts
 * @description Common types for API responses
 * @author HoangPhuc
 * @created 04-02-2026
 */

export interface ApiResponse<T> {
    data: T | null;
    error: string | null;
    status: number;
}
