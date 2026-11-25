import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesController } from './roles.controller.js';
import { RolesService } from './roles.service.js';
import { Role, RoleSchema } from './schemas/role.schema.js';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
})
export class RolesModule {}
