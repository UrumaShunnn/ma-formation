"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const screenshotRows = [
  Array.from({ length: 7 }, (_, i) => ({ id: i, label: `Résultat ${i + 1}`, accent: i % 2 === 0 })),
  Array.from({ length: 7 }, (_, i) => ({ id: i + 7, label: `Résultat ${i + 8}`, accent: i % 3 === 0 })),
];

const testimonials = [
  { id: 1, name: "Marie L.", quote: "J'ai généré mes premiers 5k€ en 3 semaines — je n'y croyais pas vraiment au départ.", videoId: "" },
  { id: 2, name: "Thomas R.", quote: "La méthode a complètement changé mon approche du e-commerce. Résultats dès la première semaine.", videoId: "" },
  { id: 3, name: "Sarah M.", quote: "Passé de 0 à 15k€/mois en 2 mois. La communauté m'a portée à chaque blocage.", videoId: "" },
  { id: 4, name: "Karim B.", quote: "Le meilleur investissement que j'ai fait. ROI en moins d'un mois.", videoId: "" },
];

function ScreenshotCard({ label, accent }: { label: string; accent: boolean }) {
  return (
    <div style={{ width: 180, height: 270, flexShrink: 0, background: accent ? "linear-gradient(160deg,#1A1A1A,#16103A)" : "linear-gradient(160deg,#1A1A1A,#111111)", borderRadius: 12, border: `1px solid ${accent ? "rgba(124,58,237,0.3)" : "#2A2A2A"}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(124,58,237,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 5h16M4 10h10M4 15h12M4 20h8" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </div>
      <span style={{ color: "#4B5563", fontSize: 11, zIndex: 1, textAlign: "center", padding: "0 12px" }}>{label}</span>
    </div>
  );
}

function MarqueeRow({ items, direction }: { items: (typeof screenshotRows)[number]; direction: "left" | "right" }) {
  const [paused, setPaused] = useState(false);
  const repeated = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", width: "100%" }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div style={{ display: "flex", gap: 12, width: "max-content", animation: `${direction === "left" ? "marquee" : "marqueeRight"} 28s linear infinite`, animationPlayState: paused ? "paused" : "running" }}>
        {repeated.map((item, i) => <ScreenshotCard key={`${item.id}-${i}`} label={item.label} accent={item.accent} />)}
      </div>
    </div>
  );
}

function TestimonialCard({ t, onPlay }: { t: (typeof testimonials)[number]; onPlay: (videoId: string) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ background: "#111111", borderRadius: 16, border: `1px solid ${hovered ? "rgba(124,58,237,0.35)" : "#2A2A2A"}`, overflow: "hidden", transition: "border-color 250ms ease", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => onPlay(t.videoId)} role="button" aria-label={`Voir le témoignage de ${t.name}`} tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onPlay(t.videoId)}>
      <div style={{ aspectRatio: "9/16", background: "linear-gradient(160deg,#1A1A1A,#0F0A20)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(124,58,237,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.05) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
        <div style={{ transform: hovered ? "scale(1.1)" : "scale(1)", transition: "transform 250ms ease", zIndex: 1 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#5B21B6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 32px rgba(124,58,237,0.5)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5.14v14l11-7-11-7z" /></svg>
          </div>
        </div>
        <span style={{ color: "#4B5563", fontSize: 12, zIndex: 1 }}>{t.videoId ? "Voir le témoignage" : "Vidéo à venir"}</span>
      </div>
      <div style={{ padding: "16px 16px 20px" }}>
        <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 16, color: "#FFFFFF", marginBottom: 8 }}>{t.name}</p>
        <p style={{ color: "#9CA3AF", fontSize: 13, fontStyle: "italic", lineHeight: 1.6 }}>&ldquo;{t.quote}&rdquo;</p>
      </div>
    </div>
  );
}

function Lightbox({ videoId, onClose }: { videoId: string; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div ref={overlayRef} onClick={(e) => e.target === overlayRef.current && onClose()}
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, animation: "fadeInUp 0.25s ease" }}>
      <div style={{ position: "relative", width: "100%", maxWidth: 800 }}>
        <button onClick={onClose} aria-label="Fermer"
          style={{ position: "absolute", top: -44, right: 0, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%", width: 36, height: 36, color: "#FFFFFF", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        <div style={{ aspectRatio: "16/9", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(124,58,237,0.3)", background: "#111111", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {videoId ? (
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} allowFullScreen allow="autoplay; encrypted-media" title="Témoignage vidéo" style={{ width: "100%", height: "100%", border: "none" }} />
          ) : (
            <p style={{ color: "#4B5563", fontSize: 15 }}>Vidéo non disponible pour l&apos;instant</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const openLightbox = useCallback((videoId: string) => setActiveVideo(videoId), []);
  const closeLightbox = useCallback(() => setActiveVideo(null), []);

  return (
    <>
      <section id="temoignages" className="w-full py-16 md:py-24" style={{ background: "#0A0A0A" }}>

        {/* Header */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4" style={{ fontFamily: "Syne, sans-serif", color: "#FFFFFF", lineHeight: 1.2 }}>
            Ils ont rejoint...{" "}
            <span style={{ background: "linear-gradient(135deg,#8B5CF6,#5B21B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              voici ce qui a changé
            </span>
          </h2>
          <p style={{ color: "#6B7280", fontSize: 16 }}>Des résultats réels, de vraies personnes.</p>
        </div>

        {/* Screenshots — full-width marquee, no px constraint */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 64, overflow: "hidden" }}>
          <MarqueeRow items={screenshotRows[0]} direction="left" />
          <MarqueeRow items={screenshotRows[1]} direction="right" />
        </div>

        {/* Vidéos témoignages + confiance */}
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonials.map((t) => <TestimonialCard key={t.id} t={t} onPlay={openLightbox} />)}
          </div>
          <div style={{ textAlign: "center", marginTop: 48, paddingTop: 24, borderTop: "1px solid #1A1A1A" }}>
            <p style={{ fontSize: 15 }}>
              <span style={{ color: "#F59E0B", letterSpacing: 2 }}>★★★★★</span>{" "}
              <span style={{ color: "#D1D5DB" }}>Note moyenne : <strong style={{ color: "#FFFFFF", fontFamily: "Syne, sans-serif" }}>4.9/5</strong> basée sur les retours membres</span>
            </p>
          </div>
        </div>
      </section>

      {activeVideo !== null && <Lightbox videoId={activeVideo} onClose={closeLightbox} />}

      <style>{`
        @keyframes marqueeRight { from{transform:translateX(-50%)} to{transform:translateX(0)} }
      `}</style>
    </>
  );
}
