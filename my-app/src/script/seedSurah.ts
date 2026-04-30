import connectDB from '../lib/mongoose'
import Dua from '../models/Dua'

export const DUA_DB = [
{
    title: "Surah Kahf",
    description: "Surah Kahf is the 18th chapter of the Quran, consisting of 110 verses. It is named after the story of the People of the Cave (Ashab al-Kahf) mentioned in verses 9-26. The chapter emphasizes the importance of faith, patience, and reliance on Allah during times of trial and tribulation. It also contains stories of various prophets and serves as a reminder of the transient nature of worldly life.",
    benefits: [
        "Reciting Surah Kahf on Fridays brings blessings and protection from the trials of the Dajjal (Antichrist).",
        "It serves as a source of light and guidance for the believer throughout the week.",
        "Reciting the first ten verses of Surah Kahf provides protection from the Dajjal.",
        "It reminds believers of the importance of patience and reliance on Allah during difficult times."
    ],
    start: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    surah: "ٱلْحَمْدُ لِلَّهِ ٱلَّذِىٓ أَنزَلَ عَلَىٰ عَبْدِهِ ٱلْكِتَـٰبَ وَلَمْ يَجْعَل لَّهُۥ عِوَجَاۜ ١ قَيِّمًۭا لِّيُنذِرَ بَأْسًۭا شَدِيدًۭا مِّن لَّدُنْهُ وَيُبَشِّرَ ٱلْمُؤْمِنِينَ ٱلَّذِينَ يَعْمَلُونَ ٱلصَّـٰلِحَـٰتِ أَنَّ لَهُمْ أَجْرًا حَسَنًۭا ٢ مَّـٰكِثِينَ فِيهِ أَبَدًۭا ٣ وَيُنذِرَ ٱلَّذِينَ قَالُوا۟ ٱتَّخَذَ ٱللَّهُ وَلَدًۭا ٤"
}
]

async function seed() {
  await connectDB()

  await Dua.deleteMany({})
  console.log('🗑️  Purana data saaf ho gaya')

  await Dua.insertMany(DUA_DB)
  console.log(`📖 ${DUA_DB.length} Duayein Atlas mein save ho gayin!`)

  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Error:', err)
  process.exit(1)
})