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
          background: transparent;
        }

        .navbar-pill {
          max-width: 860px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 60px;
          padding: 10px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.05) inset;
        }

        .navbar-pill::before {
          content: '';
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

        .navbar-spacer {
          height: 80px;
        }
      `}</style>

      <div className="navbar-wrapper">
        <div className="navbar-pill">
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
        </div>
      </div>

      <div className="navbar-spacer" />
    </>
  )
}