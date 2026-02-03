/**
 * @file index.ts
 * @description Products feature - Public API exports
 */

export { ProductsPage } from './pages/ProductsPage';
export {
    useProducts,
    useProductDetail,
    useCreateProduct,
    useUpdateProduct,
    useDeleteProduct,
} from './hooks/useProducts';
export { productApi } from './api/productApi';

export type {
    IProduct,
    IProductFilter,
    IPaginatedResponse,
    IProductListParams,
    CreateProductData,
    UpdateProductData,
    Product,
    ProductFilter,
} from './types/product.types';
