import {Controller, Get, Param, Post, Body} from "@nestjs/common"
import { UserService } from "src/services/user.service"
import { entitlementDTO } from "src/dto/dto";

@Controller('user')
export class UserController{
    constructor(private readonly userservice : UserService){}

    @Get()
    getAllUsers(){
        return this.userservice.getAllUsers();
    }

    @Post(':id')
    updateUserEntitlement(@Param('id') id: string, @Body() updatedData: entitlementDTO){
        return this.userservice.updateUserEntitlement(id, updatedData);
    }
}