import { Button, Layout } from "antd";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";

import CustomImage from "../components/CustomImage";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import MenuSider from "./MenuSider";
import { useState } from "react";

const { Sider } = Layout;

const SiderPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className={collapsed ? "" : "custom-ant-layout-sider"}
    >
      <div
        className={`flex items-center ${
          collapsed ? "flex-col space-y-3" : "flex-row justify-between"
        } py-4 px-4`}
      >
        <Link
          to="/"
          className={`flex items-center ${
            collapsed ? "flex flex-col space-y-3" : "space-x-2"
          }`}
        >
          <CustomImage src={Logo} />
          {!collapsed && (
            <p className="text-white text-lg font-bold text-center">Log System</p>
          )}
        </Link>
        <Button
          type="text"
          icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            color: "white",
          }}
        />
      </div>
      <MenuSider />
    </Sider>
  );
};

export default SiderPage;
