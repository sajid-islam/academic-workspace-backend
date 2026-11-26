import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard.js';
import { SuperAdminGuard } from '../auth/guards/super-admin.guard.js';
import { CreateRoleDto } from './dtos/create-role.dto.js';
import { UpdateRoleDto } from './dtos/update-role.dto.js';
import { RolesService } from './roles.service.js';

@UseGuards(AuthGuard, SuperAdminGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('/create')
  createRole(@Body() roles: CreateRoleDto) {
    return this.rolesService.createRole(roles);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.rolesService.getOne(id);
  }

  @Get()
  getAll() {
    return this.rolesService.getAll();
  }

  @Patch('/update/:id')
  updateRole(@Param('id') id: string, @Body() updatedRole: UpdateRoleDto) {
    return this.rolesService.updateRole(id, updatedRole);
  }
}
