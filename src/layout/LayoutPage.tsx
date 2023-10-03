import { Content } from "antd/es/layout/layout";
import HeaderPage from "./HeaderPage";
import { Layout } from "antd";
import { ReactElement } from "react";
import SiderPage from "./SiderPage";

type LayoutPageProps = {
  children: ReactElement;
};

const LayoutPage = ({ children }: LayoutPageProps) => {
  return (
    <Layout>
      <SiderPage />
      <Layout>
        <HeaderPage />
        <Content
          style={{
            padding: 24,
            backgroundColor: "#F5F7FF",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
