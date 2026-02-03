/**
 * @file product.types.ts
 * @description Product type definitions with TypeScript interfaces
 * @author Kindy
 * @created 2025-11-16
 */

export enum ProductStatus {
  IN_STOCK = 'in_stock',
  OUT_OF_STOCK = 'out_of_stock',
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

export interface IProduct {
  id: string;
  name: string;
  image?: string;
  category: ICategory;
  price: number;
  stockQuantity: number;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IProductFilter {
  search?: string;
  categoryId?: string;
  status?: ProductStatus;
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

export type Product = IProduct;
export type ProductFilter = IProductFilter;
export type Category = ICategory;
