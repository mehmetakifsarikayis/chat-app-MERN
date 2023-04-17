import mongoose from 'mongoose';

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected : ${conn.connection.host}`);
  } catch (err) {
    console.log(' Error', err);
    process.exit(1);
  }
};
export default ConnectDB;
