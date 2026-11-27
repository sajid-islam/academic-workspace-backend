import {
  IsArray,
  IsEmail,
  IsEmpty,
  IsMongoId,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Nickname is required' })
  nickname: string;

  @IsNotEmpty({ message: 'Student id is required' })
  student_id: number;

  @IsNotEmpty({ message: 'Roll is required' })
  roll: number;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsEmpty()
  user_image: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MaxLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsNotEmpty()
  @IsArray()
  @IsMongoId({
    each: true,
    message: 'Each Id must be a valid MongoDB ObjectId',
  })
  roles: string[];

  @IsNotEmpty()
  @IsMongoId()
  workspace: string;
}
