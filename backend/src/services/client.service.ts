import { Injectable } from "@nestjs/common";
import {client, entitlements} from "src/data/index"
import { entitlementDTO } from "src/dto/dto";

@Injectable()
export class ClientService{
    getAllClients(){
        return client;       
    }

    updateClientEntitlement(id: string, updatedData: entitlementDTO){
        entitlements.push(updatedData);
        return "Client Entitlement updated successfully!"
    }
}  