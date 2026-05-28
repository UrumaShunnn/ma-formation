"use client";

const TYPEFORM_URL = "https://form.typeform.com/to/XXXXXXXX";
const YOUTUBE_VIDEO_ID = "";

const avatars = [
  { initials: "ML", bg: "#7C3AED" },
  { initials: "SA", bg: "#6D28D9" },
  { initials: "TR", bg: "#5B21B6" },
  { initials: "KD", bg: "#8B5CF6" },
  { initials: "JB", bg: "#4C1D95" },
];

const checklist = [
  "Formation complète",
  "Accompagnement à vie",
  "Méthodes testées",
  "Communauté active",
];

const noiseSVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height%3E%3C/svg%3E")`;

export default function Hero() {
  return (
    <section
      id="presentation"
      className="w-full pt-24 pb-16 md:pb-24 bg-[#0A0A0A] overflow-hidden relative z-10"
    >
      {/* Grain */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: noiseSVG, backgroundRepeat: "repeat", backgroundSize: "128px 128px", opacity: 0.03, pointerEvents: "none", zIndex: 0 }} />
      {/* Glow top-right */}
      <div aria-hidden="true" style={{ position: "absolute", top: -100, right: -150, width: 600, height: 600, borderRadius: "50%", background: "#7C3AED", opacity: 0.15, filter: "blur(200px)", pointerEvents: "none", zIndex: 0 }} />
      {/* Glow bottom-left */}
      <div aria-hidden="true" style={{ position: "absolute", bottom: -50, left: -100, width: 400, height: 400, borderRadius: "50%", background: "#5B21B6", opacity: 0.1, filter: "blur(160px)", pointerEvents: "none", zIndex: 0 }} />

      <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-6 relative z-10">

        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1A1A1A", border: "1px solid rgba(124,58,237,0.4)", borderRadius: 100, padding: "6px 16px", animation: "pulse 2.5s ease-in-out infinite" }}>
          <span style={{ fontSize: 14 }}>🔥</span>
          <span style={{ fontSize: 13, fontWeight: 500, background: "linear-gradient(90deg, #8B5CF6 0%, #C4B5FD 50%, #8B5CF6 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmer 2.5s linear infinite" }}>
            +378 membres actifs
          </span>
        </div>

        {/* H1 */}
        <h1
          className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight"
          style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.02em", animation: "fadeInUp 0.6s ease 100ms both" }}
        >
          <span style={{ color: "#FFFFFF", display: "block" }}>Lance et scale ta boutique</span>
          <span style={{ display: "block", marginTop: 4, background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #5B21B6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            e-commerce en 90 jours
          </span>
        </h1>

        {/* Sous-titre */}
        <p className="text-base md:text-xl" style={{ color: "#9CA3AF", lineHeight: 1.7, maxWidth: 560, animation: "fadeInUp 0.6s ease 200ms both" }}>
          L&apos;accélérateur le plus complet pour réussir dans le e-commerce —
          méthodes testées, communauté active, résultats prouvés.
        </p>

        {/* Vidéo */}
        <div
          className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden"
          style={{ position: "relative", aspectRatio: "16/9", border: "1px solid rgba(124,58,237,0.3)", boxShadow: "0 0 60px rgba(124,58,237,0.2)", animation: "fadeInUp 0.6s ease 300ms both" }}
        >
          {YOUTUBE_VIDEO_ID ? (
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0`}
              allowFullScreen
              title="Présentation de la formation"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            />
          ) : (
            <div
              style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #111111 0%, #1A1A1A 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}
              role="img"
              aria-label="Vidéo de présentation"
            >
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 32px rgba(124,58,237,0.5)", animation: "float 3s ease-in-out infinite" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M8 5.14v14l11-7-11-7z" /></svg>
              </div>
              <span style={{ color: "#6B7280", fontSize: 14 }}>🎬 Ta vidéo de présentation ici</span>
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
            </div>
          )}
        </div>

        {/* CTA + social proof */}
        <div className="w-full flex flex-col items-center gap-5" style={{ animation: "fadeInUp 0.6s ease 400ms both" }}>
          <a
            href={TYPEFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-xl font-bold text-white text-lg"
            style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)", textDecoration: "none", transition: "transform 200ms ease, box-shadow 200ms ease", boxShadow: "0 4px 24px rgba(124,58,237,0.3)" }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1.03)"; el.style.boxShadow = "0 8px 40px rgba(124,58,237,0.5)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1)"; el.style.boxShadow = "0 4px 24px rgba(124,58,237,0.3)"; }}
          >
            Candidater maintenant →
          </a>

          {/* Avatars + stars */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div style={{ display: "flex" }}>
              {avatars.map((av, i) => (
                <div key={i} style={{ width: 32, height: 32, borderRadius: "50%", background: av.bg, border: "2px solid #0A0A0A", marginLeft: i === 0 ? 0 : -8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#FFFFFF", zIndex: avatars.length - i, position: "relative", fontFamily: "Syne, sans-serif" }}>
                  {av.initials}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <div style={{ display: "flex", gap: 2 }}>
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#F59E0B", fontSize: 13 }}>★</span>)}
              </div>
              <span style={{ color: "#9CA3AF", fontSize: 12 }}>+378 membres ont déjà rejoint</span>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl mx-auto" style={{ animation: "fadeInUp 0.6s ease 500ms both" }}>
          {checklist.map((item, i) => (
            <div key={i} className="flex items-center gap-2 justify-center">
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ color: "#D1D5DB", fontSize: 13 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.75} }`}</style>
    </section>
  );
}
