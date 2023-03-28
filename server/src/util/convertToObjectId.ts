import mongoose from 'mongoose';
const convertToObjectId = (id: string) => {
  return new mongoose.Types.ObjectId(id);
};
export default convertToObjectId;
