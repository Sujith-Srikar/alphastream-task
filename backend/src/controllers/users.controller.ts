import {Controller, Get, Param, Put, Body, ForbiddenException, Headers, NotFoundException} from "@nestjs/common"
import { UserService } from "src/services/user.service"
import { entitlementDTO , UserType} from "src/models/dto";

@Controller('user')
export class UserController{
    constructor(private readonly userservice : UserService){}

    @Get()
    getAllUsers(){
        return this.userservice.getAllUsers();
    }

    @Put(':id')
    async updateUserEntitlement(@Param('id') id: string, @Body() updatedData: entitlementDTO, @Headers('x-requester-id') requestedId: string,){
        const requester = await this.userservice.getUserById(requestedId);

        if (requester.type !== UserType.ADMIN) throw new ForbiddenException("Only ADMINs can update entitlements");

        return this.userservice.updateUserEntitlement(id, updatedData);
    }
}