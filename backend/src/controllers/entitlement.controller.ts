import { Controller, Get, Param } from '@nestjs/common';
import { EntitlementService } from 'src/services/entitlement.service';
import { ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { EffectiveEntitlementDTO } from 'src/models/dto';

@Controller('/entitlement')
@ApiTags('entitlement')
export class EntitlementController {
  constructor(private readonly entitlementservice: EntitlementService) {}

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'unquie id of the user to fetch effective entitlements',
    type: String,
    example: 'user1',
  })
  @ApiResponse({
    status: 404,
    description: "User not found"
  })
  async getEffectiveEntitlements(
    @Param('id') id: string,
  ): Promise<EffectiveEntitlementDTO> {
    return this.entitlementservice.getEffectiveEntitlements(id);
  }
}
