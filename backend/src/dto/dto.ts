import {IsArray, IsEnum, IsNotEmpty, IsObject, IsString} from "class-validator"

export class userDTO{
    @IsString()
    userId: string;

    @IsString()
    name: string

    @IsEnum(["NORMAL", "ADMIN"])
    type: "NORMAL" | "ADMIN"

    @IsString()
    clientId: string;
}

export class elientDTO{

    @IsString()
    clientId: string

    @IsString()
    name: string;
}

export enum TabType{
  LoanDocuments = 'LoanDocuments',
  SideLetters = 'SideLetters',
  LPA = 'LPA',
  ValuationMemo = 'ValuationMemo',
}

export class entitlementDTO{

    @IsEnum(["USER", "CLIENT"])
    scope: "USER" | "CLIENT"

    @IsNotEmpty()
    scopeId: string;

    @IsEnum(TabType)
    tab: TabType

    @IsArray()
    @IsString({each: true})
    columns: string[];

    @IsObject()
    filters: Record<string, any>
}