import { entitlements, defaultEntitlement, user } from "src/data";
import { Injectable } from "@nestjs/common";
import { entitlementDTO } from "src/dto/dto";

@Injectable()
export class EntitlementRepository{
    getUserDefaultEntitlement(){
        return defaultEntitlement.userDefault;
    }

    getClientDefaultEntitlement(){
        return defaultEntitlement.clientDefault;
    }

    getUserUpdatedEntitlement(userId :  string) : entitlementDTO | undefined{
        return entitlements.find(e => e.scope == "USER" && e.scopeId == userId);
    }

    getClientUpdatedEntitlement(clientId :  string) : entitlementDTO | undefined{
        return entitlements.find(e => e.scope == "CLIENT" && e.scopeId == clientId)
    }

    updateUserEntitlement(userId: string, updatedData: entitlementDTO){
        entitlements.push(updatedData);
    }

    updateClientEntitlement(clientId: string, updatedData: entitlementDTO){
        entitlements.push(updatedData);
    }
}