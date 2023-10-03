import { Avatar, Breadcrumb, Button, Popover } from "antd";
import StorageService, {
  StorageItems,
} from "../services/core/storage-service";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

import { BellFilled } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";

const listBreadCrumbDefault = [
  {
    title: "Dashboard",
  },
];

const HeaderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const localStorage = new StorageService();
  const userNameLocal = localStorage.getItem(StorageItems.USER_NAME);
  const passwordLocal = localStorage.getItem(StorageItems.PASSWORD);
  const [open, setOpen] = useState(false);

  const listBreadCrumbItems = useMemo(() => {
    switch (location.pathname) {
      case "/":
        return [
          ...listBreadCrumbDefault,
          {
            title: "Quản lý sách",
            href: "/",
          },
        ];
      case "/author":
        return [
          ...listBreadCrumbDefault,
          {
            title: "Tác giả",
            href: "/author",
          },
        ];
      case "/break":
        return [
          ...listBreadCrumbDefault,
          {
            title: "Vi phạm",
            href: "/break",
          },
        ];
      default:
        return listBreadCrumbDefault;
    }
  }, [location.pathname]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    if (userNameLocal && passwordLocal) {
      localStorage.clearItem(StorageItems.TOKEN);
    } else {
      localStorage.clearAll();
    }
    navigate("/login");
  };

  return (
    <Header className="bg-white px-5 flex items-center justify-between">
      <div>
        <Breadcrumb separator=">" items={listBreadCrumbItems} />
      </div>
      <div className="flex items-center h-full space-x-3">
        <BellFilled />
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
        <div className="flex flex-col leading-none">
          <p className="text-sm font-bold">Admin</p>
          <p>Nhân viên kiểm duyệt</p>
        </div>
        <Popover
          content={
            <Button onClick={handleLogout} className="w-full">
              Logout
            </Button>
          }
          title={
            <div className="flex flex-col">
              <p>Admin</p>
              <p className="font-normal">Nhân viên kiểm duyệt</p>
            </div>
          }
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <p className="cursor-pointer text-lg font-bold border-none p-2">
            ...
          </p>
        </Popover>
      </div>
    </Header>
  );
};

export default HeaderPage;
