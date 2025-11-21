/**
 * @file index.ts
 * @description Products feature - Public API
 * @author Kindy
 * @created 2025-11-16
 */

// Export components
export { ProductCard } from './components/ProductCard';
export { ProductList } from './components/ProductList';

// Export hooks
export { useProducts, useProductDetail } from './hooks/useProducts';

// Export API
export { productApi } from './api/productApi';

// Export types
export type { Product, ProductFilter } from './types/product.types';

