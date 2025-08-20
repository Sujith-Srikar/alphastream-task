import { Injectable } from "@nestjs/common";
import { ClientRepository, EntitlementRepository } from "src/repository";
import { entitlementDTO } from "src/dto/dto";

@Injectable()
export class ClientService{
    constructor(private readonly clientRepo: ClientRepository, private readonly entitlementRepo: EntitlementRepository){}

    getAllClients(){
        return this.clientRepo.getAll();       
    }

    updateClientEntitlement(id: string, updatedData: entitlementDTO){
        this.entitlementRepo.updateClientEntitlement(id, updatedData);
        return "Client Entitlement updated successfully!"
    }
}  