// src/layouts/MainLayout.tsx
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppSideBar from "../components/AppSideBar";
import AppHeader from "../components/AppHeader";

const { Content } = Layout;

const MainLayout = () => {  
  return (
    <Layout style={{ minHeight: "100vh" }}>
        <AppSideBar />

        <Layout>
            <AppHeader />

            <Content
                style={{
                    padding: 24,
                    background: "#e6f4ff",
                    overflow: "auto",
                }}
            >
                <Outlet />
            </Content>
        </Layout>
    </Layout>
  );
};

export default MainLayout;
