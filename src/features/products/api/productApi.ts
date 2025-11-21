/**
 * @file productApi.ts
 * @description Product API
 * @author Kindy
 * @created 2025-11-16
 */

import { apiClient } from '@/core/api/client';
import { API_ENDPOINTS } from '@/core/api/endpoints';
import { Product, ProductFilter } from '../types/product.types';

export const productApi = {
  // GET - List products with filters
  getProducts: async (filter?: ProductFilter): Promise<Product[]> => {
    const { data } = await apiClient.get<Product[]>(API_ENDPOINTS.PRODUCTS.LIST, {
      params: filter,
    });
    return data;
  },

  // GET - Product detail
  getProductDetail: async (id: string): Promise<Product> => {
    const { data } = await apiClient.get<Product>(API_ENDPOINTS.PRODUCTS.DETAIL(id));
    return data;
  },

  // POST - Create product
  createProduct: async (productData: Omit<Product, 'id'>): Promise<Product> => {
    const { data } = await apiClient.post<Product>(
      API_ENDPOINTS.PRODUCTS.CREATE,
      productData
    );
    return data;
  },

  // PUT - Update product
  updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
    const { data } = await apiClient.put<Product>(
      API_ENDPOINTS.PRODUCTS.UPDATE(id),
      productData
    );
    return data;
  },

  // DELETE - Delete product
  deleteProduct: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.PRODUCTS.DELETE(id));
  },
};
