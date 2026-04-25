import mongoose, { Schema, Document } from 'mongoose'

export interface IMasjid extends Document {
  name: string
  area: string
  dist: number
  cap: string
  parking: boolean
  timings: {
    juma: string
  }
}

const MasjidSchema = new Schema<IMasjid>({
  name:    { type: String, required: true },
  area:    { type: String, required: true },
  dist:    { type: Number, required: true },
  cap:     { type: String, required: true },
  parking: { type: Boolean, required: true },
  timings: {
    juma:  { type: String, required: true }
  }
}, { timestamps: true })

export default mongoose.models.Masjid || mongoose.model<IMasjid>('Masjid', MasjidSchema)