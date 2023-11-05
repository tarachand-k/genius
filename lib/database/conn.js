import mongoose from "mongoose";

// Database URL
const dbURL = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

// database connection
const dbConnect = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }

  return await mongoose.connect(dbURL);
};
export default dbConnect;
