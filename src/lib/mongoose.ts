import dotenv from 'dotenv'
dotenv.config({ path: '.env' }) 
import dns from 'dns'
import mongoose from 'mongoose'

const connectDB = async (): Promise<void> => {
  try{
    if (mongoose.connections[0].readyState) return
     dns.setServers(["1.1.1.1", "8.8.8.8"]);

  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined in .env')
  }

  await mongoose.connect(uri)
  console.log('MongoDB Connected ✓')
  }catch(error){
    console.error('MongoDB connection error:', error)
  }
  
}

export default connectDB