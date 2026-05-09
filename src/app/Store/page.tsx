'use client';

import { useState } from 'react';
import { ShoppingBag, Star, Plus, Search } from 'lucide-react';

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
    badge: 'Best Seller',
  },
  {
    id: 2,
    name: 'Holy Quran - Gold Embossed',
    price: 65.00,
    rating: 5.0,
    reviews: 342,
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaab31ce?auto=format&fit=crop&q=80&w=400',
    category: 'Quran',
    badge: 'Premium',
  },
  {
    id: 3,
    name: 'Agate Stone Tasbeeh',
    price: 25.00,
    rating: 4.6,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1608226462947-f7035548d88e?auto=format&fit=crop&q=80&w=400',
    category: 'Tasbeeh',
  },
  {
    id: 4,
    name: 'Oud Al Layl Attar (12ml)',
    price: 35.00,
    rating: 4.9,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1615397323136-1216d2f3cdae?auto=format&fit=crop&q=80&w=400',
    category: 'Attar',
    badge: 'New',
  },
  {
    id: 5,
    name: 'Turkish Style Topi',
    price: 15.00,
    rating: 4.5,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1592398453472-3c220f1885cc?auto=format&fit=crop&q=80&w=400',
    category: 'Caps',
  },
  {
    id: 6,
    name: 'Medina Dates (Ajwa)',
    price: 55.00,
    rating: 4.9,
    reviews: 450,
    image: 'https://images.unsplash.com/photo-1588611171825-f7d9834220d5?auto=format&fit=crop&q=80&w=400',
    category: 'Food',
    badge: 'Sunnah',
  },
];

// Badge colour per label
const badgeColor: Record<string, string> = {
  'Best Seller': 'rgba(14,158,138,0.85)',
  Premium: 'rgba(201,168,76,0.85)',
  New: 'rgba(14,158,138,0.85)',
  Sunnah: 'rgba(201,168,76,0.85)',
};

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#060d1a',
      backgroundImage: `
        radial-gradient(ellipse 60% 50% at 15% 10%,  rgba(14,158,138,0.18) 0%, transparent 70%),
        radial-gradient(ellipse 50% 60% at 20% 90%,  rgba(14,158,138,0.10) 0%, transparent 70%),
        radial-gradient(ellipse 40% 50% at 85% 35%,  rgba(201,168,76,0.12)  0%, transparent 70%),
        repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.005) 40px, rgba(255,255,255,0.005) 41px)
      `,
      fontFamily: "'Tajawal', 'Segoe UI', sans-serif",
      color: '#e8f4ff',
      position: 'relative',
      overflowX: 'hidden',
    }}>

      {/* Glow blobs */}
      <div style={{ position: 'fixed', top: -80, right: -80, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,158,138,0.14) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: 0, left: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,158,138,0.09) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', top: '30%', right: -40, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.25rem 4rem', position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2.2rem 0 1.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* badge */}
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(14,158,138,0.12)', border: '1px solid rgba(14,158,138,0.38)', color: '#4cd8a0', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 14px', borderRadius: 20 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4cd8a0', display: 'inline-block' }} />
              Islamic Store
            </span>
          </div>

          <h1 style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: 'clamp(1.4rem,3.5vw,2rem)', fontWeight: 700, color: '#e8f4ff', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShoppingBag size={26} color="#4cd8a0" />
            Islamic Store
          </h1>

          {/* Cart */}
          <button
            onClick={() => {}}
            aria-label="Cart"
            style={{ position: 'relative', background: 'rgba(14,158,138,0.12)', border: '1px solid rgba(14,158,138,0.35)', borderRadius: 12, padding: '10px 14px', cursor: 'pointer', color: '#4cd8a0', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, transition: 'all 0.2s' }}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: -6, right: -6, background: '#c9a84c', color: '#060d1a', borderRadius: '50%', width: 20, height: 20, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cartCount}
              </span>
            )}
            Cart {cartCount > 0 ? `(${cartCount})` : ''}
          </button>
        </header>

        {/* ── Search ── */}
        <div style={{ maxWidth: 480, margin: '0 auto 1.5rem', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(14,158,138,0.6)', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '12px 20px 12px 46px', borderRadius: 40, border: '1px solid rgba(14,158,138,0.28)', background: 'rgba(6,13,26,0.7)', color: '#e8f4ff', fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', backdropFilter: 'blur(8px)', transition: 'border-color 0.2s' }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(14,158,138,0.6)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(14,158,138,0.1)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(14,158,138,0.28)'; e.currentTarget.style.boxShadow = 'none'; }}
          />
        </div>

        {/* ── Category Pills ── */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const isHov = hoveredCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                onMouseEnter={() => setHoveredCat(cat)}
                onMouseLeave={() => setHoveredCat(null)}
                style={{
                  padding: '7px 18px',
                  borderRadius: 20,
                  border: isActive ? '1px solid rgba(14,158,138,0.7)' : '1px solid rgba(14,158,138,0.22)',
                  background: isActive ? 'rgba(14,158,138,0.22)' : isHov ? 'rgba(14,158,138,0.1)' : 'rgba(6,13,26,0.6)',
                  color: isActive ? '#4cd8a0' : '#7ab8d4',
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit',
                  letterSpacing: isActive ? '0.5px' : 0,
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── Product Grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.1rem' }}>
          {filteredProducts.map((product) => {
            const hovered = hoveredCard === product.id;
            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: hovered ? 'rgba(16,36,58,0.95)' : 'rgba(13,33,55,0.72)',
                  border: `1px solid ${hovered ? 'rgba(14,158,138,0.5)' : 'rgba(14,158,138,0.18)'}`,
                  borderRadius: 16,
                  overflow: 'hidden',
                  transition: 'transform 0.22s ease, border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease',
                  transform: hovered ? 'translateY(-5px)' : 'none',
                  boxShadow: hovered ? '0 16px 40px rgba(14,158,138,0.12), 0 2px 8px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.25)',
                  backdropFilter: 'blur(10px)',
                  cursor: 'default',
                  position: 'relative',
                }}
              >
                {/* top shimmer on hover */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(14,158,138,0.7), rgba(201,168,76,0.5), transparent)', opacity: hovered ? 1 : 0, transition: 'opacity 0.22s', zIndex: 2 }} />

                {/* Image */}
                <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                  {product.badge && (
                    <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 2, background: badgeColor[product.badge] ?? 'rgba(14,158,138,0.85)', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', padding: '4px 10px', borderRadius: 20, backdropFilter: 'blur(4px)' }}>
                      {product.badge}
                    </div>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
                  />
                  {/* image overlay */}
                  <div style={{ position: 'absolute', inset: 0, background: hovered ? 'rgba(6,13,26,0.25)' : 'rgba(6,13,26,0.1)', transition: 'background 0.3s' }} />
                </div>

                {/* Card content */}
                <div style={{ padding: '1rem 1.1rem 1.2rem' }}>
                  {/* category tag */}
                  <div style={{ fontSize: 10, letterSpacing: 2, color: '#4cd8a0', fontWeight: 700, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {product.category}
                    <div style={{ flex: 1, height: 1, background: 'rgba(14,158,138,0.18)' }} />
                  </div>

                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#cce7f8', margin: '0 0 0.6rem', lineHeight: 1.4 }}>
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: '0.9rem' }}>
                    <Star size={13} fill="#c9a84c" color="#c9a84c" />
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#c9a84c' }}>{product.rating}</span>
                    <span style={{ fontSize: 12, color: 'rgba(122,184,212,0.6)' }}>({product.reviews} reviews)</span>
                  </div>

                  {/* Price + Add */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#e8f4ff' }}>
                      ${product.price.toFixed(2)}
                    </div>
                    <button
                      onClick={() => setCartCount((p) => p + 1)}
                      aria-label="Add to cart"
                      style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(14,158,138,0.18)', border: '1px solid rgba(14,158,138,0.4)', borderRadius: 10, padding: '8px 14px', color: '#4cd8a0', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', transition: 'all 0.2s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(14,158,138,0.32)'; e.currentTarget.style.borderColor = 'rgba(14,158,138,0.7)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(14,158,138,0.18)'; e.currentTarget.style.borderColor = 'rgba(14,158,138,0.4)'; }}
                    >
                      <Plus size={16} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'rgba(122,184,212,0.5)' }}>
            <ShoppingBag size={48} style={{ margin: '0 auto 16px', display: 'block', opacity: 0.4 }} />
            <p style={{ fontSize: 17 }}>No products found.</p>
          </div>
        )}

      </div>

      <style>{`
        input::placeholder { color: rgba(122,184,212,0.4); }
      `}</style>
    </div>
  );
}