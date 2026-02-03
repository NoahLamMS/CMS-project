/**
 * @file page.tsx
 * @description Customers page
 * @author Kindy
 * @created 2025-11-16
 */

import { Card } from '@/shared/components/ui';

export default function CustomersPage() {
  const customers = [
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', orders: 12, total: '15,000,000đ' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', orders: 8, total: '9,500,000đ' },
    { id: 3, name: 'Lê Văn C', email: 'levanc@example.com', orders: 15, total: '22,000,000đ' },
    { id: 4, name: 'Phạm Thị D', email: 'phamthid@example.com', orders: 5, total: '6,200,000đ' },
    { id: 5, name: 'Hoàng Văn E', email: 'hoangvane@example.com', orders: 20, total: '28,500,000đ' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Quản Lý Khách Hàng</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <Card key={customer.id} className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                {customer.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{customer.name}</h3>
                <p className="text-sm text-gray-500">{customer.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Số đơn hàng:</span>
                <span className="font-medium text-gray-800">{customer.orders}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tổng chi tiêu:</span>
                <span className="font-semibold text-blue-600">{customer.total}</span>
              </div>
            </div>
            <button className="mt-4 w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-800 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
              Xem Chi Tiết
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

