/**
 * @file page.tsx
 * @description Orders page
 * @author HoangPhuc
 * @created 03-02-2026
 */

import { Card } from '@/shared/components/ui';

export default function OrdersPage() {
  const orders = [
    { id: 'ORD-001', customer: 'Nguyễn Văn A', total: '2,500,000đ', status: 'Đã giao', date: '2025-11-15' },
    { id: 'ORD-002', customer: 'Trần Thị B', total: '1,800,000đ', status: 'Đang giao', date: '03-02-2026' },
    { id: 'ORD-003', customer: 'Lê Văn C', total: '3,200,000đ', status: 'Chờ xử lý', date: '03-02-2026' },
    { id: 'ORD-004', customer: 'Phạm Thị D', total: '950,000đ', status: 'Đã giao', date: '2025-11-14' },
    { id: 'ORD-005', customer: 'Hoàng Văn E', total: '4,500,000đ', status: 'Đang giao', date: '2025-11-15' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đã giao':
        return 'bg-green-100 text-green-800';
      case 'Đang giao':
        return 'bg-blue-100 text-blue-800';
      case 'Chờ xử lý':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Quản Lý Đơn Hàng</h1>
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mã Đơn</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Khách Hàng</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tổng Tiền</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Trạng Thái</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Ngày</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-800">{order.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{order.customer}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-800">{order.total}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{order.date}</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Xem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

