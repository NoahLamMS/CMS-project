/**
 * @file page.tsx
 * @description Dashboard page
 * @author HoangPhuc
 * @created 03-02-2026
 */

import { Card } from '@/shared/components/ui';

export default function DashboardPage() {
  const stats = [
    { title: 'Tổng Doanh Thu', value: '125,000,000đ', change: '+12.5%', icon: '💰' },
    { title: 'Đơn Hàng', value: '1,234', change: '+8.2%', icon: '📦' },
    { title: 'Khách Hàng', value: '5,678', change: '+15.3%', icon: '👥' },
    { title: 'Sản Phẩm', value: '456', change: '+5.1%', icon: '🛍️' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-green-600 mt-2">{stat.change}</p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Đơn Hàng Gần Đây</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <p className="font-medium text-gray-800">Đơn hàng #{1000 + item}</p>
                  <p className="text-sm text-gray-500">Khách hàng {item}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{(item * 500000).toLocaleString('vi-VN')}đ</p>
                  <p className="text-xs text-green-600">Đã thanh toán</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Sản Phẩm Bán Chạy</h2>
          <div className="space-y-4">
            {[
              { name: 'Áo Thun Basic', sales: 234, revenue: '46,800,000đ' },
              { name: 'Quần Jean', sales: 189, revenue: '94,500,000đ' },
              { name: 'Áo Khoác', sales: 156, revenue: '93,600,000đ' },
              { name: 'Áo Sơ Mi', sales: 142, revenue: '56,800,000đ' },
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sales} đã bán</p>
                </div>
                <p className="font-semibold text-gray-800">{product.revenue}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

