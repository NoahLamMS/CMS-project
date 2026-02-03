/**
 * @file ProductCard.tsx
 * @description ProductCard component for new backend
 */

import { IProduct } from '../types/product.types';

interface ProductCardProps {
  product: IProduct;
  onPress?: (product: IProduct) => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <div
      className="rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onPress?.(product)}
    >
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
      )}
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
      <p className="text-blue-600 font-bold text-xl mt-2">
        {product.price.toLocaleString('vi-VN')}đ
      </p>
    </div>
  );
}
