import { Injectable, Inject } from "@nestjs/common";
import { userDTO } from "src/models/dto";
import { DYNAMO_PROVIDER } from "src/providers/dynamo.provider";
import { ScanCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

@Injectable()
export class UserRepository {
  private readonly tableName = "Users";

  constructor(
    @Inject(DYNAMO_PROVIDER)
    private readonly ddbDocClient: DynamoDBDocumentClient
  ) {}

  async getAll(): Promise<userDTO[]> {
    try {
      const res = await this.ddbDocClient.send(
        new ScanCommand({ TableName: this.tableName })
      );
      return (res.Items as userDTO[]) ?? [];
    } catch (err) {
      console.error("Failed to fetch all users:", err);
      throw err;
    }
  }

  async getUserById(userId: string): Promise<userDTO | undefined> {
    try {
      const res = await this.ddbDocClient.send(
        new GetCommand({
          TableName: this.tableName,
          Key: { userId },
        })
      );
      return res.Item as userDTO | undefined;
    } catch (err) {
      console.error(`Failed to fetch user with id ${userId}:`, err);
      throw err;
    }
  }
}
