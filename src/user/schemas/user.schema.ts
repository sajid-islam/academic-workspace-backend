import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../types/user.type.js';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  student_id: number;

  @Prop({ required: true })
  roll: number;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  user_image: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: 'active', enum: ['active', 'inactive'] })
  status: string;

  @Prop({ default: Role.Student })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
