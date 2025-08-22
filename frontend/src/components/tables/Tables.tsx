import { useState, useEffect } from "react";
import { useEntitlement } from "../../context/EntitlementContext";
import NotAllowed from "./NotAllowed";
import { type TablesProps } from "../../types/types";
import { Table, Card, Select, Tag, DatePicker } from "antd";
import applyEntitlementFilters from "../../utils/EntitlementFilter";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

function Tables({ tabName }: TablesProps) {
  const { entitlements } = useEntitlement();
  const tabEntitlement = entitlements?.tabs?.[tabName];

  const [filters, setFilters] = useState<Record<string, any>>(
    tabEntitlement?.filters || {}
  );

  useEffect(() => {
    setFilters(tabEntitlement?.filters || {});
  }, [tabName, tabEntitlement]);

  if (!tabEntitlement) return <NotAllowed />;

  const columns = tabEntitlement.columns.map((col) => ({
    title: col,
    dataIndex: col,
    key: col,
  }));

  const dummyData: any[] = [];

  const filteredData = applyEntitlementFilters(dummyData, filters);

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{tabName}</h2>

      {tabEntitlement.filters && (
        <Card title="Filters" size="small">
          <div className="flex flex-wrap items-center gap-4">
            {Object.entries(filters).map(([key, value]) => {
              if (Array.isArray(value)) {
                return (
                  <div key={key} className="flex items-center gap-2">
                    <span className="font-semibold">{key}:</span>
                    <Select
                      mode="multiple"
                      style={{ minWidth: 200 }}
                      value={value}
                      onChange={(val) => handleFilterChange(key, val)}
                      options={value.map((v) => ({ label: v, value: v }))}
                    />
                  </div>
                );
              } else if (
                typeof value === "object" &&
                value !== null &&
                "From" in value &&
                "To" in value
              ) {
                return (
                  <div key={key} className="flex items-center gap-2">
                    <span className="font-semibold">{key}:</span>
                    <RangePicker
                      value={[
                        value.From ? dayjs(value.From) : null,
                        value.To ? dayjs(value.To) : null,
                      ]}
                      onChange={(dates) =>
                        handleFilterChange(key, {
                          From: dates?.[0]?.toISOString() || null,
                          To: dates?.[1]?.toISOString() || null,
                        })
                      }
                    />
                  </div>
                );
              } else {
                return (
                  <Tag key={key} color="blue">
                    {key}: {String(value)}
                  </Tag>
                );
              }
            })}
          </div>
        </Card>
      )}

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
}

export default Tables;
