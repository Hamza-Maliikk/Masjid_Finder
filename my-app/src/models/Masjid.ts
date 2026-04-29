import mongoose, { Schema, Document } from 'mongoose'

export interface IMasjid extends Document {
  title: string
  arabic: string
  transliteration: string
  translation: string
}

const DuaSchema = new Schema<IMasjid>({
  title:    { type: String, required: true },
  arabic:    { type: String, required: true },
  transliteration: { type: String, required: true },
  translation: { type: String, required: true }
}, { timestamps: true })

export default mongoose.models.Dua || mongoose.model<IMasjid>('Dua', DuaSchema)