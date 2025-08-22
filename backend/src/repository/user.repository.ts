import { Injectable, Inject, InternalServerErrorException, NotFoundException } from "@nestjs/common";
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
      console.error(`[UserRepository] Failed to fetch all users from ${this.tableName}:`, err);
      throw new InternalServerErrorException("Unable to fetch users");
    }
  }

  async getUserById(userId: string): Promise<userDTO> {
    try {
      const res = await this.ddbDocClient.send(
        new GetCommand({
          TableName: this.tableName,
          Key: { userId },
        })
      );

      if (!res.Item) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }

      return res.Item as userDTO;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      console.error(`[UserRepository] Failed to fetch user ${userId} from ${this.tableName}:`, err);
      throw new InternalServerErrorException("Unable to fetch user");
    }
  }
}
