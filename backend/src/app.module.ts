import { Module } from '@nestjs/common';
import { UserController, ClientController, EntitlementController } from './controllers/index';
import { UserService, ClientService, EntitlementService } from './services/index';
import { UserRepository, ClientRepository, EntitlementRepository } from './repository';
import { DynamoProvider } from './providers/dynamo.provider';

@Module({
  imports: [],
  controllers: [UserController, ClientController, EntitlementController],
  providers: [ UserService, ClientService, EntitlementService, ClientRepository, UserRepository, EntitlementRepository, DynamoProvider],
  exports: [DynamoProvider],
})

export class AppModule {}