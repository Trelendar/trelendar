import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';
export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): any => {
    return v2.config({
      cloud_name: process.env.YOUR_CLOUD_NAME,
      api_key: process.env.YOUR_API_KEY,
      api_secret: process.env.YOUR_API_SECRET,
    });
  },
};
