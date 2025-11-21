/**
 * @file useProducts.ts
 * @description Product hooks
 * @author Kindy
 * @created 2025-11-16
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { productApi } from '../api/productApi';
import { Product, ProductFilter } from '../types/product.types';

export function useProducts(filter?: ProductFilter) {
  return useQuery<Product[]>({
    queryKey: ['products', filter],
    queryFn: () => productApi.getProducts(filter),
  });
}

export function useProductDetail(id: string) {
  return useQuery<Product | null>({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id),
    enabled: !!id,
  });
}

