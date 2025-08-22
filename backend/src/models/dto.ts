import { IsEnum, IsNotEmpty, IsObject, IsString, ValidateNested} from "class-validator"
import { Type } from "class-transformer";

export enum UserType {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
}


export class userDTO{
    @IsString()
    userId: string;

    @IsString()
    name: string;

    @IsEnum(UserType)
    type: UserType;

    @IsString()
    clientId: string;
}

export class clientDTO{

    @IsString()
    clientId: string;

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
  @IsString({ each: true })
  columns: string[];

  @IsObject()
  filters: Record<string, any>;
}

export class entitlementDTO {
  @IsEnum(EntitlementScope)
  scope: EntitlementScope;

  @IsNotEmpty()
  scopeId: string;

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
