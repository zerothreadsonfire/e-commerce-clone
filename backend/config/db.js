import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://127.0.0.1:27017/ecommerce-clone';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB connected ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectDB;
