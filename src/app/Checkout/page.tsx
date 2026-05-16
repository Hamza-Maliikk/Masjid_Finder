'use client';
import { useState } from 'react';
import { ShoppingBag, User, Mail, MapPin, Phone, CreditCard, Lock, CheckCircle, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  paymentMethod: 'cod' | 'card';
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
}


export default function CheckoutPage() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', address: '', city: '', zip: '',
    paymentMethod: 'cod', cardNumber: '', cardExpiry: '', cardCvv: '',
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
     await fetch('/api/sendorder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
  setLoading(false);
  setSubmitted(true);
  };
  const router = useRouter();

  const backStore = () => {
    setSubmitted(false);
    setForm({ name: '', email: '', phone: '', address: '', city: '', zip: '', paymentMethod: 'cod', cardNumber: '', cardExpiry: '', cardCvv: '' });
    router.push('/Store');
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    padding: '13px 16px 13px 44px',
    borderRadius: 12,
    border: `1px solid ${focused === name ? 'rgba(14,158,138,0.5)' : 'rgba(255,255,255,0.08)'}`,
    background: focused === name ? 'rgba(14,158,138,0.06)' : 'rgba(255,255,255,0.04)',
    color: 'rgba(255,255,255,0.92)',
    fontSize: 14,
    fontFamily: "'Tajawal','Segoe UI',sans-serif",
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
    boxShadow: focused === name ? '0 0 0 3px rgba(14,158,138,0.08)' : 'none',
  });

  const labelStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
    marginBottom: 6, display: 'block',
  };

  const cardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20, padding: '1.5rem',
    backdropFilter: 'blur(16px)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
    position: 'relative', overflow: 'hidden',
  };

  const sectionIconStyle = (color: string): React.CSSProperties => ({
    width: 32, height: 32, borderRadius: 8,
    background: `rgba(${color},0.15)`,
    border: `1px solid rgba(${color},0.25)`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  });

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#060d1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Tajawal','Segoe UI',sans-serif", position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'fixed', top: '-100px', left: '-150px', width: 500, height: 500, borderRadius: '50%', filter: 'blur(80px)', background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'fixed', bottom: '10%', right: '-100px', width: 400, height: 400, borderRadius: '50%', filter: 'blur(80px)', background: 'radial-gradient(circle, rgba(14,158,138,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, backdropFilter: 'blur(16px)', maxWidth: 420, width: '90%', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(14,158,138,0.6), rgba(201,168,76,0.4), transparent)', borderRadius: '24px 24px 0 0' }} />
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(14,158,138,0.15)', border: '2px solid rgba(14,158,138,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 0 30px rgba(14,158,138,0.2)' }}>
            <CheckCircle size={36} color="#0e9e8a" />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'rgba(255,255,255,0.92)', margin: '0 0 0.5rem' }}>Order Placed!</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.7, margin: '0 0 0.4rem' }}>
            Jazak Allah Khair, <strong style={{ color: '#c9a84c' }}>{form.name}</strong>!
          </p>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, lineHeight: 1.7, margin: '0 0 2rem' }}>
            Your order has been received. We will contact you at <strong style={{ color: 'rgba(255,255,255,0.6)' }}>{form.email}</strong> shortly.
          </p>
          <button
            onClick={backStore}
            style={{ background: 'linear-gradient(135deg, #0e9e8a, #07b89f)', border: 'none', color: '#fff', borderRadius: 12, padding: '12px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(14,158,138,0.3)' }}
          >
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#060d1a', fontFamily: "'Tajawal','Segoe UI',sans-serif", color: 'rgba(255,255,255,0.92)', position: 'relative', overflowX: 'hidden' }}>
      {/* Orbs */}
      <div style={{ position: 'fixed', top: '-100px', left: '-150px', width: 500, height: 500, borderRadius: '50%', filter: 'blur(80px)', background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', top: '30%', right: '-100px', width: 400, height: 400, borderRadius: '50%', filter: 'blur(80px)', background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '10%', left: '20%', width: 350, height: 350, borderRadius: '50%', filter: 'blur(80px)', background: 'radial-gradient(circle, rgba(14,158,138,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1.25rem 4rem', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <header style={{ textAlign: 'center', padding: '2rem 0 2.5rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(14,158,138,0.15)', border: '1px solid rgba(14,158,138,0.3)', color: '#0e9e8a', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 14px', borderRadius: 20, marginBottom: '1rem' }}>
            <Lock size={10} /> Secure Checkout
          </span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.92)', margin: '0 0 0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <ShoppingBag size={26} color="#0e9e8a" /> Complete Your Order
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, margin: 0 }}>Fill in your details below to place your order</p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Personal Info */}
          <div style={cardStyle}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.2rem' }}>
              <div style={sectionIconStyle('14,158,138')}>
                <User size={16} color="#0e9e8a" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Personal Info</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: focused === 'name' ? '#0e9e8a' : 'rgba(255,255,255,0.2)', pointerEvents: 'none' }} />
                  <input required placeholder="e.g. Ahmed Khan" value={form.name} onChange={set('name')} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} style={inputStyle('name')} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: focused === 'email' ? '#0e9e8a' : 'rgba(255,255,255,0.2)', pointerEvents: 'none' }} />
                  <input required type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} style={inputStyle('email')} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: focused === 'phone' ? '#0e9e8a' : 'rgba(255,255,255,0.2)', pointerEvents: 'none' }} />
                  <input required type="tel" placeholder="+92 300 0000000" value={form.phone} onChange={set('phone')} onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} style={inputStyle('phone')} />
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div style={cardStyle}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.2rem' }}>
              <div style={sectionIconStyle('201,168,76')}>
                <MapPin size={16} color="#c9a84c" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Shipping Address</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Street Address</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: focused === 'address' ? '#0e9e8a' : 'rgba(255,255,255,0.2)', pointerEvents: 'none' }} />
                  <input required placeholder="House #, Street, Area" value={form.address} onChange={set('address')} onFocus={() => setFocused('address')} onBlur={() => setFocused(null)} style={inputStyle('address')} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={labelStyle}>City</label>
                  <div style={{ position: 'relative' }}>
                    <MapPin size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: focused === 'city' ? '#0e9e8a' : 'rgba(255,255,255,0.2)', pointerEvents: 'none' }} />
                    <input required placeholder="Karachi" value={form.city} onChange={set('city')} onFocus={() => setFocused('city')} onBlur={() => setFocused(null)} style={inputStyle('city')} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>ZIP Code</label>
                  <div style={{ position: 'relative' }}>
                    <MapPin size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: focused === 'zip' ? '#0e9e8a' : 'rgba(255,255,255,0.2)', pointerEvents: 'none' }} />
                    <input placeholder="75000" value={form.zip} onChange={set('zip')} onFocus={() => setFocused('zip')} onBlur={() => setFocused(null)} style={inputStyle('zip')} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div style={cardStyle}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.2rem' }}>
              <div style={sectionIconStyle('14,158,138')}>
                <CreditCard size={16} color="#0e9e8a" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Payment Method</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              {(['cod'] as const).map((method) => (
                <button key={method} type="button" onClick={() => setForm((p) => ({ ...p, paymentMethod: method }))}
                  style={{ padding: '12px', borderRadius: 12, border: `1px solid ${form.paymentMethod === method ? 'rgba(14,158,138,0.5)' : 'rgba(255,255,255,0.08)'}`, background: form.paymentMethod === method ? 'rgba(14,158,138,0.15)' : 'rgba(255,255,255,0.02)', color: form.paymentMethod === method ? '#0e9e8a' : 'rgba(255,255,255,0.3)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: form.paymentMethod === method ? '0 0 0 3px rgba(14,158,138,0.08)' : 'none' }}>
                  {'🤝 Cash on Delivery'}
                </button>
              ))}
            </div>

            {form.paymentMethod === 'card' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Card Number</label>
                  <div style={{ position: 'relative' }}>
                    <CreditCard size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: focused === 'cardNumber' ? '#0e9e8a' : 'rgba(255,255,255,0.2)', pointerEvents: 'none' }} />
                    <input placeholder="1234 5678 9012 3456" value={form.cardNumber} onChange={set('cardNumber')} onFocus={() => setFocused('cardNumber')} onBlur={() => setFocused(null)} style={inputStyle('cardNumber')} maxLength={19} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={labelStyle}>Expiry</label>
                    <div style={{ position: 'relative' }}>
                      <CreditCard size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: focused === 'cardExpiry' ? '#0e9e8a' : 'rgba(255,255,255,0.2)', pointerEvents: 'none' }} />
                      <input placeholder="MM / YY" value={form.cardExpiry} onChange={set('cardExpiry')} onFocus={() => setFocused('cardExpiry')} onBlur={() => setFocused(null)} style={inputStyle('cardExpiry')} maxLength={7} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>CVV</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: focused === 'cardCvv' ? '#0e9e8a' : 'rgba(255,255,255,0.2)', pointerEvents: 'none' }} />
                      <input placeholder="•••" value={form.cardCvv} onChange={set('cardCvv')} type="password" onFocus={() => setFocused('cardCvv')} onBlur={() => setFocused(null)} style={inputStyle('cardCvv')} maxLength={4} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {form.paymentMethod === 'cod' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 10 }}>
                <span style={{ fontSize: 18 }}>📦</span>
                <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>Pay when your order arrives at your doorstep. Safe and convenient.</p>
              </div>
            )}
          </div>

          {/* Security note */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>
            <Lock size={12} />
            <span>Your information is encrypted and secure</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '15px', borderRadius: 14, background: loading ? 'rgba(14,158,138,0.4)' : 'linear-gradient(135deg, #0e9e8a, #07b89f)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', letterSpacing: 0.5, transition: 'all 0.2s', boxShadow: loading ? 'none' : '0 4px 20px rgba(14,158,138,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(14,158,138,0.45)'; } }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = loading ? 'none' : '0 4px 20px rgba(14,158,138,0.35)'; }}
          >
            {loading ? (
              <>
                <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                Placing Order...
              </>
            ) : (
              <>Place Order <ChevronRight size={18} /></>
            )}
          </button>

        </form>
      </div>

      <style>{`
        input::placeholder { color: rgba(255,255,255,0.2); }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}