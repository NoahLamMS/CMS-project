import { useQuery } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import { getProducts } from '../api/products.api';
import type { ProductFilters } from '../types/product.types';

export const useProducts = () => {
    const [filters, setFilters] = useState<ProductFilters>({
        search: '',
        status: 'all',
        page: 1,
        pageSize: 10,
    });

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['products', filters],
        queryFn: () => getProducts(filters),
    });

    const handleSearch = useCallback((search: string) => {
        setFilters((prev) => ({ ...prev, search, page: 1 }));
    }, []);

    const handleStatusFilter = useCallback((status: 'all' | 'in-stock' | 'out-of-stock') => {
        setFilters((prev) => ({ ...prev, status, page: 1 }));
    }, []);

    const handlePageChange = useCallback((page: number, pageSize: number) => {
        setFilters((prev) => ({ ...prev, page, pageSize }));
    }, []);

    return {
        products: data?.data || [],
        total: data?.total || 0,
        page: filters.page || 1,
        pageSize: filters.pageSize || 10,
        isLoading,
        error,
        filters,
        handleSearch,
        handleStatusFilter,
        handlePageChange,
        refetch,
    };
};
