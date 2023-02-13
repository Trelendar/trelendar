import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/entities/user.entity';
export type CommentDocument = mongoose.HydratedDocument<Comment>;
@Schema({ timestamps: true })
export class Comment {
  _id: mongoose.Schema.Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;
  @Prop()
  content: string;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);
