import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from '../user/dto/create-user.dto.js';
import { User } from '../user/schemas/user.schema.js';
import { UserService } from '../user/user.service.js';
import { LoginUserDto } from './dto/login-user.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Login service
  async loginUser(loginUserDto: LoginUserDto) {
    const email = loginUserDto.email;
    const password = loginUserDto.password;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashPassword = user.password;

    const isPasswordCorrect = await bcrypt.compare(password, hashPassword);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Password not correct, try again');
    }

    const payload = { sub: user._id, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }

  // Register Service
  async registerUser(createUserDto: CreateUserDto) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    const user = await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    return { message: 'User registered successfully!', id: user._id };
  }
}
