"use client"
import type { IDua } from "@/models/Dua"
import { useEffect, useState } from "react"

export default function DuasPage() {
  const [duas, setDuas] = useState<IDua[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    const link = document.createElement("link")
    link.href =
      "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Tajawal:wght@300;400;500;700&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    fetch("/api/dua", {
      headers: { "ngrok-skip-browser-warning": "true" },
    })
      .then((res) => res.json())
      .then((data) => {
        setDuas(data.data || [])
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  const filtered = duas.filter(
    (d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.translation.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0a1628 0%, #0d2137 40%, #0f2d40 70%, #112235 100%)",
        fontFamily: "'Tajawal', sans-serif",
        color: "#e0f0ff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow effects */}
      <div
        style={{
          position: "fixed",
          top: "-80px",
          right: "-80px",
          width: "350px",
          height: "350px",
          background: "radial-gradient(circle, rgba(0,168,120,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "-60px",
          width: "280px",
          height: "280px",
          background: "radial-gradient(circle, rgba(0,140,100,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "2.5rem 1.5rem 1.5rem", position: "relative", zIndex: 1 }}>
        {/* Bismillah */}
        <div
          style={{
            fontFamily: "'Amiri', serif",
            fontSize: "2rem",
            color: "#c9a84c",
            marginBottom: "0.5rem",
            direction: "rtl",
            textShadow: "0 0 20px rgba(201,168,76,0.25)",
          }}
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </div>

        {/* Badge */}
        <div style={{ marginBottom: "0.75rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(0,180,120,0.15)",
              border: "1px solid rgba(0,180,120,0.4)",
              color: "#4cd8a0",
              fontSize: "11px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              padding: "5px 14px",
              borderRadius: "20px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#4cd8a0",
                display: "inline-block",
              }}
            />
            Daily Remembrance
          </span>
        </div>

        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#e8f4ff", margin: "0 0 0.3rem", letterSpacing: "-0.5px" }}>
          Islamic Duas
        </h1>
        <p style={{ color: "#7ab8d4", fontWeight: 300, margin: 0, fontSize: "0.9rem" }}>
          Supplications for every moment of your day
        </p>

        {/* Status */}
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
              ? "Loading duas..."
              : error
              ? "Data load nahi hua. Server check karein."
              : `${duas.length} Duas loaded`}
          </span>
        </div>
      </div>

      {/* Search */}
      <div style={{ maxWidth: "460px", margin: "0 auto 1.5rem", padding: "0 1rem", position: "relative", zIndex: 1 }}>
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#00b47c",
              fontSize: "16px",
            }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Dua search karein..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 18px 12px 44px",
              borderRadius: "40px",
              border: "1px solid rgba(0,180,120,0.3)",
              background: "rgba(10,22,40,0.75)",
              color: "#e0f0ff",
              fontSize: "14px",
              fontFamily: "'Tajawal', sans-serif",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,180,120,0.6)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,180,120,0.3)")}
          />
        </div>
        {search && (
          <p style={{ textAlign: "center", fontSize: "12px", color: "#4cd8a0", marginTop: "0.4rem" }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} mile
          </p>
        )}
      </div>

      {/* Cards Grid */}
      <div
        style={{
          maxWidth: "1060px",
          margin: "0 auto",
          padding: "0 1rem 3rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {loading ? (
          /* Skeleton loaders */
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                background: "rgba(13,33,55,0.6)",
                border: "1px solid rgba(0,160,110,0.1)",
                borderRadius: "14px",
                padding: "1.25rem",
                animation: "pulse 1.5s infinite",
              }}
            >
              <div style={{ height: "8px", background: "rgba(0,160,110,0.15)", borderRadius: "4px", width: "30%", marginBottom: "12px" }} />
              <div style={{ height: "12px", background: "rgba(0,160,110,0.15)", borderRadius: "4px", width: "65%", marginBottom: "16px" }} />
              <div style={{ height: "36px", background: "rgba(0,160,110,0.08)", borderRadius: "4px", marginBottom: "12px" }} />
              <div style={{ height: "8px", background: "rgba(0,160,110,0.12)", borderRadius: "4px", width: "75%" }} />
            </div>
          ))
        ) : error ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#f87171", padding: "3rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
            <p>Database se data nahi aaya. Server check karein.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#4cd8a0", padding: "3rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
            <p>&quot;{search}&quot; ke liye koi dua nahi mili</p>
          </div>
        ) : (
          filtered.map((dua, i) => {
            const id = String(dua._id)
            const isHovered = hoveredId === id
            return (
              <div
                key={id}
                style={{
                  background: isHovered ? "rgba(13,33,55,0.92)" : "rgba(13,33,55,0.75)",
                  border: `1px solid ${isHovered ? "rgba(0,180,120,0.5)" : "rgba(0,160,110,0.2)"}`,
                  borderRadius: "14px",
                  padding: "1.25rem",
                  transition: "transform 0.2s, border-color 0.2s, background 0.2s",
                  transform: isHovered ? "translateY(-3px)" : "none",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Top accent line on hover */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "linear-gradient(90deg, transparent, rgba(0,180,120,0.6), transparent)",
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.2s",
                  }}
                />

                {/* Dua number */}
                <div
                  style={{
                    fontSize: "10px",
                    letterSpacing: "2px",
                    color: "#00b47c",
                    fontWeight: 700,
                    marginBottom: "0.4rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  DUA {String(i + 1).padStart(2, "0")}
                  <div style={{ flex: 1, height: "1px", background: "rgba(0,160,110,0.2)" }} />
                </div>

                {/* Title */}
                <div style={{ fontSize: "0.95rem", fontWeight: 500, color: "#a8d8f0", marginBottom: "0.9rem" }}>
                  {dua.title}
                </div>

                {/* Arabic */}
                <div
                  style={{
                    fontFamily: "'Amiri', serif",
                    fontSize: "1.5rem",
                    color: "#f0e8d0",
                    textAlign: "right",
                    direction: "rtl",
                    borderRight: "3px solid #00b47c",
                    paddingRight: "10px",
                    marginBottom: "0.8rem",
                    lineHeight: 2,
                    textShadow: "0 0 12px rgba(201,168,76,0.15)",
                  }}
                >
                  {dua.arabic}
                </div>

                {/* Transliteration */}
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "#6ab4cc",
                    fontStyle: "italic",
                    marginBottom: "0.6rem",
                    lineHeight: 1.6,
                  }}
                >
                  {dua.transliteration}
                </div>

                {/* Divider */}
                <div style={{ height: "1px", background: "rgba(0,160,110,0.15)", margin: "0.6rem 0" }} />

                {/* Translation */}
                <div style={{ fontSize: "0.82rem", color: "#9ab0be", lineHeight: 1.7 }}>
                  {dua.translation}
                </div>
              </div>
            )
          })
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1 }
          50% { opacity: 0.5 }
        }
        input::placeholder {
          color: rgba(122, 184, 212, 0.45);
        }
      `}</style>
    </div>
  )
}