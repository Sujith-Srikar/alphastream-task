import { Injectable } from "@nestjs/common";
import { UserRepository, EntitlementRepository } from "src/repository";
import { TabEntitlement } from "src/models/dto";

@Injectable()
export class EntitlementService{
    constructor(private readonly userRepo: UserRepository, private readonly entitlementRepo: EntitlementRepository){}

    async getEffectiveEntitlements(userId: string){
        const user = await this.userRepo.getUserById(userId);
        const clientId = user?.clientId;
        
        if(!clientId)
            return "There is no user with the corresponding UserID"

        const userDefaultEntitlement = this.entitlementRepo.getUserDefaultEntitlement();
        const clientDefaultEntitlement = this.entitlementRepo.getClientDefaultEntitlement();
        const modifiedUserEntitlement = this.entitlementRepo.getUserUpdatedEntitlement(userId);
        const modifiedClientEntitlement = this.entitlementRepo.getClientUpdatedEntitlement(clientId);

        let res : any = {
            "userId": userId,
            "clientId": clientId,
            "tabs": {}
        }

        const allTabs = new Set([
            ...Object.keys(clientDefaultEntitlement ?? {}),
            ...Object.keys(userDefaultEntitlement ?? {}),
            ...Object.keys(modifiedClientEntitlement ?? {}),
            ...Object.keys(modifiedUserEntitlement ?? {}),
        ]);

        for(const docType of allTabs){
            res.tabs[docType] = this.mergeEntitlement(
                clientDefaultEntitlement[docType],
                modifiedClientEntitlement?.[docType],
                userDefaultEntitlement[docType],
                modifiedUserEntitlement?.[docType]
            )
        }

        return res;
    }

    private mergeEntitlement(clientDefault: TabEntitlement, modifiedClientEntitlement: TabEntitlement, userDefault: TabEntitlement, modifiedUserEntitlement: TabEntitlement){
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