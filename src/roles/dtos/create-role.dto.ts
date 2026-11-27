import { Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import {
  Action,
  Resource,
  RESOURCE_ACTIONS,
} from '../enums/permission.enum.js';

@ValidatorConstraint({ name: 'actionsMatchResource', async: false })
class ActionMatchResource implements ValidatorConstraintInterface {
  validate(actions: Action[], args: ValidationArguments): boolean {
    const { resource } = args.object as PermissionsDto;
    const allowedAction = RESOURCE_ACTIONS[resource] ?? [];

    if (!RESOURCE_ACTIONS[resource]) {
      return true;
    }
    return (
      Array.isArray(actions) &&
      actions.every((action) => allowedAction.includes(action))
    );
  }

  defaultMessage(args?: ValidationArguments): string {
    const { resource } = args?.object as PermissionsDto;
    return `${resource} allowed action : ${RESOURCE_ACTIONS[resource]}`;
  }
}

class PermissionsDto {
  @IsEnum(Resource)
  @IsNotEmpty()
  resource: Resource;

  @IsEnum(Action, { each: true })
  @ArrayUnique()
  @IsNotEmpty()
  @Validate(ActionMatchResource)
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
