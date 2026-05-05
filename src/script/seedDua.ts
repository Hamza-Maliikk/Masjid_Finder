import connectDB from '../lib/mongoose'
import Dua from '../models/Dua'

export const DUA_DB = [
{
    title: "Dua for entering the mosque",
    arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    transliteration: "Allahumma iftah li abwaba rahmatika",
    translation: "O Allah, open for me the doors of Your mercy."
},
{
    title: "Dua for leaving the mosque",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    transliteration: "Allahumma inni as'aluka min fadlika",
    translation: "O Allah, I ask You for Your favor."
},
{
    title: "Dua for seeking forgiveness",
    arabic: "أَسْتَغْفِرُ اللَّهَ رَبِّي مِنْ كُلِّ ذَنْبٍ وَأَتُوبُ إِلَيْهِ",
    transliteration: "Astaghfirullaha rabbi min kulli dhanbin wa atubu ilayh",
    translation: "I seek forgiveness from Allah, my Lord, from every sin I committed and I turn to Him in repentance."
},{
    title: "Dua for seeking guidance",
    arabic: "اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي",
    transliteration: "Allahumma ihdini wa saddidni",
    translation: "O Allah, guide me and make me steadfast."
},
{
    title: "Dua for Rizq",
    arabic: "اللَّهُمَّ ارزقْنِي مِنْ خَيْرٍ فِي الدُّنْيَا وَالآخِرَةِ",
    transliteration: "Allahumma arzqni min khayr fi ad-dunya wa al-akhirah",
    translation: "O Allah, provide me with good things in this world and the next."
},
{
    title: "Dua for Peace of Heart",
    arabic: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا وَفِي لِسَانِي نُورًا وَاجْعَلْ فِي سَمْعِي نُورًا وَاجْعَلْ فِي بَصَرِي نُورًا وَاجْعَلْ مِنْ خَلْفِي نُورًا وَمِنْ أَمَامِي نُورًا وَمِنْ فَوْقِي نُورًا وَمِنْ تَحْتِي نُورًا",
    transliteration: "Allahumma aj'al fi qalbi nuran wa fi lisani nuran wa aj'al fi sam'i nuran wa aj'al fi basari nuran wa aj'al min khalfi nuran wa min amami nuran wa min fawqi nuran wa min tahti nuran",
    translation: "O Allah, place light in my heart, light in my tongue, light in my hearing, light in my sight, light behind me, light in front of me, light above me, and light below me."     
},{
    title: "Dua for Ease in Difficulties",
    arabic: "اللَّهُمَّ لا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا وَأَنْتَ تَجْعَلُ الْحَزَنَ إِذَا شِئْتَ سَهْلًا",
    transliteration: "Allahumma la sahla illa ma ja'altahu sahlan wa anta taj'alul hazna iza shi'ta sahlan",
    translation: "O Allah, there is no ease except in that which You have made easy, and You make the difficult easy if You wish."
},{
    title: "Dua for Protection from Hellfire",
    arabic: "اللَّهُمَّ أَجِرْنِي مِنْ النَّارِ",
    transliteration: "Allahumma ajirni min an-nar",
    translation: "O Allah, save me from the fire (of Hell)."
},{
    title: "Dua (Durood) on Prophet(PBUH)",
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    transliteration: "Allahumma salli 'ala Muhammad wa 'ala ali Muhammad kama sallayta 'ala Ibrahim wa 'ala ali Ibrahim innaka Hamidun Majid",
    translation: "O Allah, send blessings upon Muhammad and upon the family of Muhammad, as You sent blessings upon Ibrahim and upon the family of Ibrahim. Indeed, You are Praiseworthy and Glorious."
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