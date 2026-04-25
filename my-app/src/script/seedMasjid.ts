import connectDB from '../lib/mongoose'
import Masjid from '../models/Masjid'

export const MASJID_DB = [
  { name: 'Rizwan Masjid',        area: 'Sector 5L, North Karachi',                     dist: 0.4, cap: '5000+', parking: true,  timings: { juma: '2:15' } },
  { name: 'KanzulEman Masjid',    area: 'Alam Pride, North Karachi',                    dist: 0.8, cap: '2000',  parking: false, timings: { juma: '2:20' } },
  { name: 'Babu ul Islam',        area: 'Sector 8, North Karachi',                      dist: 1.1, cap: '1500',  parking: true,  timings: { juma: '3:00' } },
  { name: 'Al Huda Masjid',       area: 'Sector 11 A, North Karachi',                   dist: 1.6, cap: '800',   parking: false, timings: { juma: '1:45' } },
  { name: 'Noor Masjid',          area: 'Sector 11 L, North Karachi',                   dist: 1.9, cap: '3000',  parking: true,  timings: { juma: '2:30' } },
  { name: 'Saleem Center Masjid', area: 'Sector 11 L, North Karachi',                   dist: 2.0, cap: '600',   parking: false, timings: { juma: '1:00' } },
  { name: 'Kuba Masjid',          area: 'Sector 5C-4, North Karachi',                   dist: 3.1, cap: '1200',  parking: true,  timings: { juma: '2:30' } },
  { name: 'Beet ul Anam Masjid',  area: 'FLAT#Beet-ul-Anam, Sector-5k, North Karachi', dist: 4.5, cap: '4000',  parking: true,  timings: { juma: '1:30' } },
  { name: 'Farooqia Masjid',      area: 'Sector 11K, Saleem Center',                    dist: 5.8, cap: '900',   parking: false, timings: { juma: '1:15' } },
  { name: 'Usmania Masjid',       area: 'Ajmer Nagri, North Karachi',                   dist: 7.2, cap: '8000',  parking: true,  timings: { juma: '2:00' } },
]

async function seed() {
  await connectDB()

  await Masjid.deleteMany({})
  console.log('🗑️  Purana data saaf ho gaya')

  await Masjid.insertMany(MASJID_DB)
  console.log('🕌 10 Masjidein Atlas mein save ho gayin!')

  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Error:', err)
  process.exit(1)
})