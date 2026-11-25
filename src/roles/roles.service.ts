import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dtos/create-role.dto.js';
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
}
