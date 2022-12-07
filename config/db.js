import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB connected ${connection.connection.host}`);
  } catch (error) {
    console.log(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectDB;
