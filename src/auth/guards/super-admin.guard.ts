import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { SystemRole } from '../../users/types/user.type.js';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.roles.includes(SystemRole.SuperAdmin)) {
      throw new UnauthorizedException("You don't have the power");
    }
    return true;
  }
}
