import mongoose from "mongoose";
import { DB_NAME } from "../const/constant";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  lastFailure: number;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache;

if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null, lastFailure: 0 };
}

cached = global.mongooseCache;

export const connectDB = async (): Promise<typeof mongoose> => {
  if (cached.conn) return cached.conn;

  if (Date.now() - cached.lastFailure < 10000) {
    throw new Error("Database is offline (cooling down after connection failure)");
  }

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
    cached.lastFailure = Date.now();
    console.error("MongoDB connection FAILED:", error);
    throw error;
  }

  console.log(`MongoDB connected!! Host: ${mongoose.connection.host}`);
  return cached.conn!;
};