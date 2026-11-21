import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { type Request } from 'express';
import { AuthGuard } from '../auth/auth.guard.js';
import { UserService } from './user.service.js';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getMe(@Req() req: Request) {
    return this.userService.getMe(req.user.sub);
  }
}
