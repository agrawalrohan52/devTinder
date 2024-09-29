import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://agrawalrohan52:peQvpbH6uaJ9hw5E@namastenode.plofm.mongodb.net/devTinder"
  );
};
