import { User } from 'src/user/entities/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type EventDocument = mongoose.HydratedDocument<Event>;

@Schema({ timestamps: true })
export class Event {
  _id: mongoose.Schema.Types.ObjectId;
  @Prop()
  start: Date;
  @Prop()
  end: Date;
  @Prop()
  allDay: boolean;
  @Prop()
  title: string;
  @Prop()
  desc: string;
  @Prop()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  members: mongoose.Schema.Types.ObjectId[] | User[];
  createdAt: Date;
  updatedAt: Date;
}
export const EventSchema = SchemaFactory.createForClass(Event);
