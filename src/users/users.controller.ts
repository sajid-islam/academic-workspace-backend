import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { type Request } from 'express';
import { AuthGuard } from '../auth/guards/auth.guard.js';
import { UsersService } from './users.service.js';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@Req() req: Request) {
    return this.usersService.getMe(req.user.sub);
  }
}
