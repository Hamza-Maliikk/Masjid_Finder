"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"

const links = [
  { href: "/", label: "Home" },
  { href: "/Dua", label: "Dua" },
  { href: "/Surah", label: "Surah" },
  { href: "/Store", label: "Store" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&display=swap');

        .navbar-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 14px 24px;
          /* NO background here — sirf padding hai */
        }

        .navbar-pill {
          max-width: 860px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 60px;
          padding: 10px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          /* overflow: hidden HATA DIYA — yahi blur leak ka asli masla tha */
          box-shadow: 0 4px 24px rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.05) inset;
        }

        /* Gold shimmer line — pseudo element se kaam nahi karega bina overflow:hidden ke,
           isliye inline div use karein ya hata dein */
        .navbar-shine {
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg,
            transparent,
            rgba(201, 168, 76, 0.3) 30%,
            rgba(201, 168, 76, 0.85) 50%,
            rgba(201, 168, 76, 0.3) 70%,
            transparent
          );
          border-radius: 60px;
          pointer-events: none;
        }

        .brand-area {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .brand-icon {
          font-size: 20px;
          line-height: 1;
          filter: drop-shadow(0 0 8px rgba(14, 158, 138, 0.3));
        }

        .brand-divider {
          width: 1px;
          height: 18px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent);
          margin: 0 2px;
        }

        .brand-text {
          font-family: 'Cinzel', serif;
          font-weight: 500;
          font-size: 0.92rem;
          letter-spacing: 0.18em;
          color: #c9a84c;
          text-shadow: 0 0 20px rgba(201, 168, 76, 0.35);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .nav-link {
          font-family: 'Cinzel', serif;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.45);
          padding: 7px 16px;
          border-radius: 40px;
          text-decoration: none;
          border: 1px solid transparent;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .nav-link:hover {
          color: rgba(255, 255, 255, 0.92);
          border-color: rgba(14, 158, 138, 0.25);
          background: rgba(14, 158, 138, 0.15);
        }

        .nav-link.active {
          background: linear-gradient(135deg, #0e9e8a, #07b89f);
          color: #fff;
          font-weight: 600;
          border-color: transparent;
          box-shadow: 0 3px 12px rgba(14, 158, 138, 0.3);
        }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: transparent;
          border: none;
          padding: 4px;
        }

        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: rgba(255, 255, 255, 0.75);
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Mobile dropdown */
        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 4px;
          padding: 8px 24px 4px;
          max-width: 860px;
          margin: 0 auto;
        }

        .mobile-menu .nav-link {
          font-size: 0.7rem;
          padding: 10px 20px;
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .mobile-menu.open {
          display: flex;
        }

        .navbar-spacer {
          height: 80px;
        }

        @media (max-width: 600px) {
          .navbar-wrapper {
            padding: 10px 14px;
          }

          .navbar-pill {
            padding: 8px 18px;
          }

          .nav-links {
            display: none;
          }

          .hamburger {
            display: flex;
          }

          .brand-text {
            font-size: 0.78rem;
            letter-spacing: 0.1em;
          }
        }
      `}</style>

      <div className="navbar-wrapper">
        <div className="navbar-pill">
          {/* Gold shimmer — ab div hai pseudo element nahi, overflow:hidden ki zaroorat nahi */}
          <div className="navbar-shine" />

          <Link href="/" className="brand-area">
            <span className="brand-icon">🕌</span>
            <div className="brand-divider" />
            <span className="brand-text">Masjid Finder</span>
          </Link>

          <nav className="nav-links">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn("nav-link", pathname === link.href && "active")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className={cn("hamburger", menuOpen && "open")}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={cn("mobile-menu", menuOpen && "open")}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn("nav-link", pathname === link.href && "active")}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="navbar-spacer" />
    </>
  )
}