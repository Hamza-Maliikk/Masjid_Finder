"use client"
import { useEffect, useState } from "react"
import type { ISurah } from "@/models/Surah"

// ── MAIN PAGE ──────────────────────────────────────────────────────────────
export default function SurahKahfPage() {
  const [ayahs, setAyahs]       = useState<ISurah[]>([])
  const [filtered, setFiltered] = useState<ISurah[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(false)

  useEffect(() => {
    const link = document.createElement("link")
    link.href =
      "https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Amiri:wght@400;700&family=Tajawal:wght@300;400;500;700&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
  }, [])

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
      {/* Background orbs — same as home page */}
      <div style={s.orb1} />
      <div style={s.orb2} />
      <div style={s.orb3} />

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
                background: "rgba(14,158,138,0.1)",
                border: "1px solid rgba(14,158,138,0.25)",
                padding: "4px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                color: loading ? "rgba(255,255,255,0.45)" : error ? "#f87171" : "#0e9e8a",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: loading ? "rgba(255,255,255,0.45)" : error ? "#f87171" : "#0e9e8a",
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
        input::placeholder { color: rgba(255,255,255,0.25); }
        input:focus { border-color: rgba(14,158,138,0.4) !important; outline: none; }
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
          background: "linear-gradient(90deg, transparent, rgba(14,158,138,0.6), transparent)",
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
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
      <span style={{ fontSize: 10, color: "rgba(14,158,138,0.6)", letterSpacing: 2, textTransform: "uppercase" as const }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
    </div>
  )
}

// ── STYLES ─────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  wrapper: {
    minHeight: "100vh",
    background: "#060d1a",
    fontFamily: "'Tajawal', sans-serif",
    color: "rgba(255,255,255,0.92)",
    position: "relative",
    overflowX: "hidden",
  },

  // Background orbs — matching home page
  orb1: {
    position: "fixed", top: "-100px", left: "-150px",
    width: 500, height: 500,
    borderRadius: "50%", filter: "blur(80px)",
    background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },
  orb2: {
    position: "fixed", top: "30%", right: "-100px",
    width: 400, height: 400,
    borderRadius: "50%", filter: "blur(80px)",
    background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },
  orb3: {
    position: "fixed", bottom: "10%", left: "20%",
    width: 350, height: 350,
    borderRadius: "50%", filter: "blur(80px)",
    background: "radial-gradient(circle, rgba(14,158,138,0.1) 0%, transparent 70%)",
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
    color: "rgba(255,255,255,0.92)", marginBottom: "0.5rem",
    textShadow: "0 2px 20px rgba(201,168,76,0.15)",
    direction: "rtl",
  },
  surahEnglish: {
    fontSize: "1.1rem", fontWeight: 300,
    color: "#0e9e8a", letterSpacing: 3, marginBottom: "0.4rem",
  },
  surahMeta: {
    fontSize: 12, color: "rgba(14,158,138,0.5)",
    letterSpacing: 1, marginBottom: "1.2rem",
  },

  // Bismillah
  bismillahBox: {
    textAlign: "center", padding: "1.8rem 1rem",
    margin: "0.5rem 0 2rem",
    background: "rgba(201,168,76,0.06)",
    border: "1px solid rgba(201,168,76,0.2)",
    borderRadius: 20, position: "relative",
    backdropFilter: "blur(16px)",
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
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 18, overflow: "hidden",
    animation: "fadeSlide 0.5s ease both",
    transition: "border-color 0.25s, background 0.25s, transform 0.22s, box-shadow 0.25s",
    position: "relative",
    backdropFilter: "blur(12px)",
    boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
  },
  ayahCardHover: {
    borderColor: "rgba(14,158,138,0.3)",
    background: "rgba(255,255,255,0.06)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 32px rgba(14,158,138,0.12), 0 2px 0 rgba(255,255,255,0.04) inset",
  },
  ayahTop: {
    padding: "1.5rem 1.5rem 1rem",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    direction: "rtl",
  },
  ayahArabic: {
    fontFamily: "'Amiri Quran', 'Amiri', serif",
    fontSize: "1.75rem", lineHeight: 2.2,
    color: "#c9a84c", textAlign: "right",
    textShadow: "0 0 12px rgba(201,168,76,0.2)",
  },
  ayahBottom: { padding: "1rem 1.5rem 1.25rem", direction: "ltr" },
  ayahTranslit: {
    fontFamily: "'Amiri Quran', 'Amiri', serif",
    fontSize: "20px", color: "rgba(255,255,255,0.92)",
    fontStyle: "italic", lineHeight: 2,
    letterSpacing: "1px", marginBottom: "0.6rem", opacity: 0.88,
  },
  ayahDivider: {
    height: 1,
    background: "rgba(255,255,255,0.08)",
    margin: "0.6rem 0",
  },
  ayahTranslation: { fontSize: "0.88rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8 },
  ayahFooter: { display: "flex", alignItems: "center", gap: 8, marginTop: "0.75rem" },
  ayahBadge: {
    fontSize: 10, color: "#c9a84c",
    background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)",
    padding: "3px 10px", borderRadius: 20, letterSpacing: 1,
  },

  // Skeleton
  skel: {
    background: "rgba(14,158,138,0.1)",
    borderRadius: 6, animation: "pulse 1.5s infinite",
  },

  // Error
  errorBox: {
    textAlign: "center", color: "rgba(255,255,255,0.45)",
    padding: "3rem", gridColumn: "1/-1",
  },
}