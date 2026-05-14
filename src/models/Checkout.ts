import mongoose, { Schema, Document } from 'mongoose'
import { IDua } from './Dua'

export interface ICheckout extends Document {
  name: string
  email: string
  phone: string
  address: string
  city: string
  zip: string
  paymentMethod: 'cod' 
}

const CheckoutSchema = new Schema<ICheckout>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  paymentMethod: { type: String, enum: ['cod'], required: true },
}, { timestamps: true })

export default mongoose.models.Checkout || mongoose.model<ICheckout>('Checkout', CheckoutSchema)



