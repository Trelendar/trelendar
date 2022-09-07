import { model, Document, Model, Schema, models } from 'mongoose';

export interface IUser extends Document {
  username: string;
  name: string;
  email: string;
  password?: string;
  image: string;
  emailVerified: string | null;
}

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      default: 'username default',
    },
    name: {
      type: String,
      default: 'guest',
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
    },
    emailVerified: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const User = (models.users as Model<IUser, {}, {}, {}>) || model<IUser>('users', userSchema);
export default User;
