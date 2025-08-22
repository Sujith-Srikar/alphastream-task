import { client } from 'src/data';
import { Injectable, Inject } from "@nestjs/common";
import { clientDTO } from "src/models/dto";
import { DYNAMO_PROVIDER } from "src/providers/dynamo.provider";
import { ScanCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

@Injectable()
export class ClientRepository {
  private readonly tableName = "Clients";

  constructor(
    @Inject(DYNAMO_PROVIDER)
    private readonly ddbDocClient: DynamoDBDocumentClient
  ) {}

  async getAll(): Promise<clientDTO[]> {
    try {
      const res = await this.ddbDocClient.send(
        new ScanCommand({ TableName: this.tableName })
      );
      return (res.Items as clientDTO[]) ?? [];
    } catch (err) {
      console.error("Failed to fetch all clients:", err);
      throw err;
    }
  }

  async getClientById(clientId: string): Promise<clientDTO | undefined> {
    try {
      const res = await this.ddbDocClient.send(
        new GetCommand({
          TableName: this.tableName,
          Key: { clientId },
        })
      );
      return res.Item as clientDTO | undefined;
    } catch (err) {
      console.error(`Failed to fetch client with id ${clientId}:`, err);
      throw err;
    }
  }
}
