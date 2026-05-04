"use client"
import type { IDua } from "@/models/Dua"
import { useEffect, useState } from "react"

export default function DuasPage() {
  const [duas, setDuas] = useState<IDua[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Amiri font load karo
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Outfit:wght@300;400;500;600&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    // Data fetch karo
    fetch("/api/dua", {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    })
      .then(res => res.json())
      .then(data => {
        setDuas(data.data || [])
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  const filtered = duas.filter(d =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.translation.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #173404 0%, #27500A 40%, #3B6D11 100%)", fontFamily: "'Outfit', sans-serif" }}>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "3rem 1.5rem 2rem" }}>
        <span style={{ background: "rgba(97,153,34,0.25)", border: "1px solid rgba(97,153,34,0.5)", color: "#C0DD97", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", padding: "6px 16px", borderRadius: "20px", display: "inline-block", marginBottom: "1rem" }}>
          Daily Remembrance
        </span>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 600, color: "#EAF3DE", margin: "0 0 .5rem" }}>
          Islamic Duas
        </h1>
        <p style={{ color: "#97C459", fontWeight: 300, margin: 0 }}>
          Supplications for every moment of your day
        </p>

        {/* Status */}
        <p style={{ marginTop: "1rem", fontSize: "12px", color: "rgba(97,153,34,0.7)" }}>
          {loading ? "⏳ Loading..." : error ? "⚠️ Data load nahi hua" : `✅ ${duas.length} duas loaded`}
        </p>
      </div>

      {/* Search */}
      <div style={{ maxWidth: "480px", margin: "0 auto 2rem", padding: "0 1rem" }}>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: "18px", top: "50%", transform: "translateY(-50%)", color: "#639922", fontSize: "16px" }}>🔍</span>
          <input
            type="text"
            placeholder="Search duas..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: "100%", padding: "14px 20px 14px 46px", borderRadius: "50px", border: "1px solid rgba(97,153,34,0.4)", background: "rgba(23,52,4,0.7)", color: "#EAF3DE", fontSize: "15px", outline: "none", fontFamily: "'Outfit', sans-serif", boxSizing: "border-box" }}
          />
        </div>
        {search && (
          <p style={{ color: "#639922", fontSize: "12px", marginTop: ".5rem", textAlign: "center" }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} mili
          </p>
        )}
      </div>

      {/* Cards Grid */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1rem 3rem", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>

        {loading ? (
          // Loading skeletons
          [...Array(6)].map((_, i) => (
            <div key={i} style={{ background: "rgba(23,52,4,0.4)", border: "1px solid rgba(97,153,34,0.15)", borderRadius: "16px", padding: "1.5rem", minHeight: "220px", animation: "pulse 1.5s infinite" }}>
              <div style={{ height: "10px", background: "rgba(97,153,34,0.2)", borderRadius: "4px", marginBottom: "1rem", width: "40%" }} />
              <div style={{ height: "14px", background: "rgba(97,153,34,0.2)", borderRadius: "4px", marginBottom: "1.5rem", width: "70%" }} />
              <div style={{ height: "40px", background: "rgba(97,153,34,0.1)", borderRadius: "4px", marginBottom: "1rem" }} />
              <div style={{ height: "10px", background: "rgba(97,153,34,0.15)", borderRadius: "4px", width: "80%" }} />
            </div>
          ))
        ) : error ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#C0DD97", padding: "3rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
            <p>Database se data nahi aaya. Server check karein.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#639922", padding: "3rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
            <p>Koi dua nahi mili "{search}" ke liye</p>
          </div>
        ) : (
          filtered.map((dua, i) => (
            <div
              key={String(dua._id)}
              style={{ background: "rgba(23,52,4,0.6)", border: "1px solid rgba(97,153,34,0.3)", borderRadius: "16px", padding: "1.5rem", transition: "transform .2s, border-color .2s, background .2s", cursor: "default" }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = "translateY(-4px)"
                el.style.borderColor = "rgba(97,153,34,0.7)"
                el.style.background = "rgba(23,52,4,0.8)"
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = ""
                el.style.borderColor = "rgba(97,153,34,0.3)"
                el.style.background = "rgba(23,52,4,0.6)"
              }}
            >
              {/* Number */}
              <div style={{ fontSize: "11px", color: "#639922", letterSpacing: "1.5px", marginBottom: ".5rem", fontWeight: 600 }}>
                DUA {String(i + 1).padStart(2, "0")}
              </div>

              {/* Title */}
              <div style={{ fontSize: "1rem", fontWeight: 500, color: "#C0DD97", marginBottom: "1rem" }}>
                {dua.title}
              </div>

              {/* Arabic */}
              <div style={{ fontFamily: "'Amiri', serif", fontSize: "1.6rem", color: "#EAF3DE", textAlign: "right", direction: "rtl", borderRight: "3px solid #639922", paddingRight: "12px", marginBottom: "1rem", lineHeight: 2 }}>
                {dua.arabic}
              </div>

              {/* Transliteration */}
              <div style={{ fontSize: ".8rem", color: "#97C459", fontStyle: "italic", marginBottom: ".75rem", lineHeight: 1.6 }}>
                {dua.transliteration}
              </div>

              <div style={{ height: "1px", background: "rgba(97,153,34,0.2)", margin: ".75rem 0" }} />

              {/* Translation */}
              <div style={{ fontSize: ".85rem", color: "#B4B2A9", lineHeight: 1.7 }}>
                {dua.translation}
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1 }
          50% { opacity: 0.5 }
        }
      `}</style>
    </div>
  )
}