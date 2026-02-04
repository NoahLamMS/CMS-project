import { Layout} from "antd";
// import { BellOutlined, GlobalOutlined } from "@ant-design/icons";

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header
        className="!bg-white px-6 flex justify-between items-center border border-[#f0f0f0]"
    >
        <div style={{ fontWeight: 600 }}>Hello world</div>
    </Header>
  );
};

export default AppHeader;
