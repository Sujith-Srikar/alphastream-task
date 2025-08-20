import { Injectable } from "@nestjs/common";
import {user, defaultEntitlement, entitlements} from "src/data/index"

@Injectable()
export class EntitlementService{

    getEffectiveEntitlements(userId: string){
        const clientID = user.find(u => u.userId == userId)?.clientId;

        if(!clientID)
            return "There is no user with the corresponding UserID"

        const userDefaultEntitlement = defaultEntitlement.userDefault;
        const clientDefaultEntitlement = defaultEntitlement.clientDefault;
        const modifiedUserEntitlement = entitlements.find(e => e.scopeId == userId)
        const modifiedClientEntitlement = entitlements.find(e => e.scopeId == clientID)

        let res : any = {
            "userId": userId,
            "clientId": clientID,
            "tabs": {}
        }

        for(const docType of Object.keys(clientDefaultEntitlement)){
            res.tabs[docType] = this.mergeEntitlement(
                clientDefaultEntitlement[docType],
                modifiedClientEntitlement?.[docType],
                userDefaultEntitlement[docType],
                modifiedUserEntitlement?.[docType]
            )
        }

        return res;
    }

    private mergeEntitlement(clientDefault: any, modifiedClientEntitlement: any, userDefault: any, modifiedUserEntitlement: any){
        let res= {...clientDefault};

        if(modifiedClientEntitlement){
            res = {
                columns: modifiedClientEntitlement.columns ?? res.columns,
                filters: {...res.filters, ...modifiedClientEntitlement.filters}
            }
        }

        if(userDefault){
            res = {
                columns: userDefault.columns ?? res.columns,
                filters: {...res.filters, ...userDefault.filters}
            }
        }

        if(modifiedUserEntitlement){
            res = {
                columns: modifiedUserEntitlement.columns ?? res.columns,
                filters: {...res.filters, ...modifiedUserEntitlement.filters}
            }
        }

        return res;
    }
}