/**
 * @file ProductCard.tsx
 * @description ProductCard component
 * @author Kindy
 * @created 2025-11-16
 */

'use client';

import { Product } from '../types/product.types';

interface ProductCardProps {
  product: Product;
  onPress?: (product: Product) => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <div
      className="rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onPress?.(product)}
    >
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-600 text-sm">{product.category}</p>
      <p className="text-blue-600 font-bold text-xl mt-2">{product.price.toLocaleString('vi-VN')}đ</p>
    </div>
  );
}

