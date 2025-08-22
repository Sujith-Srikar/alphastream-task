import { useEntitlement } from "../../context/EntitlementContext";
import NotAllowed from "./NotAllowed";
import { type TabType } from "../../types/types";
import { Table, Tag, Card } from "antd";

type TablesProps = {
  tabName: TabType;
};

function Tables({ tabName }: TablesProps) {
  const { entitlements } = useEntitlement();

  const tabEntitlement = entitlements?.tabs?.[tabName];

  if (!tabEntitlement) {
    return <NotAllowed />;
  }

  const columns = tabEntitlement.columns.map((col) => ({
    title: col,
    dataIndex: col,
    key: col,
  }));

  const dummyData:any = [];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{tabName}</h2>

      {tabEntitlement.filters && (
        <Card title="Filters" size="small">
          <div className="flex flex-wrap gap-2">
            {Object.entries(tabEntitlement.filters).map(([key, value]) => {
              let displayValue: string;

              if (Array.isArray(value)) {
                displayValue = value.join(", ");
              } else if (typeof value === "object" && value !== null) {
                const val: any = value; 
                if ("From" in val && "To" in val) {
                  displayValue = `From: ${val.From} To: ${val.To}`;
                } else {
                  displayValue = JSON.stringify(val);
                }
              } else {
                displayValue = String(value);
              }
              return (<Tag key={key} color="blue">
                {key}: {displayValue}
              </Tag>)
            })}
          </div>
        </Card>
      )}

      <Table
        columns={columns}
        dataSource={dummyData}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
}

export default Tables;
