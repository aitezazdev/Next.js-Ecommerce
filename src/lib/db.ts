import mongoose from "mongoose";
import { DB_NAME } from "../const/constant";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache;

if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

cached = global.mongooseCache;

export const connectDB = async (): Promise<typeof mongoose> => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`, {
      bufferCommands: false,
    }).then(() => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("MongoDB connection FAILED:", error);
    process.exit(1);
  }

  console.log(`MongoDB connected!! Host: ${mongoose.connection.host}`);
  return cached.conn!;
};