import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

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

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Role' }], default: [] })
  roles: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Workspace' })
  workspace: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', function () {
  if (!this.user_image && this.name) {
    this.user_image = `https://api.dicebear.com/10.x/glyphs/svg?seed=${encodeURIComponent(this.name)}`;
  }
});
