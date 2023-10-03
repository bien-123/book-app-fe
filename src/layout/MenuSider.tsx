import {
    CustomerServiceOutlined,
    ExclamationCircleFilled,
    HomeOutlined,
    ProfileOutlined,
    SettingOutlined,
  } from "@ant-design/icons";
  import { Link, useLocation } from "react-router-dom";
  import { Menu, MenuProps } from "antd";
  
  import { useMemo } from "react";
  
  type MenuItem = Required<MenuProps>["items"][number];
  
  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  };
  
  const items: MenuItem[] = [
    getItem(
      <Link to="/">Quản Lý Sách</Link>,
      "1",
      <HomeOutlined className="text-lg" />
    ),
    getItem(
      <Link to="/author">Tác giả</Link>,
      "2",
      <CustomerServiceOutlined />
    ),
    getItem(<Link to="/">Vi phạm</Link>, "3", <ExclamationCircleFilled />),
    getItem("Báo cáo", "sub1", <ProfileOutlined />),
    getItem("Cài đặt chung", "8", <SettingOutlined />),
  ];
  
  const MenuSider = () => {
    const location = useLocation();
  
    const selectedMenuKey = useMemo(() => {
      switch (location.pathname) {
        case "/":
          return ["1"];
        case "/logs":
          return ["2"];
        case "/break":
          return ["3"];
  
        default:
          return ["1"];
      }
    }, [location.pathname]);
  
    return (
      <Menu
        theme="dark"
        selectedKeys={selectedMenuKey}
        mode="inline"
        items={items}
      />
    );
  };
  
  export default MenuSider;
  