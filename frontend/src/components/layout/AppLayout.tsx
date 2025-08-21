import { Layout, Menu, Input, Button, Avatar } from "antd";
import {
  FileTextOutlined,
  DashboardOutlined,
  SettingOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react"; 
import type { TabType } from "../../types/types";
import {Tables} from "../index"

const { Header, Content, Sider } = Layout;

function AppLayout() {

  const [selectedTab, setSelectedTab] = useState<TabType>()
  const menuItems = [
            {
              key: "documents",
              icon: <FileTextOutlined />,
              label: "DOCUMENTS",
              children: [
                { key: "LoanDocuments", label: "Loan Documents" },
                { key: "SideLetters", label: "Side Letters" },
                { key: "LPA", label: "LPA" },
                { key: "ValuationMemo", label: "Valuation Memo" },
              ],
            },
            {
              key: "workflow",
              icon: <DashboardOutlined />,
              label: "WORKFLOW",
              children: [
                { key: "StatusDashboard", label: "Status Dashboard" },
                { key: "GridNegotiation", label: "Grid Negotiation" },
              ],
            },
            {
              key: "admin",
              icon: <SettingOutlined />,
              label: "ADMIN TOOLS",
              children: [{ key: "ClientManagement", label: "Client Management" }],
            },
          ];

  return (
    <Layout hasSider className="min-h-screen">
      {/* Sidebar */}
      <Sider width={220} theme="light" className="h-screen sticky top-0 overflow-auto">
        <div className="p-4 text-lg font-bold">
          <img src="/logo.png" alt="logo" className="h-8 mb-5" />
        </div>

        <Menu
          mode="inline"
          defaultOpenKeys={["documents", "workflow", "admin"]}
          className="border-r-0"
          onClick={({key}) => setSelectedTab(key as TabType)}
          items={menuItems} // ✅ new API
        />
      </Sider>

      {/* Main Area */}
      <Layout>
        {/* Header */}
        <Header className="bg-white px-6 flex justify-between items-center shadow-md">
          {/* Search bar */}
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search..."
            className="w-96"
          />

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button type="primary">Alpha AI</Button>
            <Button>Ref Data</Button>
            <Avatar icon={<UserOutlined />} />
          </div>
        </Header>

        {/* Page Content */}
        <Content className="m-6 p-6 bg-white rounded-lg shadow-sm">
          {selectedTab ? (
            <Tables tabName={selectedTab} /> // 👈 Render tables based on selected tab
          ) : (
            <p className="text-gray-500">Please select a tab from the sidebar</p>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
