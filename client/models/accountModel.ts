import { model, Document, Model, Schema, models, ObjectId } from 'mongoose';
import Mongoose from 'mongoose';
export interface IAccount extends Document {
  provider: string;
  type: string;
  providerAccountId: string;
  access_token: string;
  expires_at: Number;
  scope: string;
  token_type: string;
  id_token: string;
  userId: Mongoose.Schema.Types.ObjectId;
}

const accountSchema: Schema = new Schema(
  {
    provider: {
      type: String,
    },
    type: {
      type: String,
    },
    providerAccountId: {
      type: String,
    },
    access_token: {
      type: String,
    },
    expires_at: {
      type: Number,
    },
    scope: {
      type: String,
    },
    token_type: {
      type: String,
    },
    id_token: {
      type: String,
    },
    userId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true }
);

const Account =
  (models.account as Model<IAccount, {}, {}, {}>) || model<IAccount>('account', accountSchema);
export default Account;
