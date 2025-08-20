import { Injectable } from "@nestjs/common"
import {client} from "src/data"
import { clientDTO } from "src/dto/dto"

@Injectable()
export class ClientRepository{
    private client = client;

    getAll() : clientDTO[]{
        return this.client
    }

    getClientById(id: string) : clientDTO | undefined {
        return this.client.find(c => c.clientId == id)
    }
}