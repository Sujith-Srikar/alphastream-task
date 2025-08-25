import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  ForbiddenException,
  Headers,
} from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { entitlementDTO, UserType, userDTO } from 'src/models/dto';
import {
  ApiBody,
  ApiTags,
  ApiParam,
  ApiHeader,
  ApiResponse,
  ApiExtraModels,
} from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
@ApiExtraModels(entitlementDTO, userDTO)
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @Get()
  @ApiResponse({ status: 200, description: "List of all users", type: [userDTO] })
  getAllUsers(): Promise<userDTO[]> {
    return this.userservice.getAllUsers();
  }

  @Put(':id')
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
  async updateUserEntitlement(
    @Param('id') id: string,
    @Body() updatedData: entitlementDTO,
    @Headers('x-requester-id') requestedId: string,
  ) {
    const requester = await this.userservice.getUserById(requestedId);

    if (requester.type !== UserType.ADMIN)
      throw new ForbiddenException('Only ADMINs can update entitlements');

    return this.userservice.updateUserEntitlement(id, updatedData);
  }
}
