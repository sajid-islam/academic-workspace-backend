import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto.js';

export class UpdateRoleDto extends PartialType(
  OmitType(CreateRoleDto, ['is_system'] as const),
) {}
