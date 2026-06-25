import mongoose from "mongoose";
import { DB_NAME } from "../const/constant";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  isOffline: boolean;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache;

if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null, isOffline: false };
}

cached = global.mongooseCache;

export const connectDB = async (): Promise<typeof mongoose> => {
  if (cached.isOffline) {
    throw new Error("Database is offline (connection previously failed)");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2000,
    }).then(() => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    cached.isOffline = true;
    console.error("MongoDB connection FAILED:", error);
    throw error;
  }

  console.log(`MongoDB connected!! Host: ${mongoose.connection.host}`);
  return cached.conn!;
};