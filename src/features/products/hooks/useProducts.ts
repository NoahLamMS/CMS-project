/**
 * @file useProducts.ts
 * @description Custom hook for product management using real API
 */

import { useState, useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '../api/productApi';
import type {
  IProduct,
  IProductFilter,
  CreateProductData,
  UpdateProductData,
} from '../types/product.types';

interface UseProductsOptions {
  initialFilter?: IProductFilter;
  initialPage?: number;
  initialPageSize?: number;
}

interface UseProductsReturn {
  products: IProduct[];
  total: number;
  totalPages: number;
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  filter: IProductFilter;
  setFilter: (filter: IProductFilter) => void;
  setSearch: (search: string) => void;
  resetFilter: () => void;
  refetch: () => void;
}

const DEFAULT_FILTER: IProductFilter = {};
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
  const {
    initialFilter = DEFAULT_FILTER,
    initialPage = DEFAULT_PAGE,
    initialPageSize = DEFAULT_PAGE_SIZE,
  } = options;

  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [filter, setFilter] = useState<IProductFilter>(initialFilter);

  const {
    data: products = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ['products', filter],
    queryFn: () => productApi.getProducts(),
    staleTime: 5 * 60 * 1000,
  });

  // Client-side filtering and pagination
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filter.search) {
      const search = filter.search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(search));
    }

    if (filter.minPrice !== undefined) {
      result = result.filter(p => p.price >= filter.minPrice!);
    }

    if (filter.maxPrice !== undefined) {
      result = result.filter(p => p.price <= filter.maxPrice!);
    }

    return result;
  }, [products, filter]);

  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / pageSize);
  const paginatedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

  const setSearch = useCallback((search: string) => {
    setFilter(prev => ({ ...prev, search: search || undefined }));
    setPage(1);
  }, []);

  const resetFilter = useCallback(() => {
    setFilter(DEFAULT_FILTER);
    setPage(DEFAULT_PAGE);
  }, []);

  return {
    products: paginatedProducts,
    total,
    totalPages,
    isLoading,
    isFetching,
    error: error as Error | null,
    page,
    pageSize,
    setPage,
    setPageSize,
    filter,
    setFilter,
    setSearch,
    resetFilter,
    refetch,
  };
}

export function useProductDetail(productId: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => productApi.getProductById(productId),
    enabled: !!productId,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductData) => productApi.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductData }) =>
      productApi.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
