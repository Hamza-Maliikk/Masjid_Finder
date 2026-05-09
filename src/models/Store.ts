import mongoose, { Schema, Document } from 'mongoose'

export interface IStore extends Document {
  title: string
  category?: string
  description?: string
  imageUrl: string
  price: number
}

const StoreSchema = new Schema<IStore>({
  title:    { type: String, required: true },
  category: { type: String, required: false },
  description: { type: String, required: false },
  imageUrl:    { type: String, required: true },
  price: { type: Number, required: true }
}, { timestamps: true })

export default mongoose.models.Store || mongoose.model<IStore>('Store', StoreSchema)



