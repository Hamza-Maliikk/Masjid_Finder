'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag, Star, Plus, Search } from 'lucide-react';
import type { IStore } from '@/models/Store';

const CATEGORIES = ['All', 'Prayer Mats', 'Quran', 'Tasbeeh', 'Attar', 'Caps'];

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const [products, setProducts] = useState<IStore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/store')
      .then((r) => r.json())
      .then((json) => {
        const data: IStore[] = json.data || [];
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch store data:', err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((p) => {
    const item = p as any;
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    // FIX: search karo 'title' field se, 'name' se nahi
    const matchSearch = item.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div
      style={{
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
      }}
    >
      {/* Glow blobs */}
      <div style={{ position: 'fixed', top: -80, right: -80, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,158,138,0.14) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: 0, left: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,158,138,0.09) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', top: '30%', right: -40, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.25rem 4rem', position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2.2rem 0 1.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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

        {/* ── Loading State ── */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'rgba(122,184,212,0.5)' }}>
            <div style={{ width: 40, height: 40, border: '3px solid rgba(14,158,138,0.2)', borderTop: '3px solid #4cd8a0', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ fontSize: 15 }}>Loading products...</p>
          </div>
        )}

        {/* ── Product Grid ── */}
        {!loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.1rem' }}>
            {filteredProducts.map((product, index) => {
              const item = product as any;
              const key = item._id ?? index;
              const hovered = hoveredCard === index;

              return (
                <div
                  key={key}
                  onMouseEnter={() => setHoveredCard(index)}
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
                  {/* FIX: imageUrl use karo, image nahi */}
                  <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: hovered ? 'rgba(6,13,26,0.25)' : 'rgba(6,13,26,0.1)', transition: 'background 0.3s' }} />
                  </div>

                  {/* Card content */}
                  <div style={{ padding: '1rem 1.1rem 1.2rem' }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, color: '#4cd8a0', fontWeight: 700, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                      {/* FIX: category field seedha use karo */}
                      {item.category}
                      <div style={{ flex: 1, height: 1, background: 'rgba(14,158,138,0.18)' }} />
                    </div>

                    {/* FIX: title field use karo, name nahi */}
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#cce7f8', margin: '0 0 0.6rem', lineHeight: 1.4 }}>
                      {item.title}
                    </h3>

                    {/* Description — truncated to 2 lines */}
                    <p style={{
                      fontSize: 12,
                      color: 'rgba(122,184,212,0.65)',
                      margin: '0 0 0.9rem',
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {item.description}
                    </p>

                    {/* Price + Add */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {/* FIX: price field directly use karo */}
                      <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#e8f4ff' }}>
                        ${Number(item.price).toFixed(2)}
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
        )}

        {/* Empty state */}
        {!loading && filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'rgba(122,184,212,0.5)' }}>
            <ShoppingBag size={48} style={{ margin: '0 auto 16px', display: 'block', opacity: 0.4 }} />
            <p style={{ fontSize: 17 }}>No products found.</p>
          </div>
        )}

      </div>

      <style>{`
        input::placeholder { color: rgba(122,184,212,0.4); }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}