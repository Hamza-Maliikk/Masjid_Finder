'use client';

import { useState, useCallback, useEffect } from 'react';
import styles from './page.module.css';
import type {IMasjid} from '../models/Masjid';
import { MapPin, Search as SearchIcon, Navigation } from 'lucide-react';
import { Poppins, Noto_Nastaliq_Urdu } from 'next/font/google';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

const nastaliq = Noto_Nastaliq_Urdu({
  weight: ['400', '700'],
  subsets: ['arabic'],
});

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface IMasjidWithDist extends IMasjid {
  dist: number;
}

// ─── HAVERSINE FORMULA — component se bahar ──────────────────────────────────
function getDistanceKm(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function MasjidFinderPage() {
  const [radius, setRadius]           = useState(1);
  const [locLabel, setLocLabel]       = useState('Apni location daain');
  const [locDetected, setLocDetected] = useState(false);
  const [locLoading, setLocLoading]   = useState(false);
  const [loading, setLoading]         = useState(false);
  const [results, setResults]         = useState<IMasjidWithDist[] | null>(null);
  const [sortAsc, setSortAsc]         = useState(true);
  const [masjids, setMasjids]         = useState<IMasjid[]>([]);
  const [fetchError, setFetchError]   = useState(false);
  const [userCoords, setUserCoords]   = useState<{lat: number, lng: number} | null>(null);

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

  // ── Detect location ────────────────────────────────────────────────────────
  const detectLocation = useCallback(() => {
    setLocLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => {
          const lat = p.coords.latitude;
          const lng = p.coords.longitude;
          setUserCoords({ lat, lng });
          setLocLabel(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
          setLocDetected(true);
          setLocLoading(false);
        },
        () => {
          // Default — Karachi center
          setUserCoords({ lat: 24.8607, lng: 67.0011 });
          setLocLabel('Karachi (Default)');
          setLocDetected(true);
          setLocLoading(false);
        }
      );
    }
  }, []);

  // ── Radius slider ──────────────────────────────────────────────────────────
  const sliderPct = ((radius - 0.5) / 9.5) * 100;
  const handleRadius = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRadius(parseFloat(e.target.value));

  // ── Search — real distance calculate karo ─────────────────────────────────
  const doSearch = () => {
    if (!userCoords) {
      alert('Pehle location detect karein! 📍');
      return;
    }
    setResults(null);
    setLoading(true);
    setTimeout(() => {
      const withDistance = masjids
        .map((m) => ({
          ...m,
          dist: parseFloat(
            getDistanceKm(userCoords.lat, userCoords.lng, m.lat, m.lng).toFixed(1)
          )
        }))
        .filter((m) => m.dist <= radius)
        .sort((a, b) => a.dist - b.dist);

      setResults(withDistance as IMasjidWithDist[]);
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
    <div className={`${styles.wrapper} ${poppins.className}`}>
      <div className={styles.container}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <header className={styles.hero}>
          <p className={`${styles.bismillah} ${nastaliq.className}`}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
          <div className={styles.domeIcon}>🕌</div>
          <h1 className={`${styles.heroTitle} ${nastaliq.className}`}>قریبی مسجد تلاش کریں</h1>
          <p className={styles.heroSubtitle}>
            Karachi mein Jumma ki namaz ke liye qareeb ki masjid dhundein
          </p>
          {/* DB status */}
          <div className={styles.dbStatusBadge}>
            {fetchError
              ? '⚠️ Database Error'
              : masjids.length > 0
              ? `✅ ${masjids.length} Masajid Loaded`
              : '⏳ Loading Data...'}
          </div>
        </header>

        {/* ── LOCATION ─────────────────────────────────────────────────────── */}
        <section className={styles.section}>
          <div className={styles.secLabel}>📍 Aapki Location</div>
          <div className={styles.locBox}>
            <div className={styles.locIconWrap}>
              <Navigation size={24} color="var(--gold)" />
            </div>
            <div className={styles.locText}>
              <div className={styles.locMain}>{locLabel}</div>
              <div className={styles.locSub}>
                {locDetected
                  ? 'Location Set Successfully ✓'
                  : 'Detect via GPS for accuracy'}
              </div>
            </div>
            <button
              className={styles.locBtn}
              onClick={detectLocation}
              disabled={locLoading || locDetected}
              style={locDetected ? { background: '#4ade80', color: '#0d3a27' } : {}}
            >
              {locLoading ? '⏳' : locDetected ? '✓' : 'Detect'}
            </button>
          </div>
        </section>

        <Divider label="Faasla (Distance)" />

        {/* ── RADIUS ───────────────────────────────────────────────────────── */}
        <section className={styles.section}>
          <div className={styles.secLabel}>📏 Kitni Door Tak Dhundhen?</div>
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
          <div className={styles.radiusValue}>{radius} km Range</div>
        </section>

        {/* ── SEARCH BUTTON ────────────────────────────────────────────────── */}
        <div className={styles.searchWrap}>
          <button
            className={styles.searchBtn}
            onClick={doSearch}
            disabled={loading || masjids.length === 0}
          >
            <SearchIcon size={20} />
            {masjids.length === 0 ? 'Loading Data...' : 'Find Masjid'}
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
                <span>{results.length}</span> Masajid Found
              </div>
              <button className={styles.sortBtn} onClick={toggleSort}>
                {sortAsc ? '↑ Nearest First' : '↓ Furthest First'}
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
      gap: 12, padding: '30px 20px 10px',
    }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
      <span style={{
        fontSize: 11, color: 'rgba(255,255,255,0.4)',
        letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
    </div>
  );
}

// ─── MASJID CARD ─────────────────────────────────────────────────────────────
function MasjidCard({ masjid, index }: { masjid: IMasjidWithDist; index: number }) {
  const openMap = () => {
    const query = encodeURIComponent(masjid.name + " " + masjid.area + " Karachi")
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank')
  }
  return (
    <div
      className={styles.masjidCard}
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      <div className={styles.cardTop}>
        <div style={{flex: 1}}>
          <div className={styles.mName}>{masjid.name}</div>
          <div className={styles.mArea}>📍 {masjid.area}</div>
        </div>
        <div className={styles.timeBadge}>
          <div className={styles.tTime}>
            {masjid.timings?.juma ?? '--:--'}
          </div>
          <div className={styles.tLabel}>Juma</div>
        </div>
        <button onClick={openMap} className={styles.mapBtn} aria-label="Open in Maps">
          <MapPin size={18}/>
        </button>
      </div>
      <div className={styles.cardInfo}>
        <span className={styles.distBadge}>📏 {masjid.dist} km</span>
        <span className={styles.infoChip}>👥 Cap: {masjid.cap}</span>
        <span className={styles.infoChip}>
          {masjid.parking ? '🅿️ Parking' : '🚫 No Parking'}
        </span>
      </div>
    </div>
  );
}