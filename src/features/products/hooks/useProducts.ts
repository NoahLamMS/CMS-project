/**
 * @file useProducts.ts
 * @description Custom hook for product management with useState, useEffect, useCallback
 * @author Kindy
 * @created 2025-11-16
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductStatus } from '../types/product.types';
import type {
  IProduct,
  IProductFilter,
  IProductListParams,
  IPaginatedResponse,
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
  setStatus: (status: ProductStatus | undefined) => void;
  resetFilter: () => void;
  refetch: () => void;
}

const mockProducts: IProduct[] = [
  {
    id: '#12345',
    name: 'Hộp trứng gà PinkyEgg 6 quả',
    image: '/images/egg-box-6.png',
    category: { id: '1', name: 'Hộp 6', slug: 'hop-6', color: '#3B82F6' },
    price: 25000,
    stockQuantity: 0,
    status: ProductStatus.OUT_OF_STOCK,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '#12346',
    name: 'Giỏ trứng gà PinkyEgg 30 quả',
    image: '/images/egg-basket-30.png',
    category: { id: '2', name: 'Hộp 30', slug: 'hop-30', color: '#3B82F6' },
    price: 125000,
    stockQuantity: 0,
    status: ProductStatus.OUT_OF_STOCK,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '#12347',
    name: 'Pinky Egg Organic hộp 6',
    image: '/images/egg-organic-6.png',
    category: { id: '1', name: 'Hộp 6', slug: 'hop-6', color: '#3B82F6' },
    price: 35000,
    stockQuantity: 95,
    status: ProductStatus.IN_STOCK,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '#18050',
    name: 'Hộp trứng gà PinkyEgg 12 quả',
    image: '/images/egg-box-12.png',
    category: { id: '3', name: 'Hộp 12', slug: 'hop-12', color: '#8B5CF6' },
    price: 45000,
    stockQuantity: 0,
    status: ProductStatus.OUT_OF_STOCK,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '#12348',
    name: 'Khay trứng gà 30 quả',
    image: '/images/egg-tray-30.png',
    category: { id: '2', name: 'Hộp 30', slug: 'hop-30', color: '#3B82F6' },
    price: 95000,
    stockQuantity: 593,
    status: ProductStatus.IN_STOCK,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '#12349',
    name: 'Hộp trứng gà PinkyEgg 6 quả',
    image: '/images/egg-box-6.png',
    category: { id: '1', name: 'Hộp 6', slug: 'hop-6', color: '#3B82F6' },
    price: 25000,
    stockQuantity: 0,
    status: ProductStatus.OUT_OF_STOCK,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '#12350',
    name: 'Giỏ trứng gà PinkyEgg 30 quả',
    image: '/images/egg-basket-30.png',
    category: { id: '2', name: 'Hộp 30', slug: 'hop-30', color: '#3B82F6' },
    price: 125000,
    stockQuantity: 0,
    status: ProductStatus.OUT_OF_STOCK,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '#12351',
    name: 'Pinky Egg Organic hộp 6',
    image: '/images/egg-organic-6.png',
    category: { id: '1', name: 'Hộp 6', slug: 'hop-6', color: '#3B82F6' },
    price: 35000,
    stockQuantity: 95,
    status: ProductStatus.IN_STOCK,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '#18051',
    name: 'Hộp trứng gà PinkyEgg 12 quả',
    image: '/images/egg-box-12.png',
    category: { id: '3', name: 'Hộp 12', slug: 'hop-12', color: '#8B5CF6' },
    price: 45000,
    stockQuantity: 0,
    status: ProductStatus.OUT_OF_STOCK,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '#12352',
    name: 'Khay trứng gà 30 quả',
    image: '/images/egg-tray-30.png',
    category: { id: '2', name: 'Hộp 30', slug: 'hop-30', color: '#3B82F6' },
    price: 95000,
    stockQuantity: 593,
    status: ProductStatus.IN_STOCK,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
];

const fetchProducts = async (params: IProductListParams): Promise<IPaginatedResponse<IProduct>> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  let filtered = [...mockProducts];

  if (params.filter?.search) {
    const search = params.filter.search.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search));
  }

  if (params.filter?.status) {
    filtered = filtered.filter(p => p.status === params.filter?.status);
  }

  const total = filtered.length;
  const start = (params.page - 1) * params.pageSize;
  const data = filtered.slice(start, start + params.pageSize);

  return {
    data,
    total,
    page: params.page,
    pageSize: params.pageSize,
    totalPages: Math.ceil(total / params.pageSize),
  };
};

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

  const queryParams = useMemo<IProductListParams>(() => ({
    page,
    pageSize,
    filter,
  }), [page, pageSize, filter]);

  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => fetchProducts(queryParams),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const setSearch = useCallback((search: string) => {
    setFilter(prev => ({ ...prev, search: search || undefined }));
  }, []);

  const setStatus = useCallback((status: ProductStatus | undefined) => {
    setFilter(prev => ({ ...prev, status }));
  }, []);

  const resetFilter = useCallback(() => {
    setFilter(DEFAULT_FILTER);
    setPage(DEFAULT_PAGE);
  }, []);

  return {
    products: data?.data ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
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
    setStatus,
    resetFilter,
    refetch,
  };
}

export function useProductDetail(productId: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockProducts.find(p => p.id === productId) ?? null;
    },
    enabled: !!productId,
  });
}
