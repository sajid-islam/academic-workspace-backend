import { Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Action, Resource } from '../enums/permission.enum.js';

class PermissionsDto {
  @IsEnum(Resource)
  @IsNotEmpty()
  resource: Resource;

  @IsEnum(Action, { each: true })
  @ArrayUnique()
  @IsNotEmpty()
  actions: Action[];
}

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermissionsDto)
  @IsNotEmpty()
  permissions: PermissionsDto[];

  @IsBoolean()
  @IsOptional()
  is_system?: boolean;
}
