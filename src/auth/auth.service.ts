import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from '../user/dto/login-user.dto.js';
import { User } from '../user/schemas/user.schema.js';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async loginUser(loginUserDto: LoginUserDto) {
    console.log('Database:', this.userModel.db.name);
    console.log('Collection:', this.userModel.collection.name);
    console.log('Searching email:', loginUserDto.email);
    const user = await this.userModel.findOne({ email: loginUserDto.email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { user };
  }
}
