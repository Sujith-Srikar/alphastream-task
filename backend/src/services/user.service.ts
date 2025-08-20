import {Injectable} from "@nestjs/common"
import {user, entitlements} from "src/data/index"
import { entitlementDTO } from "src/dto/dto";

@Injectable()
export class UserService{
    getAllUsers(){
        return user;
    }

    updateUserEntitlement(id: string, updatedData: entitlementDTO){
        entitlements.push(updatedData);
        return "User Entitlement updated successfully!"
    }
}