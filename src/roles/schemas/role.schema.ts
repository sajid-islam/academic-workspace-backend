import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Action, Resource } from '../enums/permission.enum.js';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ _id: false })
class Permission {
  @Prop({ required: true, enum: Resource })
  resource: Resource;

  @Prop({ type: [{ type: String, enum: Action }] })
  actions: Action[];
}

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true, unique: true, lowercase: true, index: true })
  name: string;

  @Prop({ required: true, type: [Permission] })
  permissions: Permission[];

  @Prop({ default: false })
  is_system: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
