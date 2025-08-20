import {Injectable} from "@nestjs/common"
import { entitlementDTO } from "src/dto/dto";
import { UserRepository, EntitlementRepository } from "src/repository";

@Injectable()
export class UserService{
    constructor(private readonly userRepo : UserRepository, private readonly entitlementRepo: EntitlementRepository){}
    
    getAllUsers(){
        return this.userRepo.getAll();
    }

    updateUserEntitlement(id: string, updatedData: entitlementDTO){
        this.entitlementRepo.updateUserEntitlement(id, updatedData);
        return "User Entitlement updated successfully!"
    }
}