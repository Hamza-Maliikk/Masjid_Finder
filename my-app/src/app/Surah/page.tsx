"use client"
import { useEffect, useState } from "react"
import type { ISurah } from "@/models/Surah"
// ── TYPES ──────────────────────────────────────────────────────────────────


// ── MAIN PAGE ──────────────────────────────────────────────────────────────
export default function SurahKahfPage() {
  const [ayahs, setAyahs]       = useState<ISurah[]>([])
  const [filtered, setFiltered] = useState<ISurah[]>([])
  const [search, setSearch]     = useState("")
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(false)

  // ── Fonts ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const link = document.createElement("link")
    link.href =
      "https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Amiri:wght@400;700&family=Outfit:wght@300;400;500;600&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
  }, [])

  // ── Fetch ──────────────────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/surah", {
      headers: {
    "ngrok-skip-browser-warning": "true",
  },
    })
      .then((r) => r.json())
      .then((json) => {
        const data: ISurah[] = json.data || []
        console.log(data)
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
      {/* Background blobs */}
      <div style={s.blob1} />
      <div style={s.blob2} />

      <div style={s.pageWrap}>

        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <header style={s.hero}>
          <span style={s.badge}>✦ Al-Quran Al-Kareem ✦</span>

          <div style={s.numberCircle}>١٨</div>

          <div style={s.surahArabic}>سُورَةُ الْكَهْف</div>
          <div style={s.surahEnglish}>SURAH AL-KAHF</div>
          <div style={s.surahMeta}>MAKKI · 110 AYAAT · PARA 15–16</div>

          <p style={s.statusLine}>
            {loading
              ? "⏳ Loading ayaat..."
              : error
              ? "⚠️ Database se data nahi aaya"
              : `✅ ${ayahs.length} ayaat loaded`}
          </p>
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
            </div>
          ) : (
            filtered.map((ayah, i) => (
              <AyahCard key={String(ayah._id ?? ayah.start)} ayah={ayah} index={i} />
            )
          )
          )
          }
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }
        input::placeholder { color: rgba(151,196,89,0.4); }
        input:focus { border-color: rgba(212,168,67,0.55) !important; outline: none; }
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
      {/* Arabic */}
      <div style={s.ayahTop}>
        <div style={s.ayahArabic}>
          {/* {ayah.start} */}
          {/* <span style={s.ayahNumInline}>{ayah.surah}</span> */}
        </div>
      </div>

      {/* Translation */}
      <div style={s.ayahBottom}>
        {ayah.surah && (
          <div style={s.ayahTranslit}>{ayah.surah}</div>
        )}
        <div style={s.ayahDivider} />
        <div style={s.ayahFooter}>
        </div>
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
      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase" as const }}>
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
    background: "linear-gradient(160deg, #0F2A02 0%, #173404 35%, #27500A 70%, #3B6D11 100%)",
    fontFamily: "'Outfit', sans-serif",
    color: "#EAF3DE",
    position: "relative",
    overflowX: "hidden",
  },
  blob1: {
    position: "fixed", top: "10%", left: "5%", width: 400, height: 400,
    background: "radial-gradient(circle, rgba(100,153,34,0.07) 0%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },
  blob2: {
    position: "fixed", bottom: "15%", right: "5%", width: 350, height: 350,
    background: "radial-gradient(circle, rgba(212,168,67,0.05) 0%, transparent 70%)",
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
    background: "rgba(212,168,67,0.12)", border: "1px solid rgba(212,168,67,0.38)",
    color: "#F0CC6E", fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
    padding: "6px 20px", borderRadius: 30, marginBottom: "1.5rem", fontWeight: 500,
  },
  numberCircle: {
    width: 72, height: 72, margin: "0 auto 1.5rem",
    borderRadius: "50%",
    background: "linear-gradient(135deg,rgba(212,168,67,0.18),rgba(212,168,67,0.04))",
    border: "2px solid rgba(212,168,67,0.45)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Amiri',serif", fontSize: "1.6rem", color: "#F0CC6E",
    boxShadow: "0 0 30px rgba(212,168,67,0.12)",
  },
  surahArabic: {
    fontFamily: "'Amiri',serif", fontSize: "3rem", color: "#EAF3DE",
    marginBottom: "0.5rem", textShadow: "0 2px 20px rgba(212,168,67,0.18)",
    direction: "rtl",
  },
  surahEnglish: { fontSize: "1.15rem", fontWeight: 300, color: "#97C459", letterSpacing: 2, marginBottom: "0.4rem" },
  surahMeta: { fontSize: 12, color: "rgba(151,196,89,0.55)", letterSpacing: 1, marginBottom: "1.2rem" },
  statusLine: { fontSize: 12, color: "rgba(99,153,34,0.7)", marginTop: "0.5rem" },

  // Search
  searchWrap: { maxWidth: 480, margin: "0 auto 2rem", position: "relative" },
  searchIcon: {
    position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)",
    color: "#639922", fontSize: 15, pointerEvents: "none",
  },
  searchInput: {
    width: "100%", padding: "14px 20px 14px 46px",
    borderRadius: 50, border: "1px solid rgba(99,153,34,0.35)",
    background: "rgba(15,42,2,0.65)", color: "#EAF3DE",
    fontSize: 14, fontFamily: "'Outfit',sans-serif",
    transition: "border-color 0.2s",
  },
  searchCount: { textAlign: "center", fontSize: 12, color: "#639922", marginTop: "0.4rem" },

  // Bismillah
  bismillahBox: {
    textAlign: "center", padding: "1.8rem 1rem",
    margin: "0.5rem 0 2rem",
    background: "linear-gradient(135deg,rgba(212,168,67,0.07),rgba(212,168,67,0.02))",
    border: "1px solid rgba(212,168,67,0.22)", borderRadius: 20,
    position: "relative",
  },
  bismillahTopLine: {
    position: "absolute", top: 0, left: 0, right: 0, height: 1,
    background: "linear-gradient(to right,transparent,rgba(212,168,67,0.55),transparent)",
  },
  bismillahBottomLine: {
    position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
    background: "linear-gradient(to right,transparent,rgba(212,168,67,0.55),transparent)",
  },
  bismillahText: {
    fontFamily: "'Amiri Quran','Amiri',serif", fontSize: "2.2rem",
    color: "#F0CC6E", direction: "rtl",
    textShadow: "0 2px 15px rgba(212,168,67,0.28)", lineHeight: 2,
  },

  // Ayahs
  ayahsContainer: { display: "flex", flexDirection: "column", gap: "1rem" },
  ayahCard: {
    background: "rgba(15,42,2,0.5)",
    border: "1px solid rgba(99,153,34,0.2)",
    borderRadius: 16, overflow: "hidden",
    animation: "fadeSlide 0.5s ease both",
    transition: "border-color 0.3s, background 0.3s, transform 0.22s",
  },
  ayahCardHover: {
    borderColor: "rgba(212,168,67,0.35)",
    background: "rgba(15,42,2,0.72)",
    transform: "translateY(-2px)",
  },
  ayahTop: {
    padding: "1.5rem 1.5rem 1rem",
    borderBottom: "1px solid rgba(99,153,34,0.1)",
    direction: "rtl",
  },
  ayahArabic: {
    fontFamily: "'Amiri Quran','Amiri',serif",
    fontSize: "1.75rem", lineHeight: 2.2,
    color: "#EAF3DE", textAlign: "right",
  },
  ayahNumInline: {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: 28, height: 28,
    background: "rgba(212,168,67,0.13)", border: "1px solid rgba(212,168,67,0.3)",
    borderRadius: "50%", fontFamily: "'Amiri',serif", fontSize: "0.85rem",
    color: "#F0CC6E", marginRight: 6, verticalAlign: "middle", direction: "ltr",
  },
  ayahBottom: { padding: "1rem 1.5rem 1.25rem", direction: "ltr" },
  ayahTranslit: {
    fontFamily: "'Amiri Quran','Amiri',serif",
    fontSize: "20px", color: "#ffff",
    fontStyle: "italic", lineHeight: 2, letterSpacing: "1px", marginBottom: "0.6rem", opacity: 0.88,
  },
  ayahDivider: { height: 1, background: "rgba(99,153,34,0.15)", margin: "0.6rem 0" },
  ayahTranslation: { fontSize: "0.88rem", color: "#B4B2A9", lineHeight: 1.8 },
  ayahFooter: { display: "flex", alignItems: "center", gap: 8, marginTop: "0.75rem" },
  ayahBadge: {
    fontSize: 10, color: "#F0CC6E",
    background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.25)",
    padding: "3px 10px", borderRadius: 20, letterSpacing: 1,
  },

  // Skeleton
  skel: {
    background: "rgba(99,153,34,0.09)", borderRadius: 6,
    animation: "pulse 1.5s infinite",
  },

  // Error
  errorBox: { textAlign: "center", color: "#C0DD97", padding: "3rem", gridColumn: "1/-1" },
}