import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { Column } from 'src/column/entities/column.entity';
export type BoardDocument = HydratedDocument<Board>;
@Schema({ timestamps: true })
export class Board {
  _id: mongoose.Schema.Types.ObjectId;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  members: User[];
  @Prop()
  name: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User;
  @Prop()
  background: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Column' }] })
  columns: Column[];
}
export const BoardSchema = SchemaFactory.createForClass(Board);
