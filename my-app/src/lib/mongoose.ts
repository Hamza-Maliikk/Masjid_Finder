// src/lib/mongoose.ts

import mongoose from 'mongoose'

const connectDB = async (): Promise<void> => {
  if (mongoose.connections[0].readyState) return

  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined in .env')
  }

  await mongoose.connect(uri)
  console.log('MongoDB Connected ✓')
}

export default connectDB