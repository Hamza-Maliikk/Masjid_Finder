"use client";

// import { useState, useCallback, useEffect } from "react";
// import styles from "./page.module.css";
// import type { IMasjid } from "../models/Masjid";
// import { MapPin, Navigation } from "lucide-react";
// import { Poppins, Noto_Nastaliq_Urdu } from "next/font/google";

// const poppins = Poppins({
//   weight: ["300", "400", "500", "600", "700"],
//   subsets: ["latin"],
// });

// const nastaliq = Noto_Nastaliq_Urdu({
//   weight: ["400", "700"],
//   subsets: ["arabic"],
// });

// ─── TYPES ───────────────────────────────────────────────────────────────────
// interface IMasjidWithDist extends IMasjid {
//   dist: number;
// }

// // ─── HAVERSINE FORMULA ───────────────────────────────────────────────────────
// function getDistanceKm(
//   lat1: number,
//   lng1: number,
//   lat2: number,
//   lng2: number,
// ): number {
//   const R = 6371;
//   const dLat = ((lat2 - lat1) * Math.PI) / 180;
//   const dLng = ((lng2 - lng1) * Math.PI) / 180;
//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos((lat1 * Math.PI) / 180) *
//       Math.cos((lat2 * Math.PI) / 180) *
//       Math.sin(dLng / 2) ** 2;
//   return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// }

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function MasjidFinderPage() {
//   const [locLabel, setLocLabel] = useState("Apni location daain");
//   const [locDetected, setLocDetected] = useState(false);
//   const [locLoading, setLocLoading] = useState(false);
//   const [results, setResults] = useState<IMasjidWithDist[] | null>(null);
//   const [sortAsc, setSortAsc] = useState(true);
//   const [masjids, setMasjids] = useState<IMasjid[]>([]);
//   const [fetchError, setFetchError] = useState(false);
//   const [userCoords, setUserCoords] = useState<{
//     lat: number;
//     lng: number;
//   } | null>(null);

//   // ── DB se data fetch ──────────────────────────────────────────────────────
//   useEffect(() => {
//     async function getMasjids() {
//       try {
//         const res = await fetch("/api/test", {
//           headers: {
//             "ngrok-skip-browser-warning": "true",
//           },
//         });
//         const json = await res.json();
//         setMasjids(json.data);
//       } catch (err) {
//         console.error("Data fetch nahi hua:", err);
//         setFetchError(true);
//       }
//     }
//     getMasjids();
//   }, []);

  // ── REAL-TIME SEARCH — location ya masjids aaye to turant update ──────────
  // useEffect(() => {
  //   if (!userCoords || masjids.length === 0) return;

  //   console.log("User coords:", userCoords);
  //   console.log("Total masjids:", masjids.length);
  //   console.log("Sample masjid:", masjids[0]);

  //   const withDistance = masjids
  //     .map((m) => ({
  //       ...m,
  //       dist: parseFloat(
  //         getDistanceKm(userCoords.lat, userCoords.lng, m.lat, m.lng).toFixed(
  //           2,
  //         ),
  //       ),
  //     }))
  //     .filter((m) => m.dist <= 1)
  //     .sort((a, b) => (sortAsc ? a.dist - b.dist : b.dist - a.dist));

  //   setResults(withDistance as IMasjidWithDist[]);
  // }, [userCoords, masjids, sortAsc]);

  // ── Detect location ───────────────────────────────────────────────────────
  // const detectLocation = useCallback(() => {
  //   setLocLoading(true);
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (p) => {
  //         const lat = p.coords.latitude;
  //         const lng = p.coords.longitude;
  //         setUserCoords({ lat, lng });
  //         setLocLabel(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
  //         setLocDetected(true);
  //         setLocLoading(false);
  //       },
  //       () => {
  //         // Default — Karachi center
  //         setUserCoords({ lat: 24.8607, lng: 67.0011 });
  //         setLocLabel("Karachi (Default)");
  //         setLocDetected(true);
  //         setLocLoading(false);
  //       },
  //     );
  //   }
  // }, []);

  // ── Sort toggle ───────────────────────────────────────────────────────────
  // const toggleSort = () => setSortAsc((prev) => !prev);

  // return (
//     <div className={`${styles.wrapper} ${poppins.className}`}>
//       <div className={styles.container}>
//         {/* ── HERO ─────────────────────────────────────────────────────────── */}
//         <header className={styles.hero}>
//           <p className={`${styles.bismillah} ${nastaliq.className}`}>
//             بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
//           </p>
//           <div className={styles.domeIcon}>🕌</div>
//           <h1 className={`${styles.heroTitle} ${nastaliq.className}`}>
//             قریبی مسجد تلاش کریں
//           </h1>
//           <p className={styles.heroSubtitle}>
//             Karachi mein Jumma ki namaz ke liye qareeb ki masjid dhundein
//           </p>
//           <div className={styles.dbStatusBadge}>
//             {fetchError
//               ? "⚠️ Database Error"
//               : masjids.length > 0
//                 ? `✅ ${masjids.length} Masajid Loaded`
//                 : "⏳ Loading Data..."}
//           </div>
//         </header>

//         {/* ── LOCATION ─────────────────────────────────────────────────────── */}
//         <section className={styles.section}>
//           <div className={styles.secLabel}>📍 Aapki Location</div>
//           <div className={styles.locBox}>
//             <div className={styles.locIconWrap}>
//               <Navigation size={24} color="var(--gold)" />
//             </div>
//             <div className={styles.locText}>
//               <div className={styles.locMain}>{locLabel}</div>
//               <div className={styles.locSub}>
//                 {locDetected
//                   ? "Location Set — 1km ke andar masajid dikh rahi hain ✓"
//                   : "Detect via GPS for accuracy"}
//               </div>
//             </div>
//             <button
//               className={styles.locBtn}
//               onClick={detectLocation}
//               disabled={locLoading || locDetected}
//               style={
//                 locDetected ? { background: "#4ade80", color: "#0d3a27" } : {}
//               }
//             >
//               {locLoading ? "⏳" : locDetected ? "✓" : "Detect"}
//             </button>
//           </div>
//         </section>

//         {/* ── NO LOCATION WARNING ───────────────────────────────────────────── */}
//         {!locDetected && (
//           <div
//             style={{
//               textAlign: "center",
//               padding: "16px",
//               color: "rgba(255,255,255,0.5)",
//               fontSize: "13px",
//             }}
//           >
//             ⬆️ Pehle apni location detect karein
//           </div>
//         )}

//         {/* ── RESULTS ──────────────────────────────────────────────────────── */}
//         {results !== null && locDetected && (
//           <div className={styles.results}>
//             <div className={styles.resHeader}>
//               <div className={styles.resCount}>
//                 <span>{results.length}</span> Masajid Found (1km range)
//               </div>
//               <button className={styles.sortBtn} onClick={toggleSort}>
//                 {sortAsc ? "↑ Nearest First" : "↓ Furthest First"}
//               </button>
//             </div>

//             {results.length === 0 ? (
//               <div className={styles.noRes}>
//                 <div className={styles.noResEmoji}>🔍</div>
//                 <p>
//                   1km ke andar koi masjid nahi mili.
//                   <br />
//                   Database mein data check karein.
//                 </p>
//               </div>
//             ) : (
//               results.map((m, i) => (
//                 <MasjidCard key={String(m._id)} masjid={m} index={i} />
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// ─── DIVIDER ─────────────────────────────────────────────────────────────────
// function Divider({ label }: { label: string }) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: 12,
//         padding: "30px 20px 10px",
//       }}
//     >
//       <div
//         style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }}
//       />
//       <span
//         style={{
//           fontSize: 11,
//           color: "rgba(255,255,255,0.4)",
//           letterSpacing: 2,
//           textTransform: "uppercase",
//           fontWeight: 600,
//         }}
//       >
//         {label}
//       </span>
//       <div
//         style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }}
//       />
//     </div>
//   );
// }

// ─── MASJID CARD ─────────────────────────────────────────────────────────────
// function MasjidCard({
//   masjid,
//   index,
// }: {
//   masjid: IMasjidWithDist;
//   index: number;
// }) {
//   const openMap = () => {
//     const query = encodeURIComponent(
//       masjid.name + " " + masjid.area + " Karachi",
//     );
//     window.open(
//       `https://www.google.com/maps/search/?api=1&query=${query}`,
//       "_blank",
//     );
//   };

//   const distDisplay =
//     masjid.dist < 1
//       ? `${(masjid.dist * 1000).toFixed(0)}m`
//       : `${masjid.dist}km`;

  return (
    <h1>Islamic Masajid</h1>
  )
//     <div
//       className={styles.masjidCard}
//       style={{ animationDelay: `${index * 0.07}s` }}
//     >
//       <div className={styles.cardTop}>
//         <div style={{ flex: 1 }}>
//           <div className={styles.mName}>{masjid.name}</div>
//           <div className={styles.mArea}>📍 {masjid.area}</div>
//         </div>
//         <div className={styles.timeBadge}>
//           <div className={styles.tTime}>{masjid.timings?.juma ?? "--:--"}</div>
//           <div className={styles.tLabel}>Juma</div>
//         </div>
//         <button
//           onClick={openMap}
//           className={styles.mapBtn}
//           aria-label="Open in Maps"
//         >
//           <MapPin size={18} />
//         </button>
//       </div>
//       <div className={styles.cardInfo}>
//         <span className={styles.distBadge}>📏 {distDisplay}</span>
//         <span className={styles.infoChip}>👥 Cap: {masjid.cap ?? "N/A"}</span>
//         <span className={styles.infoChip}>
//           {masjid.parking ? "🅿️ Parking" : "🚫 No Parking"}
//         </span>
//       </div>
//     </div>
//   );
}
