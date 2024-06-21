import mongoose from 'mongoose';
import 'dotenv/config';

export const mongooseConnect = () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    return mongoose.connect(process.env.MONGODB_URL!);
  }
};
