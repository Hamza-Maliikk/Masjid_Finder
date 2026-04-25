'use client';

import { useState, useCallback, useEffect } from 'react';
import styles from './page.module.css';

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface Masjid {
  _id: string
  name: string
  area: string
  dist: number
  cap: string
  parking: boolean
  timings: {
    juma?: string
  }
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function MasjidFinderPage() {
  const [radius, setRadius]         = useState(2);
  const [locLabel, setLocLabel]     = useState('Apni location daain');
  const [locDetected, setLocDetected] = useState(false);
  const [locLoading, setLocLoading] = useState(false);
  const [loading, setLoading]       = useState(false);
  const [results, setResults]       = useState<Masjid[] | null>(null);
  const [sortAsc, setSortAsc]       = useState(true);
  const [masjids, setMasjids]       = useState<Masjid[]>([]);
  const [fetchError, setFetchError] = useState(false);

  // ── DB se data fetch karo ─────────────────────────────────────────────────
  useEffect(() => {
    async function getMasjids() {
      try {
        const res  = await fetch('/api/test')
        const json = await res.json()
        setMasjids(json.data)
      } catch (err) {
        console.error('Data fetch nahi hua:', err)
        setFetchError(true)
      }
    }
    getMasjids()
  }, [])

  // ── Radius slider ──────────────────────────────────────────────────────────
  const sliderPct = ((radius - 0.5) / 9.5) * 100;
  const handleRadius = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRadius(parseFloat(e.target.value));

  // ── Detect location ────────────────────────────────────────────────────────
  const detectLocation = useCallback(() => {
    setLocLoading(true);
    const done = (label: string) => {
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
      const filtered = masjids.filter((m) => m.dist <= radius);
      // Distance se sort karo — pehle paas wali
      filtered.sort((a, b) => a.dist - b.dist);
      setResults(filtered);
      setLoading(false);
      setSortAsc(true);
    }, 1200);
  };

  // ── Sort toggle ────────────────────────────────────────────────────────────
  const toggleSort = () => {
    setSortAsc((prev) => !prev);
    setResults((prev) =>
      prev ? [...prev].sort((a, b) => sortAsc ? b.dist - a.dist : a.dist - b.dist) : prev
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <header className={styles.hero}>
          <p className={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
          <div className={styles.domeIcon}>🕌</div>
          <h1 className={styles.heroTitle}>قریبی مسجد تلاش کریں</h1>
          <p className={styles.heroSubtitle}>
            Karachi mein Jumma ki namaz ke liye qareeb ki masjid dhundein
          </p>
          {/* DB status */}
          <p style={{ fontSize: 11, marginTop: 8, opacity: 0.5 }}>
            {fetchError
              ? '⚠️ Database se data nahi aaya'
              : masjids.length > 0
              ? `✅ ${masjids.length} masajid database se load huin`
              : '⏳ Data load ho raha hai...'}
          </p>
        </header>

        {/* ── LOCATION ─────────────────────────────────────────────────────── */}
        <section className={styles.section}>
          <div className={styles.secLabel}>📍 Aapki Location</div>
          <div className={styles.locBox}>
            <span className={styles.locIcon}>🗺️</span>
            <div className={styles.locText}>
              <div className={styles.locMain}>{locLabel}</div>
              <div className={styles.locSub}>
                {locDetected
                  ? 'Location set ho gayi ✓'
                  : 'GPS se automatic detect karein'}
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
          <button
            className={styles.searchBtn}
            onClick={doSearch}
            disabled={loading || masjids.length === 0}
          >
            <span>🔍</span>{' '}
            {masjids.length === 0 ? 'Data load ho raha hai...' : 'Masjid Dhundho'}
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
                <span>{results.length}</span> masajid mili
              </div>
              <button className={styles.sortBtn} onClick={toggleSort}>
                {sortAsc ? '↑' : '↓'} Faasle se sort
              </button>
            </div>

            {results.length === 0 ? (
              <div className={styles.noRes}>
                <div className={styles.noResEmoji}>🔍</div>
                <p>
                  Is radius mein koi masjid nahi mili.
                  <br />
                  Radius barhaein aur dobara try karein.
                </p>
              </div>
            ) : (
              results.map((m, i) => (
                <MasjidCard key={m._id} masjid={m} index={i} />
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}

// ─── DIVIDER ─────────────────────────────────────────────────────────────────
function Divider({ label }: { label: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      gap: 12, padding: '20px 20px 0',
    }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
      <span style={{
        fontSize: 10, color: 'rgba(255,255,255,0.3)',
        letterSpacing: 1, textTransform: 'uppercase',
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
    </div>
  );
}

// ─── MASJID CARD — sirf Juma timing ─────────────────────────────────────────
function MasjidCard({ masjid, index }: { masjid: Masjid; index: number }) {
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
        {/* Sirf Juma timing — database se */}
        <div className={styles.timeBadge}>
          <div className={styles.tTime}>
            {masjid.timings?.juma ?? '--:--'}
          </div>
          <div className={styles.tLabel}>Juma</div>
        </div>
      </div>
      <div className={styles.cardInfo}>
        <span className={styles.distBadge}>📏 {masjid.dist} km</span>
        <span className={styles.infoChip}>👥 {masjid.cap}</span>
        <span className={styles.infoChip}>
          {masjid.parking ? '🅿️ Parking' : '🚫 No parking'}
        </span>
      </div>
    </div>
  );
}