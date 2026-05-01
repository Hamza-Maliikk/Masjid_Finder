'use client';

import { useState } from 'react';
import { Poppins } from 'next/font/google';
import { ShoppingBag, Star, Plus, Search } from 'lucide-react';
import styles from './store.module.css';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

const CATEGORIES = ['All', 'Prayer Mats', 'Quran', 'Tasbeeh', 'Attar', 'Caps'];

const PRODUCTS = [
  {
    id: 1,
    name: 'Premium Velvet Prayer Mat',
    price: 45.00,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1595113316349-944115180f68?auto=format&fit=crop&q=80&w=400',
    category: 'Prayer Mats',
    badge: 'Best Seller'
  },
  {
    id: 2,
    name: 'Holy Quran - Gold Embossed',
    price: 65.00,
    rating: 5.0,
    reviews: 342,
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaab31ce?auto=format&fit=crop&q=80&w=400',
    category: 'Quran',
    badge: 'Premium'
  },
  {
    id: 3,
    name: 'Agate Stone Tasbeeh',
    price: 25.00,
    rating: 4.6,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1608226462947-f7035548d88e?auto=format&fit=crop&q=80&w=400',
    category: 'Tasbeeh'
  },
  {
    id: 4,
    name: 'Oud Al Layl Attar (12ml)',
    price: 35.00,
    rating: 4.9,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1615397323136-1216d2f3cdae?auto=format&fit=crop&q=80&w=400',
    category: 'Attar',
    badge: 'New'
  },
  {
    id: 5,
    name: 'Turkish Style Topi',
    price: 15.00,
    rating: 4.5,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1592398453472-3c220f1885cc?auto=format&fit=crop&q=80&w=400',
    category: 'Caps'
  },
  {
    id: 6,
    name: 'Medina Dates (Ajwa)',
    price: 55.00,
    rating: 4.9,
    reviews: 450,
    image: 'https://images.unsplash.com/photo-1588611171825-f7d9834220d5?auto=format&fit=crop&q=80&w=400',
    category: 'Food',
    badge: 'Sunnah'
  }
];

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className={`${styles.wrapper} ${poppins.className}`}>
      <div className={styles.container}>
        
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>
            <ShoppingBag size={32} />
            Islamic Store
          </h1>
          <button className={styles.cartBtn} aria-label="Cart">
            <ShoppingBag size={24} />
            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
          </button>
        </header>

        {/* Controls: Search & Filter */}
        <div className={styles.controls}>
          <div className={styles.searchBar}>
            <Search size={20} color="rgba(255,255,255,0.4)" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={styles.categories}>
            {CATEGORIES.map(category => (
              <button 
                key={category}
                className={`${styles.categoryBtn} ${activeCategory === category ? styles.categoryActive : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className={styles.grid}>
          {filteredProducts.map(product => (
            <div key={product.id} className={styles.card}>
              <div className={styles.imageWrap}>
                {product.badge && <div className={styles.badge}>{product.badge}</div>}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={styles.productImage}
                  loading="lazy"
                />
              </div>
              
              <div className={styles.cardContent}>
                <div className={styles.category}>{product.category}</div>
                <h3 className={styles.productName}>{product.name}</h3>
                
                <div className={styles.rating}>
                  <Star size={14} className={styles.star} fill="currentColor" />
                  <span style={{fontWeight: 600, fontSize: 14}}>{product.rating}</span>
                  <span className={styles.reviews}>({product.reviews} reviews)</span>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.price}>${product.price.toFixed(2)}</div>
                  <button className={styles.addBtn} onClick={handleAddToCart} aria-label="Add to cart">
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{textAlign: 'center', padding: '60px 20px', color: 'rgba(255,255,255,0.5)'}}>
            <ShoppingBag size={48} style={{margin: '0 auto 16px', opacity: 0.5}} />
            <p style={{fontSize: 18}}>No products found.</p>
          </div>
        )}

      </div>
    </div>
  );
}