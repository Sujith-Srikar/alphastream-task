import { CreateTableCommand } from "@aws-sdk/client-dynamodb";

export const schemas = [
  new CreateTableCommand({
    TableName: "Users",
    KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "userId", AttributeType: "S" }],
    BillingMode: "PAY_PER_REQUEST",
  }),

  new CreateTableCommand({
    TableName: "Clients",
    KeySchema: [{ AttributeName: "clientId", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "clientId", AttributeType: "S" }],
    BillingMode: "PAY_PER_REQUEST",
  }),

  new CreateTableCommand({
    TableName: "Entitlements",
    KeySchema: [  
      { AttributeName: "scopeKey", KeyType: "HASH" }, 
      { AttributeName: "tabKey", KeyType: "RANGE" }, 
    ],
    AttributeDefinitions: [
      { AttributeName: "scopeKey", AttributeType: "S" },
      { AttributeName: "tabKey", AttributeType: "S" },
    ],
    BillingMode: "PAY_PER_REQUEST",
  }),
];
