'use client';

import { useEffect, useState, useRef } from 'react';
import { ShoppingBag, Star, Plus, Search, X, Trash2, Minus, ShoppingCart } from 'lucide-react';
import type { IStore } from '@/models/Store';
import { useRouter } from 'next/navigation';

const CATEGORIES = ['All', 'Prayer Mats', 'Quran', 'Tasbeeh', 'Attar', 'Caps'];

interface CartItem {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  category: string;
  qty: number;
}

function getCartFromStorage(): CartItem[] {
  try {
    const saved = localStorage.getItem('cart_items');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(cart: CartItem[]) {
  localStorage.setItem('cart_items', JSON.stringify(cart));
}

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const [products, setProducts] = useState<IStore[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    setCart(getCartFromStorage());
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCartOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [cartOpen]);

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

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const addToCart = (product: any) => {
    const id = product._id?.toString() ?? product.title;
    setAddedId(id);
    setTimeout(() => setAddedId(null), 800);
    setCart((prev) => {
      const existing = prev.find((i) => i._id === id);
      const updated = existing
        ? prev.map((i) => i._id === id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { _id: id, title: product.title, price: Number(product.price), imageUrl: product.imageUrl, category: product.category, qty: 1 }];
      saveCartToStorage(updated);
      return updated;
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const updated = prev.filter((i) => i._id !== id);
      saveCartToStorage(updated);
      return updated;
    });
  };

  const changeQty = (id: string, delta: number) => {
    setCart((prev) => {
      const updated = prev
        .map((i) => i._id === id ? { ...i, qty: i.qty + delta } : i)
        .filter((i) => i.qty > 0);
      saveCartToStorage(updated);
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart_items');
  };

  const filteredProducts = products.filter((p) => {
    const item = p as any;
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#060d1a',
        fontFamily: "'Tajawal', 'Segoe UI', sans-serif",
        color: 'rgba(255,255,255,0.92)',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Background orbs */}
      <div style={{ position: 'fixed', top: '-100px', left: '-150px', width: 500, height: 500, borderRadius: '50%', filter: 'blur(80px)', background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', top: '30%', right: '-100px', width: 400, height: 400, borderRadius: '50%', filter: 'blur(80px)', background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '10%', left: '20%', width: 350, height: 350, borderRadius: '50%', filter: 'blur(80px)', background: 'radial-gradient(circle, rgba(14,158,138,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* ── CART OVERLAY ── */}
      {cartOpen && (
        <div
          ref={overlayRef}
          onClick={(e) => { if (e.target === overlayRef.current) setCartOpen(false); }}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(4,9,20,0.72)',
            backdropFilter: 'blur(4px)',
            zIndex: 1100,
            animation: 'fadeIn 0.22s ease',
          }}
        />
      )}

      {/* ── CART SLIDE PANEL ── */}
      <div
        style={{
          position: 'fixed',
          top: 0, right: 0, bottom: 0,
          width: 'min(420px, 100vw)',
          background: 'linear-gradient(160deg, #0a1220 0%, #060d1a 100%)',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          zIndex: 1101,
          display: 'flex',
          flexDirection: 'column',
          transform: cartOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: cartOpen ? '-20px 0 60px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        {/* Panel top shimmer */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(14,158,138,0.6), rgba(201,168,76,0.4), transparent)' }} />

        {/* Cart Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.4rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShoppingCart size={22} color="#0e9e8a" />
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>Your Cart</span>
            {cartCount > 0 && (
              <span style={{ background: 'rgba(14,158,138,0.15)', border: '1px solid rgba(14,158,138,0.35)', color: '#0e9e8a', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>
                {cartCount} item{cartCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                title="Clear cart"
                style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', color: '#f87171', fontSize: 12, fontFamily: 'inherit', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(248,113,113,0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(248,113,113,0.1)'; }}
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setCartOpen(false)}
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '8px', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {cart.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, color: 'rgba(255,255,255,0.25)', paddingTop: '4rem' }}>
              <ShoppingBag size={56} style={{ opacity: 0.25 }} />
              <p style={{ fontSize: 15, margin: 0 }}>Your cart is empty</p>
              <button
                onClick={() => setCartOpen(false)}
                style={{ marginTop: 8, background: 'rgba(14,158,138,0.15)', border: '1px solid rgba(14,158,138,0.35)', borderRadius: 10, padding: '9px 20px', color: '#0e9e8a', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', transition: 'all 0.2s' }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                style={{ display: 'flex', gap: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '0.75rem', transition: 'border-color 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(14,158,138,0.3)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                <div style={{ width: 64, height: 64, borderRadius: 8, overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,0.08)' }}>
                  <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.92)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</p>
                  <p style={{ margin: '0 0 8px', fontSize: 10, color: '#0e9e8a', letterSpacing: 1, textTransform: 'uppercase' }}>{item.category}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button
                        onClick={() => changeQty(item._id, -1)}
                        style={{ width: 24, height: 24, borderRadius: 6, border: '1px solid rgba(14,158,138,0.35)', background: 'rgba(14,158,138,0.1)', color: '#0e9e8a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(14,158,138,0.25)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(14,158,138,0.1)'; }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.92)', minWidth: 16, textAlign: 'center' }}>{item.qty}</span>
                      <button
                        onClick={() => changeQty(item._id, 1)}
                        style={{ width: 24, height: 24, borderRadius: 6, border: '1px solid rgba(14,158,138,0.35)', background: 'rgba(14,158,138,0.1)', color: '#0e9e8a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(14,158,138,0.25)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(14,158,138,0.1)'; }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>${(item.price * item.qty).toFixed(2)}</span>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(248,113,113,0.6)', padding: 4, display: 'flex', alignItems: 'center', transition: 'color 0.15s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#f87171'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(248,113,113,0.6)'; }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '1.2rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(6,13,26,0.6)', backdropFilter: 'blur(8px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>Subtotal</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>${cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => { router.push('/Checkout'); setCartOpen(false); }}
              style={{ width: '100%', padding: '13px', borderRadius: 12, background: 'linear-gradient(135deg, #0e9e8a, #07b89f)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: 0.5, transition: 'all 0.2s', boxShadow: '0 4px 20px rgba(14,158,138,0.3)' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(14,158,138,0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(14,158,138,0.3)'; }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.25rem 4rem', position: 'relative', zIndex: 1 }}>

        {/* ── Header ── FIXED: flex column on mobile, row on desktop */}
        <header style={{
          padding: '2.2rem 0 1.8rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          {/* Row 1: Badge + Cart button on same line */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            {/* Badge */}
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(14,158,138,0.15)',
              border: '1px solid rgba(14,158,138,0.3)',
              color: '#0e9e8a',
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              padding: '5px 14px',
              borderRadius: 20,
              flexShrink: 0,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0e9e8a', display: 'inline-block' }} />
              Islamic Store
            </span>

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              style={{
                position: 'relative',
                background: cartCount > 0 ? 'rgba(14,158,138,0.2)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${cartCount > 0 ? 'rgba(14,158,138,0.4)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 12,
                padding: '10px 14px',
                cursor: 'pointer',
                color: cartCount > 0 ? '#0e9e8a' : 'rgba(255,255,255,0.45)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                fontWeight: 600,
                transition: 'all 0.2s',
                fontFamily: 'inherit',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(14,158,138,0.2)';
                e.currentTarget.style.borderColor = 'rgba(14,158,138,0.4)';
                e.currentTarget.style.color = '#0e9e8a';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = cartCount > 0 ? 'rgba(14,158,138,0.2)' : 'rgba(255,255,255,0.04)';
                e.currentTarget.style.borderColor = cartCount > 0 ? 'rgba(14,158,138,0.4)' : 'rgba(255,255,255,0.08)';
                e.currentTarget.style.color = cartCount > 0 ? '#0e9e8a' : 'rgba(255,255,255,0.45)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: -7, right: -7,
                  background: '#c9a84c',
                  color: '#060d1a',
                  borderRadius: '50%',
                  width: 21, height: 21,
                  fontSize: 11, fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(201,168,76,0.4)',
                  animation: 'popIn 0.25s ease',
                }}>
                  {cartCount}
                </span>
              )}
              Cart{cartCount > 0 ? ` (${cartCount})` : ''}
            </button>
          </div>

          {/* Row 2: Title centered on its own line */}
          <h1 style={{
            fontSize: 'clamp(1.4rem, 5vw, 2rem)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.92)',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}>
            <ShoppingBag size={26} color="#0e9e8a" />
            Islamic Store
          </h1>
        </header>

        {/* ── Search ── */}
        <div style={{ maxWidth: 480, margin: '0 auto 1.5rem', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(14,158,138,0.6)', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '12px 20px 12px 46px', borderRadius: 40, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.92)', fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', backdropFilter: 'blur(16px)', transition: 'border-color 0.2s' }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(14,158,138,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(14,158,138,0.08)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
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
                  padding: '7px 18px', borderRadius: 20,
                  border: isActive ? '1px solid rgba(14,158,138,0.5)' : '1px solid rgba(255,255,255,0.08)',
                  background: isActive ? 'linear-gradient(135deg, #0e9e8a, #07b89f)' : isHov ? 'rgba(14,158,138,0.1)' : 'rgba(255,255,255,0.04)',
                  color: isActive ? '#fff' : isHov ? '#0e9e8a' : 'rgba(255,255,255,0.45)',
                  fontSize: 13, fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer', transition: 'all 0.2s',
                  fontFamily: 'inherit',
                  boxShadow: isActive ? '0 3px 12px rgba(14,158,138,0.3)' : 'none',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── Loading State ── */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'rgba(255,255,255,0.25)' }}>
            <div style={{ width: 40, height: 40, border: '3px solid rgba(14,158,138,0.15)', borderTop: '3px solid #0e9e8a', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ fontSize: 15 }}>Loading products...</p>
          </div>
        )}

        {/* ── Product Grid ── */}
        {!loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.1rem' }}>
            {filteredProducts.map((product, index) => {
              const item = product as any;
              const id = item._id?.toString() ?? item.title;
              const key = item._id ?? index;
              const hovered = hoveredCard === index;
              const justAdded = addedId === id;

              return (
                <div
                  key={key}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: hovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${hovered ? 'rgba(14,158,138,0.3)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 18, overflow: 'hidden',
                    transition: 'transform 0.22s ease, border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease',
                    transform: hovered ? 'translateY(-5px)' : 'none',
                    boxShadow: hovered ? '0 8px 32px rgba(14,158,138,0.12), 0 2px 0 rgba(255,255,255,0.04) inset' : '0 2px 16px rgba(0,0,0,0.15)',
                    backdropFilter: 'blur(12px)',
                    cursor: 'default', position: 'relative',
                  }}
                >
                  {/* top shimmer on hover */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(14,158,138,0.6), transparent)', opacity: hovered ? 1 : 0, transition: 'opacity 0.22s', zIndex: 2 }} />

                  {/* Image */}
                  <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                    <img src={item.imageUrl} alt={item.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: hovered ? 'rgba(6,13,26,0.25)' : 'rgba(6,13,26,0.1)', transition: 'background 0.3s' }} />
                  </div>

                  {/* Card content */}
                  <div style={{ padding: '1rem 1.1rem 1.2rem' }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, color: '#0e9e8a', fontWeight: 700, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6, textTransform: 'uppercase' }}>
                      {item.category}
                      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
                    </div>

                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'rgba(255,255,255,0.92)', margin: '0 0 0.6rem', lineHeight: 1.4 }}>{item.title}</h3>

                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: '0 0 0.9rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.description}
                    </p>

                    {/* Price + Add */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#c9a84c' }}>${Number(item.price).toFixed(2)}</div>
                      <button
                        onClick={() => { addToCart(item); setCartOpen(true); }}
                        aria-label="Add to cart"
                        style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                          background: justAdded ? 'linear-gradient(135deg, #0e9e8a, #07b89f)' : 'rgba(14,158,138,0.15)',
                          border: `1px solid ${justAdded ? 'transparent' : 'rgba(14,158,138,0.35)'}`,
                          borderRadius: 10, padding: '8px 14px',
                          color: justAdded ? '#fff' : '#0e9e8a',
                          cursor: 'pointer', fontSize: 13, fontWeight: 600,
                          fontFamily: 'inherit', transition: 'all 0.2s',
                          transform: justAdded ? 'scale(0.95)' : 'scale(1)',
                          boxShadow: justAdded ? '0 3px 12px rgba(14,158,138,0.3)' : 'none',
                        }}
                        onMouseEnter={(e) => { if (!justAdded) { e.currentTarget.style.background = 'rgba(14,158,138,0.25)'; e.currentTarget.style.borderColor = 'rgba(14,158,138,0.5)'; } }}
                        onMouseLeave={(e) => { if (!justAdded) { e.currentTarget.style.background = 'rgba(14,158,138,0.15)'; e.currentTarget.style.borderColor = 'rgba(14,158,138,0.35)'; } }}
                      >
                        <Plus size={16} />
                        {justAdded ? 'Added!' : 'Add'}
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
          <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'rgba(255,255,255,0.25)' }}>
            <ShoppingBag size={48} style={{ margin: '0 auto 16px', display: 'block', opacity: 0.3 }} />
            <p style={{ fontSize: 17 }}>No products found.</p>
          </div>
        )}

      </div>

      <style>{`
        input::placeholder { color: rgba(255,255,255,0.25); }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.2); } 100% { transform: scale(1); opacity: 1; } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(14,158,138,0.3); border-radius: 4px; }
      `}</style>
    </div>
  );
}