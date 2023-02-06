import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
export enum Gender {
  Male = 'male',
  Female = 'female',
}
@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  image: string;

  @Prop()
  username: string;

  @Prop()
  gender: Gender;
}
export const UserSchema = SchemaFactory.createForClass(User);
