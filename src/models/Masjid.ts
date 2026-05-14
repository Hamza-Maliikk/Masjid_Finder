import mongoose, { Schema, Document } from 'mongoose'

export interface IMasjid extends Document {
  name: string
  area: string
  dist: number
  cap: string
  lat: number
  lng: number
  parking: boolean
  timings: {
    juma: string
  }
}

const MasjidSchema = new Schema<IMasjid>({
  name:    { type: String, required: true },
  area:    { type: String, required: true },
  dist:    { type: Number, required: false },
  cap:     { type: String, required: false },
  lat:   { type: Number, required: true },
  lng:   { type: Number, required: true},
  parking: { type: Boolean, required: true },
  timings: {
    juma:  { type: String }
  }
}, { timestamps: true })

export default mongoose.models.Masjid || mongoose.model<IMasjid>('Masjid', MasjidSchema)