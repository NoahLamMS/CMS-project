/**
 * @file page.tsx
 * @description Reports page
 * @author Kindy
 * @created 2025-11-16
 */

import { Card } from '@/shared/components/ui';

export default function ReportsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Báo Cáo & Thống Kê</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Doanh Thu Theo Tháng</h2>
          <div className="space-y-3">
            {[
              { month: 'Tháng 11/2025', revenue: '125,000,000đ', growth: '+12.5%' },
              { month: 'Tháng 10/2025', revenue: '111,000,000đ', growth: '+8.2%' },
              { month: 'Tháng 9/2025', revenue: '102,500,000đ', growth: '+5.1%' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <p className="font-medium text-gray-800">{item.month}</p>
                  <p className="text-sm text-green-600">{item.growth}</p>
                </div>
                <p className="font-semibold text-gray-800">{item.revenue}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Sản Phẩm</h2>
          <div className="space-y-3">
            {[
              { name: 'Áo Thun Basic', sales: 234, revenue: '46,800,000đ' },
              { name: 'Quần Jean', sales: 189, revenue: '94,500,000đ' },
              { name: 'Áo Khoác', sales: 156, revenue: '93,600,000đ' },
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

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Tổng Quan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">125M</p>
            <p className="text-sm text-gray-600 mt-1">Tổng Doanh Thu</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">1,234</p>
            <p className="text-sm text-gray-600 mt-1">Tổng Đơn Hàng</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">5,678</p>
            <p className="text-sm text-gray-600 mt-1">Tổng Khách Hàng</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

