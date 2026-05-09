import mongoose, { Schema, Document } from 'mongoose'

export interface IStore extends Document {
  title: string
  imageUrl: string
  price: number
}

const StoreSchema = new Schema<IStore>({
  title:    { type: String, required: true },
  imageUrl:    { type: String, required: true },
  price: { type: Number, required: true }
}, { timestamps: true })

export default mongoose.models.Store || mongoose.model<IStore>('Store', StoreSchema)



