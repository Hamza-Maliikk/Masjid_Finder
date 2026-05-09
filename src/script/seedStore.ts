import connectDB from '../lib/mongoose'
import Store from '../models/Store'

const products = [
  // ─── Prayer Mats ───────────────────────────────────────────────
  {
    title: "Premium Velvet Prayer Mat – Masjid Green",
    category: "Prayer Mats",
    description:
      "Thick velvet prayer mat with a soft foam inner layer for comfortable prostration. Features a Masjid-al-Haram design with intricate embroidered borders. Non-slip rubber backing keeps it firmly in place on any surface.",
    imageUrl: "https://images.unsplash.com/photo-1595113316349-944115180f68?auto=format&fit=crop&q=80&w=600",
    price: 45,
    badge: "Best Seller",
  },
  {
    title: "Lightweight Travel Prayer Mat",
    category: "Prayer Mats",
    description:
      "Ultra-thin, foldable prayer mat designed for travellers. Weighs only 180g and rolls into a compact pouch. Waterproof polyester fabric with a printed qibla compass in the corner.",
    imageUrl: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?auto=format&fit=crop&q=80&w=600",
    price: 18,
    badge: null,
  },
  {
    title: "Handwoven Turkish Prayer Rug",
    category: "Prayer Mats",
    description:
      "Authentic hand-woven Turkish rug made from 100% pure wool. Traditional Ottoman geometric pattern in navy and gold. Each piece is unique — slight variations in pattern are a mark of authenticity.",
    imageUrl: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&q=80&w=600",
    price: 95,
    badge: "Premium",
  },

  // ─── Quran ─────────────────────────────────────────────────────
  {
    title: "Holy Quran – Gold Embossed Hardcover",
    category: "Quran",
    description:
      "A beautifully bound Quran with gold-embossed Arabic calligraphy on the cover. 16-line Uthmani script on cream-tinted paper, easy on the eyes. Includes a ribbon bookmark and a velvet gift box.",
    imageUrl: "https://images.unsplash.com/photo-1609599006353-e629aaab31ce?auto=format&fit=crop&q=80&w=600",
    price: 65,
    badge: "Premium",
  },
  {
    title: "Quran Majeed with Urdu Translation",
    category: "Quran",
    description:
      "Full Arabic text with a side-by-side Urdu Mufradat translation by Maulana Fateh Muhammad Jalandhari. Printed on high-quality white offset paper with colour-coded tajweed marks. Medium size, ideal for daily reading.",
    imageUrl: "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=600",
    price: 40,
    badge: null,
  },
  {
    title: "Digital Quran Pen Reader",
    category: "Quran",
    description:
      "Smart pen reader that reads aloud any verse you point to. Includes 5 different reciters, word-by-word translation in 12 languages, and Tajweed correction mode. Comes with a 16-line Quran and USB charging cable.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    price: 120,
    badge: "New",
  },

  // ─── Tasbeeh ───────────────────────────────────────────────────
  {
    title: "Agate Stone Tasbeeh – 99 Beads",
    category: "Tasbeeh",
    description:
      "Hand-polished natural agate stone tasbeeh with 99 beads. Each bead is 10mm, providing a satisfying weight and texture for dhikr. Strung on durable silk thread with a tassel finish.",
    imageUrl: "https://images.unsplash.com/photo-1608226462947-f7035548d88e?auto=format&fit=crop&q=80&w=600",
    price: 25,
    badge: null,
  },
  {
    title: "Digital Tasbeeh Counter",
    category: "Tasbeeh",
    description:
      "Electronic thumb-press counter that tracks up to 9,999 counts with a single button reset. Compact, lightweight, and battery-powered. Perfect for istighfar, salawat, or any form of dhikr on the go.",
    imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600",
    price: 12,
    badge: null,
  },
  {
    title: "Sandalwood Tasbeeh – Aromatic 33 Beads",
    category: "Tasbeeh",
    description:
      "Carved from pure Indian sandalwood, this 33-bead tasbeeh carries a gentle natural fragrance that intensifies with use. Smooth rounded beads with natural wood grain patterns. Comes in a small velvet pouch.",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
    price: 30,
    badge: "Premium",
  },

  // ─── Attar ─────────────────────────────────────────────────────
  {
    title: "Oud Al Layl Attar – 12ml",
    category: "Attar",
    description:
      "A rich, deep oud attar with notes of dark wood, amber, and a hint of rose musk. Alcohol-free, oil-based formula that lasts up to 8 hours on skin. Sourced from aged agarwood from Assam, India.",
    imageUrl: "https://images.unsplash.com/photo-1615397323136-1216d2f3cdae?auto=format&fit=crop&q=80&w=600",
    price: 35,
    badge: "New",
  },
  {
    title: "Musk Al Madinah Attar – 6ml",
    category: "Attar",
    description:
      "A light, clean white musk attar inspired by the fragrance of Masjid an-Nabawi. Delicate floral undertones with a soft powdery dry-down. Alcohol-free and suitable for prayer. A beloved daily scent.",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&q=80&w=600",
    price: 22,
    badge: "Best Seller",
  },
  {
    title: "Rose Taif Attar – 8ml",
    category: "Attar",
    description:
      "Extracted from the prized Taif roses of Saudi Arabia, this attar is a classic in Islamic perfumery. A pure, lush rose scent with no synthetic additives. Presented in a hand-cut crystal bottle with a golden cap.",
    imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600",
    price: 55,
    badge: "Premium",
  },

  // ─── Caps ──────────────────────────────────────────────────────
  {
    title: "Turkish Style Topi – Off White",
    category: "Caps",
    description:
      "Classic Turkish topi made from soft cotton-linen blend. Features a structured crown with a clean crocheted border. One size fits most with a flexible inner band. Machine washable.",
    imageUrl: "https://images.unsplash.com/photo-1592398453472-3c220f1885cc?auto=format&fit=crop&q=80&w=600",
    price: 15,
    badge: null,
  },
  {
    title: "Embroidered Kufi Cap – Pakistani Style",
    category: "Caps",
    description:
      "Hand-embroidered Kufi cap in traditional Pakistani style with white threadwork geometric patterns on a white cotton base. Lightweight, breathable, and perfect for salah or everyday wear.",
    imageUrl: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&q=80&w=600",
    price: 20,
    badge: null,
  },
  {
    title: "Knitted Woollen Topi – Winter",
    category: "Caps",
    description:
      "Thick knitted topi made from premium merino wool blend. Keeps you warm during Fajr and Isha in cold winters while maintaining a clean Islamic look. Available in charcoal, navy, and ivory.",
    imageUrl: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=600",
    price: 28,
    badge: "New",
  },
];


async function seed() {
  await connectDB()

  await Store.deleteMany({})
  console.log('🗑️  Purana data saaf ho gaya')

  await Store.insertMany(products)
  console.log(`📖 ${products.length} products inserted!`)
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Error:', err)
  process.exit(1)
})