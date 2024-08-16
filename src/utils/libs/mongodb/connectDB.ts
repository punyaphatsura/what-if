import mongoose, { ConnectOptions } from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local or .env.production.');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    isConnected = true;
    console.log('Connected to Database successfully');
  } catch (err) {
    console.error(`Failed to connect to Database - ${err}`);
  }
};

export default connectDB;
