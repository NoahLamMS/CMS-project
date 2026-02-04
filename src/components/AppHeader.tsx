import { Layout, Dropdown, Badge, Avatar } from "antd";
import { BellOutlined, DownOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

const { Header } = Layout;

const AppHeader = () => {
  const location = useLocation();

  const pageTitle = useMemo(() => {
    const titles: Record<string, string> = {
      "/dashboard": "Tổng quan",
      "/products": "Quản lý sản phẩm",
      "/warehouse": "Quản lý kho",
      "/collaborators": "Quản lý cộng tác viên",
      "/orders": "Xử lý đơn hàng",
      "/marketing": "Tiếp thị & Khuyến mãi",
      "/messages": "Tin nhắn",
    };
    return titles[location.pathname] || "Dashboard";
  }, [location.pathname]);

  const languageItems = [
    { key: "vi", label: "Tiếng Việt" },
    { key: "en", label: "English" },
  ];

  const userMenuItems = [
    { key: "profile", label: "Hồ sơ" },
    { key: "settings", label: "Cài đặt" },
    { key: "logout", label: "Đăng xuất" },
  ];

  return (
    <Header className="!bg-white px-6 flex justify-between items-center border-b border-[#f0f0f0]">
      <div className="text-lg font-semibold">{pageTitle}</div>

      <div className="flex items-center gap-4">
        <Dropdown menu={{ items: languageItems }} trigger={["click"]}>
          <div className="flex items-center gap-2 cursor-pointer px-3 py-1 rounded hover:bg-gray-50">
            <span className="text-2xl">🇻🇳</span>
            <span className="font-medium">VIE</span>
            <DownOutlined className="text-xs" />
          </div>
        </Dropdown>

        <Badge count={5} size="small" offset={[-5, 5]}>
          <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 cursor-pointer">
            <BellOutlined className="text-lg" />
          </div>
        </Badge>

        <Dropdown menu={{ items: userMenuItems }} trigger={["click"]}>
          <div className="flex items-center gap-2 cursor-pointer px-3 py-1 rounded hover:bg-gray-50">
            <Avatar
              size={32}
              src="https://i.pravatar.cc/150?img=47"
              alt="User"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Lê Thị Ngọc Linh</span>
              <span className="text-xs text-gray-500">Admin</span>
            </div>
            <DownOutlined className="text-xs" />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
