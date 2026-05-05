import mongoose, { Schema, Document } from 'mongoose'

export interface IDua extends Document {
  title: string
  arabic: string
  transliteration: string
  translation: string
}

const DuaSchema = new Schema<IDua>({
  title:    { type: String, required: true },
  arabic:    { type: String, required: true },
  transliteration: { type: String, required: true },
  translation: { type: String, required: true }
}, { timestamps: true })

export default mongoose.models.Dua || mongoose.model<IDua>('Dua', DuaSchema)



