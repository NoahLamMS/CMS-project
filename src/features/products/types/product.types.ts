/**
 * @file product.types.ts
 * @description Product type definitions matching ecommerce-nodejs backend
 */

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProductFilter {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface IPaginationParams {
  page: number;
  pageSize: number;
}

export interface IPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface IProductListParams extends IPaginationParams {
  filter?: IProductFilter;
  sortBy?: keyof IProduct;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateProductData {
  name: string;
  price: number;
  image?: string;
  description?: string;
}

export interface UpdateProductData {
  name?: string;
  price?: number;
  image?: string;
  description?: string;
}

// Aliases for backward compatibility
export type Product = IProduct;
export type ProductFilter = IProductFilter;
