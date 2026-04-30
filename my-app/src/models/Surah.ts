import mongoose, { Schema, Document } from 'mongoose'

export interface ISurah extends Document {
title : string
description : string
benefits : string[]
start : string
surah : string
}

const SurahSchema = new Schema<ISurah>({
  title:    { type: String, required: true },
  description:    { type: String, required: true },
  benefits:    { type: [String], required: true },
  start:    { type: String, required: true },
  surah:    { type: String, required: true },
}, { timestamps: true })

export default mongoose.models.Surah || mongoose.model<ISurah>('Surah', SurahSchema)