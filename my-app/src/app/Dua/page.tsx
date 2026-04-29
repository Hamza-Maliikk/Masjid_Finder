"use client"
import type {IDua} from "@/models/Dua"
import { useEffect, useState } from "react"



export default function DuasPage() {
  const [duas, setDuas] = useState<IDua[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/masjids")
      .then(res => res.json())
      .then(data => {
        setDuas(data.duas || [])
        setLoading(false)
      })
  }, [])

  const filtered = duas.filter(d =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.translation.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #173404 0%, #27500A 40%, #3B6D11 100%)", fontFamily: "'Outfit', sans-serif" }}>
      
      {/* Hero */}
      <div className="text-center py-12 px-6">
        <span style={{ background: "rgba(97,153,34,0.25)", border: "1px solid rgba(97,153,34,0.5)", color: "#C0DD97", fontSize: "12px", letterSpacing: "2px", padding: "6px 16px", borderRadius: "20px", display: "inline-block", marginBottom: "1rem" }}>
          DAILY REMEMBRANCE
        </span>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 600, color: "#EAF3DE" }}>Islamic Duas</h1>
        <p style={{ color: "#97C459", fontWeight: 300 }}>Supplications for every moment of your day</p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto px-4 mb-8">
        <input
          type="text"
          placeholder="Search duas..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", padding: "14px 20px", borderRadius: "50px", border: "1px solid rgba(97,153,34,0.4)", background: "rgba(23,52,4,0.7)", color: "#EAF3DE", fontSize: "15px", outline: "none" }}
        />
      </div>

      {/* Cards Grid */}
      <div className="max-w-5xl mx-auto px-4 pb-12 grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
        {loading ? (
          <p style={{ color: "#639922", textAlign: "center", gridColumn: "1/-1" }}>Loading duas...</p>
        ) : filtered.map((dua, i) => (
          <div key={dua._id} style={{ background: "rgba(23,52,4,0.6)", border: "1px solid rgba(97,153,34,0.3)", borderRadius: "16px", padding: "1.5rem", transition: "transform .2s, border-color .2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(97,153,34,0.7)" }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(97,153,34,0.3)" }}
          >
            <div style={{ fontSize: "11px", color: "#639922", letterSpacing: "1.5px", marginBottom: ".5rem" }}>DUA {String(i + 1).padStart(2, "0")}</div>
            <div style={{ fontSize: "1rem", fontWeight: 500, color: "#C0DD97", marginBottom: "1rem" }}>{dua.title}</div>
            <div style={{ fontFamily: "'Amiri', serif", fontSize: "1.5rem", color: "#EAF3DE", textAlign: "right", direction: "rtl", borderRight: "3px solid #639922", paddingRight: "12px", marginBottom: "1rem", lineHeight: 2 }}>
              {dua.arabic}
            </div>
            <div style={{ fontSize: ".8rem", color: "#97C459", fontStyle: "italic", marginBottom: ".75rem", lineHeight: 1.6 }}>
              {dua.transliteration}
            </div>
            <div style={{ height: "1px", background: "rgba(97,153,34,0.2)", margin: ".75rem 0" }} />
            <div style={{ fontSize: ".85rem", color: "#B4B2A9", lineHeight: 1.7 }}>{dua.translation}</div>
          </div>
        ))}
      </div>
    </div>
  )
}