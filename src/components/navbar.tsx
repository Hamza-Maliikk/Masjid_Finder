"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/Dua", label: "Dua" },
  { href: "/Surah", label: "Surah" },
  { href: "/Store", label: "Store" },
]

export default function Navbar() {
  const pathname = usePathname()

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
        }

        .navbar-pill {
          max-width: 860px;
          margin: 0 auto;
          background: rgba(5, 40, 20, 0.45);
          backdrop-filter: blur(28px) saturate(200%) brightness(1.1);
          -webkit-backdrop-filter: blur(28px) saturate(200%) brightness(1.1);
          border: 1px solid rgba(196, 164, 72, 0.25);
          border-radius: 60px;
          padding: 10px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow:
            0 4px 24px rgba(0, 0, 0, 0.35),
            0 1px 0 rgba(196, 164, 72, 0.15) inset,
            0 0 0 1px rgba(255,255,255,0.04) inset;
          position: relative;
          overflow: hidden;
        }

        /* shimmer top highlight */
        .navbar-pill::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg,
            transparent,
            rgba(196, 164, 72, 0.5) 35%,
            rgba(255, 220, 120, 0.9) 50%,
            rgba(196, 164, 72, 0.5) 65%,
            transparent
          );
        }

        .brand-text {
          font-family: 'Cinzel', serif;
          font-weight: 500;
          font-size: 1rem;
          letter-spacing: 0.15em;
          background: linear-gradient(135deg, #e8d5a3 0%, #c4a448 50%, #f0e0b0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .brand-text:hover { opacity: 0.8; }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .nav-link {
          font-family: 'Cinzel', serif;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 400;
          color: rgba(220, 200, 150, 0.7);
          padding: 7px 16px;
          border-radius: 40px;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          white-space: nowrap;
        }

        .nav-link:hover {
          color: #f0e0a0;
          background: rgba(196, 164, 72, 0.12);
        }

        .nav-link.active {
          color: #1a3a1a;
          background: linear-gradient(135deg, #c4a448, #e8c96a, #c4a448);
          font-weight: 600;
          box-shadow:
            0 2px 12px rgba(196, 164, 72, 0.45),
            0 1px 0 rgba(255,255,255,0.25) inset;
        }

        .navbar-spacer {
          height: 80px;
        }
      `}</style>

      <div className="navbar-wrapper">
        <div className="navbar-pill">
          <Link href="/" className="brand-text">MyApp</Link>

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
        </div>
      </div>

      <div className="navbar-spacer" />
    </>
  )
}