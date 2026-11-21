import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto.js';
import { User } from './schemas/user.schema.js';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser(userData: CreateUserDto) {
    try {
      return await this.userModel.create({
        name: userData.name,
        nickname: userData.nickname,
        email: userData.email,
        student_id: userData.student_id,
        roll: userData.roll,
        password: userData.password,
        user_image: userData.user_image,
      });
    } catch (error) {
      const err = error as { code: number; keyPattern: any; keyValue: any };
      const MONGODB_DUPLICATE_KEY_ERROR_CODE = 11000;

      if (
        err.code === MONGODB_DUPLICATE_KEY_ERROR_CODE &&
        err.keyPattern.email
      ) {
        throw new ConflictException(
          `${err.keyValue.email} - This email already taken`,
        );
      }

      throw error;
    }
  }

  async getMe(id: string) {
    try {
      const user = await this.userModel.findById(id).select('-password');

      if (!user) {
        throw new NotFoundException('User not found, try again');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
