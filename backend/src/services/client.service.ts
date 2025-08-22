import { Injectable, InternalServerErrorException, NotFoundException} from "@nestjs/common";
import { ClientRepository, EntitlementRepository } from "src/repository";
import { entitlementDTO } from "src/models/dto";

@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepo: ClientRepository,
    private readonly entitlementRepo: EntitlementRepository,
  ) {}

  getAllClients() {
    return this.clientRepo.getAll();
  }

  async getClientById(clientId: string) {
    return this.clientRepo.getClientById(clientId); 
  }

  async updateClientEntitlement(id: string, updatedData: entitlementDTO) {
    try {
      const result = await this.entitlementRepo.updateClientEntitlement(
        id,
        updatedData,
      );

      if (!result) {
        throw new NotFoundException(
          `Client with ID ${id} not found for entitlement update`,
        );
      }

      return {
        message: "Client Entitlement updated successfully!",
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(`[ClientService] Error while updating client entitlement`, error);
      throw new InternalServerErrorException(
        "Failed to update client entitlement",
      );
    }
  }
}
