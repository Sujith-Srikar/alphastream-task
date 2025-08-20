import { Module } from '@nestjs/common';
import { UserController, ClientController, EntitlementController } from './controllers/index';
import { UserService, ClientService, EntitlementService } from './services/index';

@Module({
  imports: [],
  controllers: [UserController, ClientController, EntitlementController],
  providers: [ UserService, ClientService, EntitlementService],
})
export class AppModule {}
