import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Action, Resource } from '../enums/permission.enum.js';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
class Permission {
  @Prop({ required: true, enum: Resource })
  resource: Resource;

  @Prop({ type: [{ type: String, enum: Action }] })
  actions: Action[];
}

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, type: [Permission] })
  permissions: [Permission];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
