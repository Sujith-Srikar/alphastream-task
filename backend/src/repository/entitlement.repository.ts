import { Injectable, Inject, InternalServerErrorException, NotFoundException, BadRequestException, HttpException } from "@nestjs/common";
import { entitlementDTO, EntitlementScope, TabEntitlementDTO, TabType } from "src/models/dto";
import { DYNAMO_PROVIDER } from "src/providers/dynamo.provider";
import { DynamoDBDocumentClient, QueryCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { user } from "src/data";

@Injectable()
export class EntitlementRepository {
  private readonly tableName = "Entitlements";

  constructor(
    @Inject(DYNAMO_PROVIDER)
    private readonly ddbDocClient: DynamoDBDocumentClient
  ) {}

  async getUserDefaultEntitlement(): Promise<entitlementDTO> {
    return await this.fetchByScope("USERDEFAULT", EntitlementScope.USER, "DEFAULT");
  }

  async getClientDefaultEntitlement(): Promise<entitlementDTO> {
    return await this.fetchByScope("CLIENTDEFAULT", EntitlementScope.CLIENT, "DEFAULT");
  }

  async getUserUpdatedEntitlement(userId: string): Promise<entitlementDTO | undefined> {
    if (!userId) throw new BadRequestException("UserId is required");
    try {
    return await this.fetchByScope(`USER#${userId}`, EntitlementScope.USER, userId);
  } catch (err) {
    if (err instanceof NotFoundException) {
      return undefined;
    }
    throw err;
  }
  }

  async getClientUpdatedEntitlement(clientId: string): Promise<entitlementDTO | undefined> {
    if (!clientId) throw new BadRequestException("ClientId is required");
    try {
    return await this.fetchByScope(`CLIENT#${clientId}`, EntitlementScope.CLIENT, clientId);
  } catch (err) {
    if (err instanceof NotFoundException) {
      return undefined;
    }
    throw err;
  }
  }

  private async fetchByScope(
    scopeKey: string,
    scope: EntitlementScope,
    scopeId: string
  ): Promise<entitlementDTO> {
    try {
      const res = await this.ddbDocClient.send(
        new QueryCommand({
          TableName: this.tableName,
          KeyConditionExpression: "scopeKey = :s",
          ExpressionAttributeValues: { ":s": scopeKey },
        })
      );

      if (!res.Items || res.Items.length === 0) {
        throw new NotFoundException(`No entitlements found for scope: ${scopeKey}`);
      }

      const tabs: Partial<Record<TabType, TabEntitlementDTO>> = {};
      res.Items.forEach((item) => {
        tabs[item.tabKey as TabType] = {
          columns: item.columns,
          filters: item.filters ?? {},
        };
      });

      return { scope, scopeId, tabs };
    } catch (error) {
      if (error instanceof HttpException) {
      throw error;
    }
      console.error(`DynamoDB query failed for scopeKey=${scopeKey}`, error);
      throw new InternalServerErrorException("Failed to fetch entitlement data");
    }
  }

  async updateUserEntitlement(userId: string, updatedData: entitlementDTO): Promise<boolean> {
    if (!userId) throw new BadRequestException("UserId is required");
    if (!updatedData?.tabs || Object.keys(updatedData.tabs).length === 0) {
      throw new BadRequestException("Updated data must include at least one tab");
    }

    try {
      const scopeKey = `USER#${userId}`;
      for (const [tabKey, tabValue] of Object.entries(updatedData.tabs)) {
        await this.ddbDocClient.send(
          new PutCommand({
            TableName: this.tableName,
            Item: {
              scopeKey,
              tabKey,
              columns: tabValue.columns,
              filters: tabValue.filters,
            },
          })
        );
      }
      return true;
    } catch (error) {
      console.error(`Failed to update user entitlement for userId=${userId}`, error);
      throw new InternalServerErrorException("Failed to update user entitlement");
    }
  }

  async updateClientEntitlement(clientId: string, updatedData: entitlementDTO): Promise<boolean> {
    if (!clientId) throw new BadRequestException("ClientId is required");
    if (!updatedData?.tabs || Object.keys(updatedData.tabs).length === 0) {
      throw new BadRequestException("Updated data must include at least one tab");
    }

    try {
      const scopeKey = `CLIENT#${clientId}`;
      for (const [tabKey, tabValue] of Object.entries(updatedData.tabs)) {
        await this.ddbDocClient.send(
          new PutCommand({
            TableName: this.tableName,
            Item: {
              scopeKey,
              tabKey,
              columns: tabValue.columns,
              filters: tabValue.filters,
            },
          })
        );
      }
      return true;
    } catch (error) {
      console.error(`Failed to update client entitlement for clientId=${clientId}`, error);
      throw new InternalServerErrorException("Failed to update client entitlement");
    }
  }
}