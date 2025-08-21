import { Space, Table, Tag, Card } from "antd";
import { useUsers } from "../api/user";
import type { TableProps } from "antd";
import { type User } from "../types/types";
import { Link } from "react-router";
import ActionButton from "../components/common/ActionButton";

const userColumns: TableProps<User>["columns"] = [
  {
    title: "User ID",
    dataIndex: "userId",
    key: "userId",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: string) => (
      <span className="font-medium text-blue-600 hover:underline">{text}</span>
    ),
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (type: User["type"]) => (
      <Tag
        color={type === "ADMIN" ? "geekblue" : "green"}
        className="px-2 py-1 rounded-md text-sm"
      >
        {type}
      </Tag>
    ),
  },
  {
    title: "Client ID",
    dataIndex: "clientId",
    key: "clientId",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to="/dashboard">
          <ActionButton user={record} />
        </Link>
      </Space>
    ),
  },
];

function Home() {
  const { data: users, isLoading, error } = useUsers();

  if (error) return <p className="text-red-600">Error fetching users</p>;
  if (isLoading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <Card
        className="shadow-md rounded-2xl w-4/5 bg-white"
        bodyStyle={{ padding: "1.5rem" }}
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Select a User
        </h1>
        <Table<User>
          rowKey="userId"
          columns={userColumns}
          dataSource={users}
          bordered
          className="rounded-lg"
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
}

export default Home;