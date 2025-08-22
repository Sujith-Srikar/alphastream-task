import {Injectable,NotFoundException, InternalServerErrorException} from "@nestjs/common"
import { entitlementDTO } from "src/models/dto";
import { UserRepository, EntitlementRepository } from "src/repository";

@Injectable()
export class UserService{
    constructor(private readonly userRepo : UserRepository, private readonly entitlementRepo: EntitlementRepository){}
    
    getAllUsers(){
        return this.userRepo.getAll();
    }

    async getUserById(userId: string){
        return this.userRepo.getUserById(userId);
    }

    async updateUserEntitlement(id: string, updatedData: entitlementDTO){
        try {
            const result = await this.entitlementRepo.updateUserEntitlement(id, updatedData);

            if (!result) {
                throw new NotFoundException(`User with ID ${id} not found for entitlement update`);
            }

            return {
                message: "User Entitlement updated successfully!",
            };
        } catch (error) {
            console.log(`Error while updating user Entitlement`, error)
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to update user entitlement");
        }
    }
}