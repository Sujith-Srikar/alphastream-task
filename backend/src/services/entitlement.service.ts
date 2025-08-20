import { Injectable } from "@nestjs/common";
import { UserRepository, EntitlementRepository } from "src/repository";

@Injectable()
export class EntitlementService{
    constructor(private readonly userRepo: UserRepository, private readonly entitlementRepo: EntitlementRepository){}

    getEffectiveEntitlements(userId: string){
        const clientId = this.userRepo.getUserById(userId)?.clientId;

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