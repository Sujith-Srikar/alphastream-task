import { Injectable, NotFoundException,BadRequestException } from "@nestjs/common";
import { UserRepository, EntitlementRepository } from "src/repository";
import { TabEntitlement, EffectiveEntitlementDTO } from "src/models/dto";

@Injectable()
export class EntitlementService{
    constructor(private readonly userRepo: UserRepository, private readonly entitlementRepo: EntitlementRepository){}

    async getEffectiveEntitlements(userId: string) : Promise<EffectiveEntitlementDTO>{
        const user = await this.userRepo.getUserById(userId);
        if (!user) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }
        
        const clientId = user?.clientId;
        if (!clientId) {
            console.log("Error")
            throw new BadRequestException(`User ${userId} does not belong to a client`);
        }

        console.log("hello1")
        const userDefaultEntitlement = await this.entitlementRepo.getUserDefaultEntitlement();
        console.log("hello2")
        const clientDefaultEntitlement = await  this.entitlementRepo.getClientDefaultEntitlement();
        console.log("hello3")
        const modifiedUserEntitlement = await this.entitlementRepo.getUserUpdatedEntitlement(userId);
        console.log(clientId)
        const modifiedClientEntitlement = await this.entitlementRepo.getClientUpdatedEntitlement(clientId);

        let res : any = {
            "userId": userId,
            "clientId": clientId,
            "tabs": {}
        }

        const allTabs = new Set([
            ...Object.keys(clientDefaultEntitlement.tabs ?? {}),
            ...Object.keys(userDefaultEntitlement.tabs ?? {}),
            ...Object.keys(modifiedClientEntitlement?.tabs ?? {}),
            ...Object.keys(modifiedUserEntitlement?.tabs ?? {}),
        ]);

        for(const docType of allTabs){
            res.tabs[docType] = this.mergeEntitlement(
                clientDefaultEntitlement.tabs[docType],
                modifiedClientEntitlement?.tabs?.[docType],
                userDefaultEntitlement.tabs[docType],
                modifiedUserEntitlement?.tabs?.[docType]
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