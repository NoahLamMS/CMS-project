/**
 * @file ProductList.tsx
 * @description ProductList component
 * @author Kindy
 * @created 2025-11-16
 */

'use client';

import { useProducts } from '../hooks/useProducts';
import { ProductCard } from './ProductCard';

export function ProductList() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

