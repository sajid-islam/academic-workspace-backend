import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dtos/create-role.dto.js';
import { UpdateRoleDto } from './dtos/update-role.dto.js';
import { Role } from './schemas/role.schema.js';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  async createRole(roles: CreateRoleDto) {
    try {
      const result = await this.roleModel.create(roles);
      return { message: `${result.name} role created successfully` };
    } catch (error) {
      const err = error as { code: number; keyPattern: any; keyValue: any };
      const MONGODB_DUPLICATE_KEY_ERROR_CODE = 11000;

      if (
        err.code === MONGODB_DUPLICATE_KEY_ERROR_CODE &&
        err.keyPattern.name
      ) {
        throw new ConflictException(
          `role '${err.keyValue.name}' already available `,
        );
      }
      throw error;
    }
  }

  async updateRole(id: string, updatedRole: UpdateRoleDto) {
    try {
      const role = await this.roleModel.findById(id);

      if (!role) {
        throw new NotFoundException('Role not found');
      }

      if (role.is_system) {
        throw new BadRequestException("System role can't be modified");
      }

      if (updatedRole.name !== undefined) {
        role.name = updatedRole.name;
      }

      if (updatedRole.permissions !== undefined) {
        role.permissions = updatedRole.permissions;
      }

      await role.save();
      return { message: `${role.name} role updated successfully`, role };
    } catch (error) {
      const err = error as { code: number; keyPattern: any; keyValue: any };
      const MONGODB_DUPLICATE_KEY_ERROR_CODE = 11000;

      if (
        err.code === MONGODB_DUPLICATE_KEY_ERROR_CODE &&
        err.keyPattern.name
      ) {
        throw new ConflictException(
          `role '${err.keyValue.name}' already available `,
        );
      }
      throw error;
    }
  }

  async getOne(id: string) {
    const role = await this.roleModel.findOne({ _id: id }).select('-is_system');
    if (!role) {
      throw new NotFoundException("This role don't exist");
    }

    return { role };
  }

  async getAll() {
    const roles = await this.roleModel.find();
    return { roles };
  }
}
