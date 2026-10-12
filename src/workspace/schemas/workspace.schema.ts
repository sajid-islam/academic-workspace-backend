import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WorkspaceDocument = HydratedDocument<Workspace>;

@Schema()
export class Workspace {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  session: string;

  @Prop({ required: true })
  year: string;

  @Prop({ required: true })
  semester: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  courses: string;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
