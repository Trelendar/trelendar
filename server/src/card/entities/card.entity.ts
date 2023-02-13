import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';
export type CardDocument = mongoose.HydratedDocument<Card>;
@Schema({ timestamps: true })
export class Card {
  _id: mongoose.Schema.Types.ObjectId;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  priority: string;
  @Prop()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  members: User[];
  @Prop()
  start: Date;
  @Prop()
  end: Date;
  @Prop({ type: [{ type: mongoose.Schema.Types.Array }] })
  attachment: string[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}
export const CardSchema = SchemaFactory.createForClass(Card);
