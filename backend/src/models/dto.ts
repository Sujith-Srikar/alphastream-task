import { IsEnum, IsNotEmpty, IsObject, IsString, ValidateNested} from "class-validator"
import { Type } from "class-transformer";
import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";

export enum UserType {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
}


export class userDTO {
  @ApiProperty({ example: "user1", description: "Unique user ID" })
  @IsString()
  userId: string;

  @ApiProperty({ example: "Alice", description: "Full name of the user" })
  @IsString()
  name: string;

  @ApiProperty({ enum: UserType, example: UserType.NORMAL, description: "Type of the user" })
  @IsEnum(UserType)
  type: UserType;

  @ApiProperty({ example: "client3", description: "Client ID this user belongs to" })
  @IsString()
  clientId: string;
}

export class clientDTO{
    @ApiProperty({ example: "client1", description: "Unique client ID" })
    @IsString()
    clientId: string;

    @ApiProperty({example: "Global Ventures", description: "Name of the client"})
    @IsString()
    name: string;
}

export enum TabType{
  LoanDocuments = 'LoanDocuments',
  SideLetters = 'SideLetters',
  LPA = 'LPA',
  ValuationMemo = 'ValuationMemo',
}

export enum EntitlementScope {
  USER = "USER",
  CLIENT = "CLIENT",
}

export interface TabEntitlement {
  columns: string[];
  filters: Record<string, string>;
}


export class TabEntitlementDTO {
  @ApiProperty({ example: ["Status", "Amount"], description: "Columns allowed for this tab" })
  @IsString({ each: true })
  columns: string[];

  @ApiProperty({
    example: { Status: ["Approved", "Pending"] },
    description: "Filter configuration for this tab",
    type: Object,
  })
  @IsObject()
  filters: Record<string, any>;
}

@ApiExtraModels(TabEntitlementDTO)
export class entitlementDTO {
  @ApiProperty({ enum: EntitlementScope, example: EntitlementScope.USER, description: "Scope of entitlement" })
  @IsEnum(EntitlementScope)
  scope: EntitlementScope;

  @ApiProperty({ example: "user1 or client3", description: "Scope ID (userId or clientId)" })
  @IsNotEmpty()
  scopeId: string;

  @ApiProperty({
    description: "Tab-level entitlements for this user or client",
    type: () => TabEntitlementDTO,
    additionalProperties: { $ref: getSchemaPath(TabEntitlementDTO) },
  })
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => TabEntitlementDTO)
  tabs: Partial<Record<TabType, TabEntitlementDTO>>;
}

export interface EffectiveEntitlementDTO {
  userId: string;
  clientId: string;
  tabs: Record<string, TabEntitlement>;
}
