/**
 * @file productApi.ts
 * @description Product API for ecommerce-nodejs backend
 */

import { apiClient } from '@/services/axios.instance';
import { API_ENDPOINTS } from '@/constants/api-routes';
import { IProduct, CreateProductData, UpdateProductData } from '../types/product.types';

export const productApi = {
  getProducts: async (): Promise<IProduct[]> => {
    const { data } = await apiClient.get<IProduct[]>(API_ENDPOINTS.PRODUCTS.LIST);
    return data;
  },

  getProductById: async (id: string): Promise<IProduct> => {
    const { data } = await apiClient.get<IProduct>(API_ENDPOINTS.PRODUCTS.DETAIL(id));
    return data;
  },

  createProduct: async (productData: CreateProductData): Promise<IProduct> => {
    const { data } = await apiClient.post<IProduct>(
      API_ENDPOINTS.PRODUCTS.CREATE,
      productData
    );
    return data;
  },

  updateProduct: async (id: string, productData: UpdateProductData): Promise<IProduct> => {
    const { data } = await apiClient.put<IProduct>(
      API_ENDPOINTS.PRODUCTS.UPDATE(id),
      productData
    );
    return data;
  },

  deleteProduct: async (id: string): Promise<IProduct> => {
    const { data } = await apiClient.delete<IProduct>(API_ENDPOINTS.PRODUCTS.DELETE(id));
    return data;
  },
};
