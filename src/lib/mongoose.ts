import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' }) 
import mongoose from 'mongoose'

const connectDB = async (): Promise<void> => {
  try{
    if (mongoose.connections[0].readyState) return

  const uri = "mongodb+srv://hamzascorpio03_db_user:hamzamalik1126@cluster0.lmluqbd.mongodb.net/?appName=Cluster0"

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