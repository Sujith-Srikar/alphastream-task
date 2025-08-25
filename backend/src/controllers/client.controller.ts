import {Controller,Get,Put,Param,Body,Headers,ForbiddenException,NotFoundException} from "@nestjs/common";
import { ClientService, UserService } from "src/services";
import { entitlementDTO, UserType, clientDTO } from "src/models/dto";
import {
  ApiBody,
  ApiTags,
  ApiParam,
  ApiHeader,
  ApiResponse,
  ApiExtraModels,
} from '@nestjs/swagger';

@Controller("client")
@ApiExtraModels(entitlementDTO, clientDTO)
@ApiTags('client')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly userService: UserService, 
  ) {}

  @Get()
  @ApiResponse({status: 200, description: "List of all clients",type: [clientDTO]})
  getAllClients(): Promise<clientDTO[]> {
    return this.clientService.getAllClients();
  }

  @Put(":id")
  @ApiParam({ name: 'id', type: String, description: 'User ID to update', required:true })
  @ApiHeader({
    name: 'x-requester-id',
    description: 'ID of the requested user to make changes (MUST BE A ADMIN)',
    required: true
  })
  @ApiBody({ type: entitlementDTO })
  @ApiResponse({
    status: 200,
    description: 'Updated user entitlement successfully',
    type: entitlementDTO,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: Only ADMINs can update entitlements',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
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
