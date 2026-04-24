'use client';

import { useState, useCallback } from 'react';
import styles from './page.module.css';

// ─── DATA ────────────────────────────────────────────────────────────────────
const PRAYER_TIMES = [
  { key: 'fajr',    label: 'Fajr',    time: '05:12' },
  { key: 'sunrise', label: 'Sunrise', time: '06:28' },
  { key: 'zuhr',    label: 'Zuhr',    time: '12:35' },
  { key: 'asr',     label: 'Asr ▸',   time: '16:10', current: true },
  { key: 'maghrib', label: 'Maghrib', time: '18:52' },
  { key: 'isha',    label: 'Isha',    time: '20:14' },
];

const PRAYER_FILTERS = [
  { key: 'fajr',    emoji: '🌙', label: 'Fajr',          time: '05:00 – 06:00' },
  { key: 'zuhr',    emoji: '☀️',  label: 'Zuhr',          time: '12:30 – 13:30' },
  { key: 'asr',     emoji: '🌤️', label: 'Asr',           time: '16:00 – 17:00' },
  { key: 'maghrib', emoji: '🌅', label: 'Maghrib',        time: '18:45 – 19:30' },
  { key: 'juma',    emoji: '🕌', label: 'Juma (Friday)', time: '12:30 – 14:00', full: true },
  { key: 'isha',    emoji: '🌌', label: 'Isha',           time: '20:00 – 21:30', full: true },
];

const MASJID_DB = [
  { name: 'Masjid-e-Tooba',     area: 'Defence Phase 4',    dist: 0.4, cap: '5000+', parking: true,  timings: { fajr:'05:10', zuhr:'12:40', asr:'16:05', maghrib:'18:50', isha:'20:15', juma:'13:00' } },
  { name: 'Memon Masjid',       area: 'Saddar, Karachi',    dist: 0.8, cap: '2000',  parking: false, timings: { fajr:'05:08', zuhr:'12:35', asr:'16:00', maghrib:'18:48', isha:'20:10', juma:'12:30' } },
  { name: 'Masjid Al-Falah',    area: 'Gulshan-e-Iqbal',    dist: 1.1, cap: '1500',  parking: true,  timings: { fajr:'05:12', zuhr:'12:38', asr:'16:08', maghrib:'18:52', isha:'20:18', juma:'13:15' } },
  { name: 'Jamia Masjid Gulzar',area: 'North Nazimabad',    dist: 1.6, cap: '800',   parking: false, timings: { fajr:'05:15', zuhr:'12:42', asr:'16:10', maghrib:'18:53', isha:'20:20', juma:'12:45' } },
  { name: 'Masjid-e-Noor',      area: 'Clifton Block 5',    dist: 1.9, cap: '3000',  parking: true,  timings: { fajr:'05:09', zuhr:'12:36', asr:'16:03', maghrib:'18:49', isha:'20:12', juma:'13:30' } },
  { name: 'Al-Rehman Masjid',   area: 'Bahadurabad',        dist: 2.0, cap: '600',   parking: false, timings: { fajr:'05:11', zuhr:'12:37', asr:'16:06', maghrib:'18:51', isha:'20:16', juma:'12:30' } },
  { name: 'Masjid Al-Huda',     area: 'Gulistan-e-Johar',   dist: 3.1, cap: '1200',  parking: true,  timings: { fajr:'05:13', zuhr:'12:39', asr:'16:07', maghrib:'18:51', isha:'20:17', juma:'13:00' } },
  { name: 'Shah Faisal Masjid', area: 'Shah Faisal Colony', dist: 4.5, cap: '4000',  parking: true,  timings: { fajr:'05:07', zuhr:'12:33', asr:'15:58', maghrib:'18:46', isha:'20:08', juma:'12:15' } },
  { name: 'Masjid-e-Siddiq',    area: 'Orangi Town',        dist: 5.8, cap: '900',   parking: false, timings: { fajr:'05:16', zuhr:'12:44', asr:'16:12', maghrib:'18:55', isha:'20:22', juma:'13:30' } },
  { name: 'Eidgah Masjid',      area: 'Lyari',              dist: 7.2, cap: '8000',  parking: true,  timings: { fajr:'05:05', zuhr:'12:30', asr:'15:55', maghrib:'18:44', isha:'20:05', juma:'12:00' } },
];

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function MasjidFinderPage() {
  const [selectedPrayer, setSelectedPrayer] = useState('juma');
  const [radius, setRadius]                 = useState(2);
  const [locLabel, setLocLabel]             = useState('Apni location daain');
  const [locDetected, setLocDetected]       = useState(false);
  const [locLoading, setLocLoading]         = useState(false);
  const [loading, setLoading]               = useState(false);
  const [results, setResults]               = useState(null);   // null = not searched yet
  const [sortAsc, setSortAsc]               = useState(true);

  // ── Radius slider ──────────────────────────────────────────────────────────
  const sliderPct = ((radius - 0.5) / 9.5) * 100;

  const handleRadius = (e) => setRadius(parseFloat(e.target.value));

  // ── Detect location ────────────────────────────────────────────────────────
  const detectLocation = useCallback(() => {
    setLocLoading(true);
    const done = (label) => {
      setLocLabel(label);
      setLocDetected(true);
      setLocLoading(false);
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => done(`${p.coords.latitude.toFixed(4)}, ${p.coords.longitude.toFixed(4)}`),
        ()  => done('Karachi (Default)')
      );
    } else {
      done('Karachi (Default)');
    }
  }, []);

  // ── Search ─────────────────────────────────────────────────────────────────
  const doSearch = () => {
    setResults(null);
    setLoading(true);
    setTimeout(() => {
      const filtered = MASJID_DB.filter((m) => m.dist <= radius);
      setResults(filtered);
      setLoading(false);
      setSortAsc(true);
    }, 1600);
  };

  // ── Sort toggle ────────────────────────────────────────────────────────────
  const toggleSort = () => {
    setSortAsc((prev) => !prev);
    setResults((prev) => prev ? [...prev].reverse() : prev);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <header className={styles.hero}>
          <p className={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
          <div className={styles.domeIcon}>🕌</div>
          <h1 className={`${styles.heroTitle} `}>قریبی مسجد تلاش کریں</h1>
          <p className={styles.heroSubtitle}>Karachi namaz ki timings janein — aapke ghar ke paas</p>
        </header>

        {/* ── PRAYER TIME BAR ──────────────────────────────────────────────── */}
        <nav className={styles.prayerBar}>
          {PRAYER_TIMES.map((p) => (
            <div key={p.key} className={`${styles.pItem} ${p.current ? styles.pCurrent : ''}`}>
              <div className={styles.pName}>{p.label}</div>
              <div className={styles.pTime}>{p.time}</div>
            </div>
          ))}
        </nav>

        {/* ── LOCATION ─────────────────────────────────────────────────────── */}
        <section className={styles.section}>
          <div className={styles.secLabel}>📍 Aapki Location</div>
          <div className={styles.locBox}>
            <span className={styles.locIcon}>🗺️</span>
            <div className={styles.locText}>
              <div className={styles.locMain}>{locLabel}</div>
              <div className={styles.locSub}>
                {locDetected ? 'Location set ho gayi ✓' : 'GPS se automatic detect karein'}
              </div>
            </div>
            <button
              className={styles.locBtn}
              onClick={detectLocation}
              disabled={locLoading || locDetected}
              style={locDetected ? { background: '#4ade80' } : {}}
            >
              {locLoading ? '⏳' : locDetected ? '✓' : 'Detect'}
            </button>
          </div>

          {locDetected && (
            <div className={styles.locDetected}>
              <span className={styles.dot} />
              <span>{locLabel} — ready hai!</span>
            </div>
          )}
        </section>

        {/* ── DIVIDER ──────────────────────────────────────────────────────── */}
        <Divider label="Namaz Filter" />

        {/* ── PRAYER FILTER ────────────────────────────────────────────────── */}
        <section className={styles.section}>
          <div className={styles.secLabel}>🕐 Kaun si Namaz?</div>
          <div className={styles.filterGrid}>
            {PRAYER_FILTERS.map((pf) => (
              <div
                key={pf.key}
                className={`${styles.filterCard} ${pf.full ? styles.filterFull : ''} ${selectedPrayer === pf.key ? styles.filterActive : ''}`}
                onClick={() => setSelectedPrayer(pf.key)}
              >
                <div className={styles.fEmoji}>{pf.emoji}</div>
                <div className={styles.fName}>{pf.label}</div>
                <div className={styles.fTime}>{pf.time}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── DIVIDER ──────────────────────────────────────────────────────── */}
        <Divider label="Faasla" />

        {/* ── RADIUS ───────────────────────────────────────────────────────── */}
        <section className={styles.section}>
          <div className={styles.secLabel}>📏 Kitni Door tak Dhundhen?</div>
          <input
            type="range"
            className={styles.radiusSlider}
            min="0.5" max="10" step="0.5"
            value={radius}
            onChange={handleRadius}
            style={{
              background: `linear-gradient(to right, var(--gold) 0%, var(--gold) ${sliderPct}%, rgba(255,255,255,0.2) ${sliderPct}%)`,
            }}
          />
          <div className={styles.radiusLabels}>
            <span>500m</span><span>2.5km</span><span>5km</span><span>10km</span>
          </div>
          <div className={styles.radiusValue}>{radius} km ke andar</div>
        </section>

        {/* ── SEARCH BUTTON ────────────────────────────────────────────────── */}
        <div className={styles.searchWrap}>
          <button className={styles.searchBtn} onClick={doSearch} disabled={loading}>
            <span>🔍</span> Masjid Dhundho
          </button>
        </div>

        {/* ── LOADING ──────────────────────────────────────────────────────── */}
        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Qareeb ki masajid dhundh rahe hain...</p>
          </div>
        )}

        {/* ── RESULTS ──────────────────────────────────────────────────────── */}
        {results !== null && !loading && (
          <div className={styles.results}>
            <div className={styles.resHeader}>
              <div className={styles.resCount}>
                <span>{results.length}</span> masajid mile
              </div>
              <button className={styles.sortBtn} onClick={toggleSort}>
                ↕ Faasle se sort
              </button>
            </div>

            {results.length === 0 ? (
              <div className={styles.noRes}>
                <div className={styles.noResEmoji}>🔍</div>
                <p>Is radius mein koi masjid nahi mili.<br />Radius barhaein aur dobara try karein.</p>
              </div>
            ) : (
              results.map((m, i) => (
                <MasjidCard key={m.name} masjid={m} prayer={selectedPrayer} index={i} />
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────
function Divider({ label }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '20px 20px 0',
      }}
    >
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: 1, textTransform: 'uppercase' }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
    </div>
  );
}

const PRAYER_LABELS = { fajr:'Fajr', zuhr:'Zuhr', asr:'Asr', maghrib:'Maghrib', isha:'Isha', juma:'Juma' };

function MasjidCard({ masjid, prayer, index }) {
  const time = masjid.timings[prayer] || '--:--';
  return (
    <div
      className={styles.masjidCard}
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      <div className={styles.cardTop}>
        <div>
          <div className={styles.mName}>{masjid.name}</div>
          <div className={styles.mArea}>📍 {masjid.area}</div>
        </div>
        <div className={styles.timeBadge}>
          <div className={styles.tTime}>{time}</div>
          <div className={styles.tLabel}>{PRAYER_LABELS[prayer]}</div>
        </div>
      </div>
      <div className={styles.cardInfo}>
        <span className={styles.distBadge}>📏 {masjid.dist} km</span>
        <span className={styles.infoChip}>👥 {masjid.cap}</span>
        <span className={styles.infoChip}>{masjid.parking ? '🅿️ Parking' : '🚫 No parking'}</span>
      </div>
    </div>
  );
}