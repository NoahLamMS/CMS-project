// src/components/AppSideBar.tsx
import { Layout, Menu, Button } from "antd";
import {
  AppstoreOutlined,
  LeftOutlined,
  RightOutlined,
  ShoppingOutlined,
  InboxOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  BulbOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { appImages } from "../constants/app-info";

const { Sider } = Layout;

const AppSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sider
      width={240}
      collapsedWidth={80}
      collapsed={collapsed}
      theme="light"
    >
      <div
        className="flex items-center justify-center py-5"
      >
        <img src={appImages.logo} alt="logo" width={54.05} height={54.5} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{ flex: 1 }}
          onClick={(e) => navigate(e.key)}
          items={[
            {
              key: "/dashboard",
              icon: <AppstoreOutlined />,
              label: "Tổng quan",
            },
            {
              key: "/products",
              icon: <ShoppingOutlined />,
              label: "Quản lý sản phẩm",
            },
            {
              key: "/warehouse",
              icon: <InboxOutlined />,
              label: "Quản lý kho",
            },
            {
              key: "/collaborators",
              icon: <TeamOutlined />,
              label: "Quản lý cộng tác viên",
            },
            {
              key: "/orders",
              icon: <ShoppingCartOutlined />,
              label: "Xử lý đơn hàng",
            },
            {
              key: "/marketing",
              icon: <BulbOutlined />,
              label: "Tiếp thị & Khuyến mãi",
            },
            {
              key: "/messages",
              icon: <MessageOutlined />,
              label: "Tin nhắn",
            },
          ]}
        />
      </div>

      <div
        className="h-12 flex items-center justify-center"
      >
        <Button
          type="text"
          icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="w-8 h-8 !border !border-[#DEE4ED] rounded-[6px] mb-5"
        />
      </div>
    </Sider>
  );
};

export default AppSideBar;
