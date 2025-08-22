import {IsArray, IsEnum, IsNotEmpty, IsObject, IsString} from "class-validator"

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


export class entitlementDTO{

    @IsEnum(EntitlementScope)
    scope: EntitlementScope;

    @IsNotEmpty()
    scopeId: string;

    @IsEnum(TabType)
    tab: TabType;

    @IsArray()
    @IsString({each: true})
    columns: string[];

    @IsObject()
    filters: Record<string, any>
}