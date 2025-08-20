import { Module } from '@nestjs/common';
import { UserController, ClientController, EntitlementController } from './controllers/index';
import { UserService, ClientService, EntitlementService } from './services/index';
import { UserRepository, ClientRepository, EntitlementRepository } from './repository';

@Module({
  imports: [],
  controllers: [UserController, ClientController, EntitlementController],
  providers: [ UserService, ClientService, EntitlementService, ClientRepository, UserRepository, EntitlementRepository],
})

export class AppModule {}