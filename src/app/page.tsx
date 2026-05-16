"use client";

import { useState, useCallback, useEffect } from "react";
import styles from "./page.module.css";
import type { IMasjid } from "../models/Masjid";
import { MapPin, Navigation, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { Poppins, Noto_Nastaliq_Urdu } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const nastaliq = Noto_Nastaliq_Urdu({
  weight: ["400", "700"],
  subsets: ["arabic"],
});

interface IMasjidWithDist extends IMasjid {
  dist: number;
}

function getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function MasjidFinderPage() {
  const [locLabel, setLocLabel] = useState("Apni location daain");
  const [locDetected, setLocDetected] = useState(false);
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState(false);
  const [results, setResults] = useState<IMasjidWithDist[] | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [masjids, setMasjids] = useState<IMasjid[]>([]);
  const [fetchError, setFetchError] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Fetch masjids from DB
  useEffect(() => {
    async function getMasjids() {
      try {
        const res = await fetch("/api/test", {
          headers: { "ngrok-skip-browser-warning": "true" },
        });
        if (!res.ok) throw new Error("Response not ok");
        const json = await res.json();
        setMasjids(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        console.error("Data fetch nahi hua:", err);
        setFetchError(true);
      } finally {
        setDataLoading(false);
      }
    }
    getMasjids();
  }, []);

  // Recalculate results when coords, masjids, or sort changes
  useEffect(() => {
    if (!userCoords || masjids.length === 0) return;

    const withDistance = masjids
      .map((m) => ({
        ...m,
        dist: parseFloat(
          getDistanceKm(userCoords.lat, userCoords.lng, m.lat, m.lng).toFixed(2)
        ),
      }))
      .filter((m) => m.dist <= 1)
      .sort((a, b) => (sortAsc ? a.dist - b.dist : b.dist - a.dist));

    setResults(withDistance as IMasjidWithDist[]);
  }, [userCoords,  sortAsc]);

  const detectLocation = useCallback(() => {
    if (locDetected || locLoading) return;
    setLocLoading(true);
    setLocError(false);

    if (!navigator.geolocation) {
      setLocError(true);
      setLocLoading(false);
      setLocLabel("Geolocation supported nahi");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (p) => {
        const lat = p.coords.latitude;
        const lng = p.coords.longitude;
        setUserCoords({ lat, lng });
        setLocLabel(`${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`);
        setLocDetected(true);
        setLocLoading(false);
      },
      () => {
        // Graceful fallback to Karachi center
        setUserCoords({ lat: 24.8607, lng: 67.0011 });
        setLocLabel("Karachi Centre (Default)");
        setLocDetected(true);
        setLocLoading(false);
      },
      { timeout: 8000, maximumAge: 60000 }
    );
  }, [locDetected, locLoading]);

  const toggleSort = () => setSortAsc((p) => !p);

  const resetLocation = () => {
    setLocDetected(false);
    setLocLabel("Apni location daain");
    setUserCoords(null);
    setResults(null);
    setLocError(false);
  };

  return (
    <div className={`${styles.wrapper} ${poppins.className}`}>
      {/* Background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <div className={styles.container}>

        {/* ── HERO ── */}
        <header className={styles.hero}>
          <div className={styles.bismillahWrap}>
            <p className={`${styles.bismillah} ${nastaliq.className}`}>
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>
          </div>
          <div className={styles.domeWrap}>
            <span className={styles.domeIcon}>🕌</span>
            <div className={styles.domePulse} />
          </div>
          <h1 className={`${styles.heroTitle} ${nastaliq.className}`}>
            قریبی مسجد تلاش کریں
          </h1>
          <p className={styles.heroSubtitle}>
            Karachi mein Jumma ki namaz ke liye qareeb ki masjid dhundein
          </p>

          {/* DB Status */}
          <div className={`${styles.dbBadge} ${fetchError ? styles.dbError : dataLoading ? styles.dbLoading : styles.dbOk}`}>
            {fetchError ? (
              <><AlertTriangle size={13} /> Database Error</>
            ) : dataLoading ? (
              <><Loader2 size={13} className={styles.spin} /> Loading Data...</>
            ) : (
              <><CheckCircle2 size={13} /> {masjids.length} Masajid Loaded</>
            )}
          </div>
        </header>

        {/* ── LOCATION CARD ── */}
        <section className={styles.card}>
          <div className={styles.cardLabel}>
            <MapPin size={14} />
            Aapki Location
          </div>

          <div className={styles.locRow}>
            <div className={`${styles.locIconBox} ${locDetected ? styles.locIconActive : ""}`}>
              <Navigation size={20} />
            </div>

            <div className={styles.locInfo}>
              <div className={styles.locMain}>{locLabel}</div>
              <div className={styles.locSub}>
                {locError
                  ? "⚠️ Location nahi mili — default use ho raha hai"
                  : locDetected
                  ? "✓ 1km range mein masajid dikh rahi hain"
                  : "GPS se detect karein accurate results ke liye"}
              </div>
            </div>

            <div className={styles.locActions}>
              {locDetected ? (
                <button className={styles.resetBtn} onClick={resetLocation} title="Reset location">
                  ↺
                </button>
              ) : (
                <button
                  className={styles.detectBtn}
                  onClick={detectLocation}
                  disabled={locLoading}
                >
                  {locLoading ? <Loader2 size={16} className={styles.spin} /> : "Detect"}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ── PROMPT ── */}
        {!locDetected && !locLoading && (
          <div className={styles.prompt}>
            <span className={styles.promptArrow}>↑</span>
            Pehle apni location detect karein
          </div>
        )}

        {/* ── LOADING STATE ── */}
        {locLoading && (
          <div className={styles.loadingState}>
            <Loader2 size={28} className={styles.spin} />
            <p>Location dhundh raha hoon...</p>
          </div>
        )}

        {/* ── RESULTS ── */}
        {results !== null && locDetected && (
          <section className={styles.results}>
            <div className={styles.resHeader}>
              <div className={styles.resCount}>
                <span className={styles.resNum}>{results.length}</span>
                <span> Masajid mili {results.length === 0 ? "" : "(1km range)"}</span>
              </div>
              {results.length > 1 && (
                <button className={styles.sortBtn} onClick={toggleSort}>
                  {sortAsc ? "↑ Nearest First" : "↓ Furthest First"}
                </button>
              )}
            </div>

            {results.length === 0 ? (
              <div className={styles.noRes}>
                <div className={styles.noResIcon}>🔍</div>
                <p className={styles.noResTitle}>Koi masjid nahi mili</p>
                <p className={styles.noResSub}>
                  1km ke andar koi masjid record mein nahi hai.
                  <br />
                  Database mein data check karein ya range barhaein.
                </p>
              </div>
            ) : (
              <div className={styles.cardGrid}>
                {results.map((m, i) => (
                  <MasjidCard key={String(m._id)} masjid={m} index={i} />
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

// ─── MASJID CARD ─────────────────────────────────────────────────────────────
function MasjidCard({ masjid, index }: { masjid: IMasjidWithDist; index: number }) {
  const openMap = () => {
    const query = encodeURIComponent(`${masjid.name} ${masjid.area} Karachi`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
  };

  const distDisplay =
    masjid.dist < 1
      ? `${(masjid.dist * 1000).toFixed(0)}m`
      : `${masjid.dist}km`;

  return (
    <div className={styles.masjidCard} style={{ animationDelay: `${index * 0.07}s` }}>
      <div className={styles.cardInner}>
        <div className={styles.mHeader}>
          <div className={styles.mIcon}>🕌</div>
          <div className={styles.mTitles}>
            <div className={styles.mName}>{masjid.name}</div>
            <div className={styles.mArea}>
              <MapPin size={11} />
              {masjid.area}
            </div>
          </div>
          <div className={styles.jumaBlock}>
            <div className={styles.jumaTime}>{masjid.timings?.juma ?? "--:--"}</div>
            <div className={styles.jumaLabel}>Juma</div>
          </div>
        </div>

        <div className={styles.mFooter}>
          <span className={styles.distPill}>📏 {distDisplay}</span>
          <span className={styles.infoPill}>👥 {masjid.cap ?? "N/A"}</span>
          <span className={styles.infoPill}>
            {masjid.parking ? "🅿️ Parking" : "🚫 No Parking"}
          </span>
          <button className={styles.mapBtn} onClick={openMap} aria-label="Maps mein kholo">
            <MapPin size={14} />
            Maps
          </button>
        </div>
      </div>
    </div>
  );
}