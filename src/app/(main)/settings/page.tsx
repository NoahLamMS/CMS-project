/**
 * @file page.tsx
 * @description Settings page
 * @author HoangPhuc
 * @created 03-02-2026
 */

import { Card } from '@/shared/components/ui';
import { Input, Button } from '@/shared/components/ui';

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Cài Đặt</h1>
      
      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Thông Tin Tài Khoản</h2>
          <div className="space-y-4">
            <Input label="Tên" defaultValue="HoangPhuc" />
            <Input label="Email" type="email" defaultValue="HoangPhuc@example.com" />
            <Input label="Số Điện Thoại" defaultValue="0123456789" />
            <Button variant="primary">Lưu Thay Đổi</Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Đổi Mật Khẩu</h2>
          <div className="space-y-4">
            <Input label="Mật Khẩu Hiện Tại" type="password" />
            <Input label="Mật Khẩu Mới" type="password" />
            <Input label="Xác Nhận Mật Khẩu" type="password" />
            <Button variant="primary">Đổi Mật Khẩu</Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Cài Đặt Hệ Thống</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Thông Báo Email</p>
                <p className="text-sm text-gray-500">Nhận thông báo qua email</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Thông Báo Push</p>
                <p className="text-sm text-gray-500">Nhận thông báo push</p>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

