"use client"
import { useEffect, useState } from "react"
import type { ISurah } from "@/models/Surah"

// ── MAIN PAGE ──────────────────────────────────────────────────────────────
export default function SurahKahfPage() {
  const [ayahs, setAyahs]       = useState<ISurah[]>([])
  const [filtered, setFiltered] = useState<ISurah[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(false)

  // ── Fonts ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const link = document.createElement("link")
    link.href =
      "https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Amiri:wght@400;700&family=Tajawal:wght@300;400;500;700&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
  }, [])

  // ── Fetch ──────────────────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/surah", {
      headers: { "ngrok-skip-browser-warning": "true" },
    })
      .then((r) => r.json())
      .then((json) => {
        const data: ISurah[] = json.data || []
        setAyahs(data)
        setFiltered(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  return (
    <div style={s.wrapper}>
      {/* Background glow blobs */}
      <div style={s.blob1} />
      <div style={s.blob2} />
      <div style={s.blob3} />

      <div style={s.pageWrap}>

        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <header style={s.hero}>
          <span style={s.badge}>✦ Al-Quran Al-Kareem ✦</span>

          <div style={s.numberCircle}>١٨</div>

          <div style={s.surahArabic}>سُورَةُ الْكَهْف</div>
          <div style={s.surahEnglish}>SURAH AL-KAHF</div>
          <div style={s.surahMeta}>MAKKI · 110 AYAAT · PARA 15–16</div>

          {/* Status pill */}
          <div style={{ marginTop: "0.8rem" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(0,180,120,0.1)",
                border: "1px solid rgba(0,180,120,0.25)",
                padding: "4px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                color: loading ? "#7ab8d4" : error ? "#f87171" : "#4cd8a0",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: loading ? "#7ab8d4" : error ? "#f87171" : "#4cd8a0",
                  display: "inline-block",
                }}
              />
              {loading
                ? "Loading ayaat..."
                : error
                ? "Database se data nahi aaya"
                : `${ayahs.length} ayaat loaded`}
            </span>
          </div>
        </header>

        {/* ── SEPARATOR ──────────────────────────────────────────────────── */}
        <Separator label="Ayaat" />

        {/* ── BISMILLAH ──────────────────────────────────────────────────── */}
        <div style={s.bismillahBox}>
          <div style={s.bismillahTopLine} />
          <div style={s.bismillahText}>
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </div>
          <div style={s.bismillahBottomLine} />
        </div>

        {/* ── AYAHS ──────────────────────────────────────────────────────── */}
        <div style={s.ayahsContainer}>
          {loading ? (
            [...Array(5)].map((_, i) => <SkeletonCard key={i} delay={i * 0.1} />)
          ) : error ? (
            <div style={s.errorBox}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
              <p>Database se data nahi aaya. Server check karein.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={s.errorBox}>
              <p>Koi ayah nahi mili.</p>
            </div>
          ) : (
            filtered.map((ayah, i) => (
              <AyahCard key={String(ayah._id ?? ayah.start)} ayah={ayah} index={i} />
            ))
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }
        input::placeholder { color: rgba(0,180,120,0.35); }
        input:focus { border-color: rgba(201,168,76,0.5) !important; outline: none; }
      `}</style>
    </div>
  )
}

// ── AYAH CARD ──────────────────────────────────────────────────────────────
function AyahCard({ ayah, index }: { ayah: ISurah; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        ...s.ayahCard,
        ...(hovered ? s.ayahCardHover : {}),
        animationDelay: `${index * 0.06}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent line on hover */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(0,180,120,0.6), transparent)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      />

      {/* Arabic */}
      <div style={s.ayahTop}>
        <div style={s.ayahArabic}>
          {ayah.start}
        </div>
      </div>

      {/* Translation / Transliteration */}
      <div style={s.ayahBottom}>
        {ayah.surah && (
          <div style={s.ayahTranslit}>{ayah.surah}</div>
        )}
        <div style={s.ayahDivider} />
        <div style={s.ayahFooter} />
      </div>
    </div>
  )
}

// ── SKELETON CARD ──────────────────────────────────────────────────────────
function SkeletonCard({ delay }: { delay: number }) {
  return (
    <div style={{ ...s.ayahCard, animationDelay: `${delay}s` }}>
      <div style={s.ayahTop}>
        <div style={{ ...s.skel, height: 60, borderRadius: 8, marginBottom: 8 }} />
      </div>
      <div style={s.ayahBottom}>
        <div style={{ ...s.skel, height: 12, width: "75%", marginBottom: 8 }} />
        <div style={{ ...s.skel, height: 12, width: "55%" }} />
      </div>
    </div>
  )
}

// ── SEPARATOR ──────────────────────────────────────────────────────────────
function Separator({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "1rem 0 1.5rem" }}>
      <div style={{ flex: 1, height: 1, background: "rgba(0,180,120,0.15)" }} />
      <span style={{ fontSize: 10, color: "rgba(0,180,120,0.45)", letterSpacing: 2, textTransform: "uppercase" as const }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "rgba(0,180,120,0.15)" }} />
    </div>
  )
}

// ── STYLES ─────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #0a1628 0%, #0d2137 40%, #0f2d40 70%, #112235 100%)",
    fontFamily: "'Tajawal', sans-serif",
    color: "#e0f0ff",
    position: "relative",
    overflowX: "hidden",
  },

  // Background blobs
  blob1: {
    position: "fixed", top: "5%", right: "5%",
    width: 350, height: 350,
    background: "radial-gradient(circle, rgba(0,168,120,0.1) 0%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },
  blob2: {
    position: "fixed", bottom: "10%", left: "5%",
    width: 300, height: 300,
    background: "radial-gradient(circle, rgba(0,140,100,0.07) 0%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },
  blob3: {
    position: "fixed", top: "40%", left: "40%",
    width: 400, height: 400,
    background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },

  pageWrap: {
    position: "relative", zIndex: 1,
    maxWidth: 800, margin: "0 auto", padding: "0 1rem 4rem",
  },

  // Hero
  hero: { textAlign: "center", padding: "3.5rem 1.5rem 2.5rem" },
  badge: {
    display: "inline-block",
    background: "rgba(201,168,76,0.12)",
    border: "1px solid rgba(201,168,76,0.35)",
    color: "#c9a84c",
    fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
    padding: "6px 20px", borderRadius: 30,
    marginBottom: "1.5rem", fontWeight: 500,
  },
  numberCircle: {
    width: 72, height: 72, margin: "0 auto 1.5rem",
    borderRadius: "50%",
    background: "rgba(201,168,76,0.1)",
    border: "2px solid rgba(201,168,76,0.4)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Amiri', serif", fontSize: "1.6rem", color: "#c9a84c",
    boxShadow: "0 0 30px rgba(201,168,76,0.1)",
  },
  surahArabic: {
    fontFamily: "'Amiri', serif", fontSize: "3rem",
    color: "#e8f4ff", marginBottom: "0.5rem",
    textShadow: "0 2px 20px rgba(201,168,76,0.15)",
    direction: "rtl",
  },
  surahEnglish: {
    fontSize: "1.1rem", fontWeight: 300,
    color: "#4cd8a0", letterSpacing: 3, marginBottom: "0.4rem",
  },
  surahMeta: {
    fontSize: 12, color: "rgba(74,200,160,0.5)",
    letterSpacing: 1, marginBottom: "1.2rem",
  },

  // Bismillah
  bismillahBox: {
    textAlign: "center", padding: "1.8rem 1rem",
    margin: "0.5rem 0 2rem",
    background: "rgba(201,168,76,0.06)",
    border: "1px solid rgba(201,168,76,0.2)",
    borderRadius: 20, position: "relative",
  },
  bismillahTopLine: {
    position: "absolute", top: 0, left: 0, right: 0, height: 1,
    background: "linear-gradient(to right, transparent, rgba(201,168,76,0.5), transparent)",
  },
  bismillahBottomLine: {
    position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
    background: "linear-gradient(to right, transparent, rgba(201,168,76,0.5), transparent)",
  },
  bismillahText: {
    fontFamily: "'Amiri Quran', 'Amiri', serif",
    fontSize: "2.2rem", color: "#c9a84c",
    direction: "rtl", lineHeight: 2,
    textShadow: "0 2px 15px rgba(201,168,76,0.25)",
  },

  // Ayahs
  ayahsContainer: { display: "flex", flexDirection: "column", gap: "1rem" },
  ayahCard: {
    background: "rgba(13,33,55,0.75)",
    border: "1px solid rgba(0,160,110,0.2)",
    borderRadius: 16, overflow: "hidden",
    animation: "fadeSlide 0.5s ease both",
    transition: "border-color 0.3s, background 0.3s, transform 0.22s",
    position: "relative",
  },
  ayahCardHover: {
    borderColor: "rgba(0,180,120,0.5)",
    background: "rgba(13,33,55,0.92)",
    transform: "translateY(-2px)",
  },
  ayahTop: {
    padding: "1.5rem 1.5rem 1rem",
    borderBottom: "1px solid rgba(0,160,110,0.1)",
    direction: "rtl",
  },
  ayahArabic: {
    fontFamily: "'Amiri Quran', 'Amiri', serif",
    fontSize: "1.75rem", lineHeight: 2.2,
    color: "#f0e8d0", textAlign: "right",
    textShadow: "0 0 12px rgba(201,168,76,0.12)",
  },
  ayahNumInline: {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: 28, height: 28,
    background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)",
    borderRadius: "50%", fontFamily: "'Amiri', serif", fontSize: "0.85rem",
    color: "#c9a84c", marginRight: 6, verticalAlign: "middle", direction: "ltr",
  },
  ayahBottom: { padding: "1rem 1.5rem 1.25rem", direction: "ltr" },
  ayahTranslit: {
    fontFamily: "'Amiri Quran', 'Amiri', serif",
    fontSize: "20px", color: "#e0f0ff",
    fontStyle: "italic", lineHeight: 2,
    letterSpacing: "1px", marginBottom: "0.6rem", opacity: 0.88,
  },
  ayahDivider: {
    height: 1,
    background: "rgba(0,160,110,0.15)",
    margin: "0.6rem 0",
  },
  ayahTranslation: { fontSize: "0.88rem", color: "#9ab0be", lineHeight: 1.8 },
  ayahFooter: { display: "flex", alignItems: "center", gap: 8, marginTop: "0.75rem" },
  ayahBadge: {
    fontSize: 10, color: "#c9a84c",
    background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)",
    padding: "3px 10px", borderRadius: 20, letterSpacing: 1,
  },

  // Skeleton
  skel: {
    background: "rgba(0,160,110,0.1)",
    borderRadius: 6, animation: "pulse 1.5s infinite",
  },

  // Error
  errorBox: {
    textAlign: "center", color: "#7ab8d4",
    padding: "3rem", gridColumn: "1/-1",
  },
}