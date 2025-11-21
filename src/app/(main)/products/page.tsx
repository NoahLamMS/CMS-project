/**
 * @file page.tsx
 * @description Products page
 * @author Kindy
 * @created 2025-11-16
 */

import { ProductList } from '@/features/products';
import { Button } from '@/shared/components/ui';

export default function ProductsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản Lý Sản Phẩm</h1>
        <Button variant="primary">Thêm Sản Phẩm</Button>
      </div>
      <ProductList />
    </div>
  );
}

