import { Controller, Get, Param } from "@nestjs/common";
import { EntitlementService } from "src/services/entitlement.service";

@Controller('/entitlement')
export class EntitlementController{
    constructor(private readonly entitlementservice: EntitlementService){}

    @Get(':id')
    getEffectiveEntitlements(@Param('id') id: string){
        return this.entitlementservice.getEffectiveEntitlements(id);
    }
}