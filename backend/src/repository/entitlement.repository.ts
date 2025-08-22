import { Injectable, Inject } from "@nestjs/common";
import { entitlementDTO, EntitlementScope } from "src/models/dto";
import { DYNAMO_PROVIDER } from "src/providers/dynamo.provider";
import { DynamoDBDocumentClient, QueryCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

@Injectable()
export class EntitlementRepository {
  private readonly tableName = "Entitlements";

  constructor(
    @Inject(DYNAMO_PROVIDER)
    private readonly ddbDocClient: DynamoDBDocumentClient
  ) {}

  getUserDefaultEntitlement(): Promise<entitlementDTO[]> {
    return this.fetchByScope("USERDEFAULT");
  }

  getClientDefaultEntitlement(): Promise<entitlementDTO[]> {
    return this.fetchByScope("CLIENTDEFAULT");
  }

  getUserUpdatedEntitlement(userId: string): Promise<entitlementDTO[]> {
    return this.fetchByScope(`USER#${userId}`);
  }

  getClientUpdatedEntitlement(clientId: string): Promise<entitlementDTO[]> {
    return this.fetchByScope(`CLIENT#${clientId}`);
  }

  private async fetchByScope(scopeKey: string): Promise<entitlementDTO[]> {
    const res = await this.ddbDocClient.send(
      new QueryCommand({
        TableName: this.tableName,
        KeyConditionExpression: "scopeKey = :s",
        ExpressionAttributeValues: { ":s": scopeKey },
      })
    );

    let scope: EntitlementScope;
    let scopeId: string;

    if (scopeKey.startsWith("USER#")) {
      scope = EntitlementScope.USER;
      scopeId = scopeKey.split("#")[1];
    } else if (scopeKey.startsWith("CLIENT#")) {
      scope = EntitlementScope.CLIENT;
      scopeId = scopeKey.split("#")[1];
    } else if (scopeKey === "USERDEFAULT") {
      scope = EntitlementScope.USER;
      scopeId = "DEFAULT";
    } else {
      scope = EntitlementScope.CLIENT;
      scopeId = "DEFAULT";
    }

    return (
      res.Items?.map(
        (item) =>
          ({
            scope,
            scopeId,
            tab: item.tabKey,
            columns: item.columns,
            filters: item.filters ?? {},
          } as entitlementDTO)
      ) ?? []
    );
  }

  async updateUserEntitlement(userId: string, updatedData: entitlementDTO) {
    // TODO: implement with DynamoDB PutCommand
    try {
      const item = {
        scopeKey: `CLIENT#${userId}`,
        tabKey: updatedData.tab,
        ...updatedData

      }
      console.log(`Update entitlement for USER#${userId}`, updatedData);
    } catch (error) {
      
    }
    
  }

  async updateClientEntitlement(clientId: string, updatedData: entitlementDTO) {
    // TODO: implement with DynamoDB PutCommand
    console.log(`Update entitlement for CLIENT#${clientId}`, updatedData);
  }
}
