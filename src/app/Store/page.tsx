'use client';

import { useEffect, useState, useRef } from 'react';
import { ShoppingBag, Star, Plus, Search, X, Trash2, Minus, ShoppingCart } from 'lucide-react';
import type { IStore } from '@/models/Store';

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

  // Load cart from localStorage on mount
  useEffect(() => {
    setCart(getCartFromStorage());
  }, []);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCartOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Prevent body scroll when cart is open
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

      {/* ── CART OVERLAY ── */}
      {cartOpen && (
        <div
          ref={overlayRef}
          onClick={(e) => { if (e.target === overlayRef.current) setCartOpen(false); }}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(4,9,20,0.72)',
            backdropFilter: 'blur(4px)',
            zIndex: 100,
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
          background: 'linear-gradient(160deg, #0a1628 0%, #07111f 100%)',
          borderLeft: '1px solid rgba(14,158,138,0.22)',
          zIndex: 101,
          display: 'flex',
          flexDirection: 'column',
          transform: cartOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: cartOpen ? '-20px 0 60px rgba(0,0,0,0.5), -2px 0 0 rgba(14,158,138,0.1)' : 'none',
        }}
      >
        {/* Panel top shimmer */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(14,158,138,0.7), rgba(201,168,76,0.5), transparent)' }} />

        {/* Cart Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.4rem 1.5rem', borderBottom: '1px solid rgba(14,158,138,0.14)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShoppingCart size={22} color="#4cd8a0" />
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#e8f4ff' }}>Your Cart</span>
            {cartCount > 0 && (
              <span style={{ background: 'rgba(14,158,138,0.18)', border: '1px solid rgba(14,158,138,0.4)', color: '#4cd8a0', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>
                {cartCount} item{cartCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                title="Clear cart"
                style={{ background: 'rgba(220,60,60,0.1)', border: '1px solid rgba(220,60,60,0.25)', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', color: 'rgba(220,100,100,0.8)', fontSize: 12, fontFamily: 'inherit', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(220,60,60,0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(220,60,60,0.1)'; }}
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setCartOpen(false)}
              style={{ background: 'rgba(14,158,138,0.1)', border: '1px solid rgba(14,158,138,0.25)', borderRadius: 10, padding: '8px', cursor: 'pointer', color: '#4cd8a0', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(14,158,138,0.22)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(14,158,138,0.1)'; }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {cart.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, color: 'rgba(122,184,212,0.4)', paddingTop: '4rem' }}>
              <ShoppingBag size={56} style={{ opacity: 0.25 }} />
              <p style={{ fontSize: 15, margin: 0 }}>Your cart is empty</p>
              <button
                onClick={() => setCartOpen(false)}
                style={{ marginTop: 8, background: 'rgba(14,158,138,0.15)', border: '1px solid rgba(14,158,138,0.35)', borderRadius: 10, padding: '9px 20px', color: '#4cd8a0', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', transition: 'all 0.2s' }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                style={{ display: 'flex', gap: 12, background: 'rgba(14,158,138,0.06)', border: '1px solid rgba(14,158,138,0.14)', borderRadius: 12, padding: '0.75rem', transition: 'border-color 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(14,158,138,0.3)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(14,158,138,0.14)'; }}
              >
                {/* Image */}
                <div style={{ width: 64, height: 64, borderRadius: 8, overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(14,158,138,0.18)' }}>
                  <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 600, color: '#cce7f8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</p>
                  <p style={{ margin: '0 0 8px', fontSize: 10, color: '#4cd8a0', letterSpacing: 1, textTransform: 'uppercase' }}>{item.category}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Qty controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button
                        onClick={() => changeQty(item._id, -1)}
                        style={{ width: 24, height: 24, borderRadius: 6, border: '1px solid rgba(14,158,138,0.35)', background: 'rgba(14,158,138,0.1)', color: '#4cd8a0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(14,158,138,0.25)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(14,158,138,0.1)'; }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#e8f4ff', minWidth: 16, textAlign: 'center' }}>{item.qty}</span>
                      <button
                        onClick={() => changeQty(item._id, 1)}
                        style={{ width: 24, height: 24, borderRadius: 6, border: '1px solid rgba(14,158,138,0.35)', background: 'rgba(14,158,138,0.1)', color: '#4cd8a0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(14,158,138,0.25)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(14,158,138,0.1)'; }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e8f4ff' }}>${(item.price * item.qty).toFixed(2)}</span>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(220,80,80,0.6)', padding: 4, display: 'flex', alignItems: 'center', transition: 'color 0.15s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(220,80,80,1)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(220,80,80,0.6)'; }}
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
          <div style={{ padding: '1.2rem 1.5rem', borderTop: '1px solid rgba(14,158,138,0.14)', background: 'rgba(6,13,26,0.5)', backdropFilter: 'blur(8px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', alignItems: 'center' }}>
              <span style={{ color: 'rgba(122,184,212,0.7)', fontSize: 14 }}>Subtotal</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#e8f4ff' }}>${cartTotal.toFixed(2)}</span>
            </div>
            <button
              style={{
                width: '100%', padding: '13px', borderRadius: 12,
                background: 'linear-gradient(135deg, rgba(14,158,138,0.85) 0%, rgba(14,158,138,0.6) 100%)',
                border: '1px solid rgba(14,158,138,0.6)',
                color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                fontFamily: 'inherit', letterSpacing: 0.5, transition: 'all 0.2s',
                boxShadow: '0 4px 20px rgba(14,158,138,0.25)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(14,158,138,1) 0%, rgba(14,158,138,0.8) 100%)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(14,158,138,0.85) 0%, rgba(14,158,138,0.6) 100%)'; e.currentTarget.style.transform = 'none'; }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* ── MAIN CONTENT ── */}
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

          {/* Cart Button */}
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
            style={{
              position: 'relative',
              background: cartCount > 0 ? 'rgba(14,158,138,0.2)' : 'rgba(14,158,138,0.12)',
              border: `1px solid ${cartCount > 0 ? 'rgba(14,158,138,0.55)' : 'rgba(14,158,138,0.35)'}`,
              borderRadius: 12, padding: '10px 14px', cursor: 'pointer',
              color: '#4cd8a0', display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 14, fontWeight: 600, transition: 'all 0.2s',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(14,158,138,0.28)'; e.currentTarget.style.borderColor = 'rgba(14,158,138,0.7)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = cartCount > 0 ? 'rgba(14,158,138,0.2)' : 'rgba(14,158,138,0.12)'; e.currentTarget.style.borderColor = cartCount > 0 ? 'rgba(14,158,138,0.55)' : 'rgba(14,158,138,0.35)'; e.currentTarget.style.transform = 'none'; }}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: -7, right: -7, background: '#c9a84c', color: '#060d1a', borderRadius: '50%', width: 21, height: 21, fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(201,168,76,0.4)', animation: 'popIn 0.25s ease' }}>
                {cartCount}
              </span>
            )}
            Cart{cartCount > 0 ? ` (${cartCount})` : ''}
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
                style={{ padding: '7px 18px', borderRadius: 20, border: isActive ? '1px solid rgba(14,158,138,0.7)' : '1px solid rgba(14,158,138,0.22)', background: isActive ? 'rgba(14,158,138,0.22)' : isHov ? 'rgba(14,158,138,0.1)' : 'rgba(6,13,26,0.6)', color: isActive ? '#4cd8a0' : '#7ab8d4', fontSize: 13, fontWeight: isActive ? 600 : 400, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit', letterSpacing: isActive ? '0.5px' : 0 }}
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
              const id = item._id?.toString() ?? item.title;
              const key = item._id ?? index;
              const hovered = hoveredCard === index;
              const justAdded = addedId === id;

              return (
                <div
                  key={key}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ background: hovered ? 'rgba(16,36,58,0.95)' : 'rgba(13,33,55,0.72)', border: `1px solid ${hovered ? 'rgba(14,158,138,0.5)' : 'rgba(14,158,138,0.18)'}`, borderRadius: 16, overflow: 'hidden', transition: 'transform 0.22s ease, border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease', transform: hovered ? 'translateY(-5px)' : 'none', boxShadow: hovered ? '0 16px 40px rgba(14,158,138,0.12), 0 2px 8px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.25)', backdropFilter: 'blur(10px)', cursor: 'default', position: 'relative' }}
                >
                  {/* top shimmer on hover */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(14,158,138,0.7), rgba(201,168,76,0.5), transparent)', opacity: hovered ? 1 : 0, transition: 'opacity 0.22s', zIndex: 2 }} />

                  {/* Image */}
                  <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                    <img src={item.imageUrl} alt={item.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: hovered ? 'rgba(6,13,26,0.25)' : 'rgba(6,13,26,0.1)', transition: 'background 0.3s' }} />
                  </div>

                  {/* Card content */}
                  <div style={{ padding: '1rem 1.1rem 1.2rem' }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, color: '#4cd8a0', fontWeight: 700, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                      {item.category}
                      <div style={{ flex: 1, height: 1, background: 'rgba(14,158,138,0.18)' }} />
                    </div>

                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#cce7f8', margin: '0 0 0.6rem', lineHeight: 1.4 }}>{item.title}</h3>

                    <p style={{ fontSize: 12, color: 'rgba(122,184,212,0.65)', margin: '0 0 0.9rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.description}
                    </p>

                    {/* Price + Add */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#e8f4ff' }}>${Number(item.price).toFixed(2)}</div>
                      <button
                        onClick={() => { addToCart(item); setCartOpen(true); }}
                        aria-label="Add to cart"
                        style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                          background: justAdded ? 'rgba(14,158,138,0.45)' : 'rgba(14,158,138,0.18)',
                          border: `1px solid ${justAdded ? 'rgba(14,158,138,0.8)' : 'rgba(14,158,138,0.4)'}`,
                          borderRadius: 10, padding: '8px 14px',
                          color: '#4cd8a0', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                          fontFamily: 'inherit', transition: 'all 0.2s',
                          transform: justAdded ? 'scale(0.95)' : 'scale(1)',
                        }}
                        onMouseEnter={(e) => { if (!justAdded) { e.currentTarget.style.background = 'rgba(14,158,138,0.32)'; e.currentTarget.style.borderColor = 'rgba(14,158,138,0.7)'; } }}
                        onMouseLeave={(e) => { if (!justAdded) { e.currentTarget.style.background = 'rgba(14,158,138,0.18)'; e.currentTarget.style.borderColor = 'rgba(14,158,138,0.4)'; } }}
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
          <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'rgba(122,184,212,0.5)' }}>
            <ShoppingBag size={48} style={{ margin: '0 auto 16px', display: 'block', opacity: 0.4 }} />
            <p style={{ fontSize: 17 }}>No products found.</p>
          </div>
        )}

      </div>

      <style>{`
        input::placeholder { color: rgba(122,184,212,0.4); }
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