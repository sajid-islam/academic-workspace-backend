import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  student_id: number;

  @Prop()
  roll: number;

  @Prop()
  email: string;

  @Prop()
  user_image: string;

  @Prop()
  password: string;

  @Prop()
  status: string;

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
