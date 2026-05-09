"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/Dua", label: "Dua" },
  { href: "/Surah", label: "Surah" },
  { href: "/Store", label: "Store" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b-[2px] border-[#c9a84c] text-white shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
      style={{
        background: "linear-gradient(160deg, #0d3a27 0%, #1a6b4a 60%, #2d9e6e 100%)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex h-[72px] items-center justify-between">
          <Link href="/" className="flex items-center gap-3 font-serif text-2xl font-bold tracking-wide text-[#c9a84c] transition-transform hover:scale-105" style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}>
            <span className="text-3xl drop-shadow-[0_2px_8px_rgba(201,168,76,0.4)]">🕌</span>
            <span className="mt-1" style={{ letterSpacing: '1px' }}>Masjid Finder</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-[15px] font-semibold tracking-wide transition-all duration-300 hover:text-[#e8c97a]",
                  pathname === link.href 
                    ? "text-[#c9a84c] after:absolute after:-bottom-[26px] after:left-0 after:h-[2px] after:w-full after:bg-[#c9a84c] after:shadow-[0_0_8px_#c9a84c]" 
                    : "text-white/90"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden rounded-lg p-2 text-[#c9a84c] transition-colors hover:bg-white/10 active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out md:hidden border-t border-[#c9a84c]/30",
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 border-transparent"
        )}
        style={{
          background: "linear-gradient(160deg, #0d3a27 0%, #1a6b4a 100%)",
        }}
      >
        <nav className="flex flex-col space-y-1 px-4 py-4 relative z-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "rounded-xl px-4 py-3 text-base font-semibold transition-all duration-200",
                pathname === link.href 
                  ? "bg-[#c9a84c]/20 text-[#c9a84c] shadow-[0_0_12px_rgba(201,168,76,0.15)] border border-[#c9a84c]/30" 
                  : "text-white/90 hover:bg-white/10 hover:text-[#e8c97a]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}