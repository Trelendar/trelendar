import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Card } from 'src/card/entities/card.entity';
export type ColumnDocument = mongoose.HydratedDocument<Column>;
@Schema({ timestamps: true })
export class Column {
  _id: mongoose.Schema.Types.ObjectId;
  @Prop()
  title: string;
  @Prop()
  order: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }] })
  cards: Card[];
  createdAt: Date;
  updatedAt: Date;
}
export const ColumnSchema = SchemaFactory.createForClass(Column);
