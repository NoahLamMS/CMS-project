/**
 * @file index.ts
 * @description Products feature - Public API exports
 * @author Kindy
 * @created 2025-11-16
 */

export { ProductsPage } from './pages/ProductsPage';
export { useProducts, useProductDetail } from './hooks/useProducts';
export { ProductStatus } from './types/product.types';

export type {
    IProduct,
    IProductFilter,
    ICategory,
    IPaginatedResponse,
    IProductListParams,
    Product,
    ProductFilter,
    Category,
} from './types/product.types';
