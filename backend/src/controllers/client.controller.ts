import {Controller,Get,Put,Param,Body,Headers,ForbiddenException,NotFoundException} from "@nestjs/common";
import { ClientService, UserService } from "src/services";
import { entitlementDTO, UserType } from "src/models/dto";

@Controller("client")
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly userService: UserService, 
  ) {}

  @Get()
  getAllClients() {
    return this.clientService.getAllClients();
  }

  @Put(":id")
  async updateClientEntitlement(
    @Param("id") id: string,
    @Body() updatedData: entitlementDTO,
    @Headers("x-requester-id") requesterId: string,
  ) {
    const requester = await this.userService.getUserById(requesterId);
    if (!requester) {
      throw new NotFoundException("Requester not found");
    }

    if (requester.type !== UserType.ADMIN) {
      throw new ForbiddenException("Only ADMINs can update client entitlements");
    }

    return this.clientService.updateClientEntitlement(id, updatedData);
  }
}
