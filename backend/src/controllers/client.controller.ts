import { Controller, Get } from "@nestjs/common";
import { ClientService } from "src/services/client.service";

@Controller('client')
export class ClientController{
    constructor(private readonly clientservice : ClientService){}

    @Get()
    getAllClients(){
        return this.clientservice.getAllClients();
    }
}