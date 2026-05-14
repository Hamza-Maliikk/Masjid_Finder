import connectDB from "../lib/mongoose";
import Store from "../models/Store";

const products = [  
  // ─── Prayer Mats ───────────────────────────────────────────────
  {
    title: "Premium Velvet Prayer Mat – Masjid Green",
    category: "Prayer Mats",
    description:
      "Thick velvet prayer mat with a soft foam inner layer for comfortable prostration. Features a Masjid-al-Haram design with intricate embroidered borders. Non-slip rubber backing keeps it firmly in place on any surface.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1677966720301-478fcb3ee2d3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 45,
  },
  {
    title: "Lightweight Travel Prayer Mat",
    category: "Prayer Mats",
    description:
      "Ultra-thin, foldable prayer mat designed for travellers. Weighs only 180g and rolls into a compact pouch. Waterproof polyester fabric with a printed qibla compass in the corner.",
    imageUrl:
      "https://images.unsplash.com/photo-1727024418120-77e4e204d09f?q=80&w=699&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 18,
  },
  {
    title: "Handwoven Turkish Prayer Rug",
    category: "Prayer Mats",
    description:
      "Authentic hand-woven Turkish rug made from 100% pure wool. Traditional Ottoman geometric pattern in navy and gold. Each piece is unique — slight variations in pattern are a mark of authenticity.",
    imageUrl:
      "https://images.unsplash.com/photo-1591624298055-3cfb0aa676c5?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 95,
  },

  // ─── Quran ─────────────────────────────────────────────────────
  {
    title: "Holy Quran – Gold Embossed Hardcover",
    category: "Quran",
    description:
      "A beautifully bound Quran with gold-embossed Arabic calligraphy on the cover. 16-line Uthmani script on cream-tinted paper, easy on the eyes. Includes a ribbon bookmark and a velvet gift box.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1679580498563-9c9af722dca6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 65,
  },
  {
    title: "Quran Majeed with Urdu Translation",
    category: "Quran",
    description:
      "Full Arabic text with a side-by-side Urdu Mufradat translation by Maulana Fateh Muhammad Jalandhari. Printed on high-quality white offset paper with colour-coded tajweed marks. Medium size, ideal for daily reading.",
    imageUrl:
      "https://images.unsplash.com/photo-1589462135796-2b46e4bdd7fe?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 40,
  },
  {
    title: "Digital Quran Pen Reader",
    category: "Quran",
    description:
      "Smart pen reader that reads aloud any verse you point to. Includes 5 different reciters, word-by-word translation in 12 languages, and Tajweed correction mode. Comes with a 16-line Quran and USB charging cable.",
    imageUrl:
      "https://www.al-hadaya.com/cdn/shop/files/Smart_Digital_Quran_Pen_Reader_with_Electronic_Holy_Quran_Tajweed_Book.jpg?v=1759987605&width=990",
    price: 120,
  },

  // ─── Tasbeeh ───────────────────────────────────────────────────
  {
    title: "Agate Stone Tasbeeh – 99 Beads",
    category: "Tasbeeh",
    description:
      "Hand-polished natural agate stone tasbeeh with 99 beads. Each bead is 10mm, providing a satisfying weight and texture for dhikr. Strung on durable silk thread with a tassel finish.",
    imageUrl:
      "https://5.imimg.com/data5/JM/LY/VH/SELLER-16076300/41hextohvpl-500x500.jpg",
    price: 25,
  },
  {
    title: "Digital Tasbeeh Counter",
    category: "Tasbeeh",
    description:
      "Electronic thumb-press counter that tracks up to 9,999 counts with a single button reset. Compact, lightweight, and battery-powered. Perfect for istighfar, salawat, or any form of dhikr on the go.",
    imageUrl:
      "https://ibnezafar.com/wp-content/uploads/2022/02/Digitaltasbih1-768x768.jpg",
    price: 12,
  },

  // ─── Attar ─────────────────────────────────────────────────────
  {
    title: "Oud Al Layl Attar – 12ml",
    category: "Attar",
    description:
      "A rich, deep oud attar with notes of dark wood, amber, and a hint of rose musk. Alcohol-free, oil-based formula that lasts up to 8 hours on skin. Sourced from aged agarwood from Assam, India.",
    imageUrl:
      "https://cdn11.bigcommerce.com/s-lu1tw1pz/images/stencil/640w/products/480/1736/OUD_AL_LAIL_EDP__41735.1558975883.jpg?c=2",
    price: 35,
  },
  {
    title: "Musk Al Madinah Attar – 6ml",
    category: "Attar",
    description:
      "A light, clean white musk attar inspired by the fragrance of Masjid an-Nabawi. Delicate floral undertones with a soft powdery dry-down. Alcohol-free and suitable for prayer. A beloved daily scent.",
    imageUrl:
      "https://aljannat.pk/wp-content/uploads/2024/03/WhatsApp-Image-2024-05-19-at-5.59.46-PM-3-scaled-1-1024x1024.jpeg",
    price: 22,
  },
  {
    title: "Rose Taif Attar – 8ml",
    category: "Attar",
    description:
      "Extracted from the prized Taif roses of Saudi Arabia, this attar is a classic in Islamic perfumery. A pure, lush rose scent with no synthetic additives. Presented in a hand-cut crystal bottle with a golden cap.",
    imageUrl:
      "https://armaastore.com/cdn/shop/files/63E59267-ACA5-4C1F-A282-A9A3B69C0B57.jpg?v=1752906528&width=990",
    price: 55,
  },

  // ─── Caps ──────────────────────────────────────────────────────
  {
    title: "Turkish Style Topi – Off White",
    category: "Caps",
    description:
      "Classic Turkish topi made from soft cotton-linen blend. Features a structured crown with a clean crocheted border. One size fits most with a flexible inner band. Machine washable.",
    imageUrl:
      "https://aladdinshoppers.com/cdn/shop/files/image_4eae6e7d-71d8-4bea-ac1b-8860787009ed_1024x1024.jpg?v=1734705701",
    price: 15,
  },
  {
    title: "Embroidered Kufi Cap – Pakistani Style",
    category: "Caps",
    description:
      "Hand-embroidered Kufi cap in traditional Pakistani style with white threadwork geometric patterns on a white cotton base. Lightweight, breathable, and perfect for salah or everyday wear.",
    imageUrl:
      "https://i.pinimg.com/474x/6c/b0/f5/6cb0f54ed9f843c32290a9c890c369f4.jpg",
    price: 20,
  }
];

async function seed() {
  await connectDB();

  await Store.deleteMany({});
  console.log("🗑️  Purana data saaf ho gaya");

  await Store.insertMany(products);
  console.log(`📖 ${products.length} products inserted!`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
