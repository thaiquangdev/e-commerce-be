import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Mongo db connected`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
