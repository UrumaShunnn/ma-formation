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

export default function Hero() {
  return (
    <section
      id="presentation"
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#0A0A0A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 80,
        paddingBottom: 60,
        paddingLeft: 24,
        paddingRight: 24,
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {/* Glow top-right */}
      <div style={{ position: "absolute", top: -100, right: -150, width: 600, height: 600, borderRadius: "50%", background: "#7C3AED", opacity: 0.15, filter: "blur(200px)", pointerEvents: "none", zIndex: 0 }} />
      {/* Glow bottom-left */}
      <div style={{ position: "absolute", bottom: -50, left: -100, width: 400, height: 400, borderRadius: "50%", background: "#5B21B6", opacity: 0.1, filter: "blur(160px)", pointerEvents: "none", zIndex: 0 }} />

      {/* Inner container */}
      <div style={{
        maxWidth: 800,
        width: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 24,
        position: "relative",
        zIndex: 1,
      }}>

        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "#1A1A1A",
          border: "1px solid rgba(124,58,237,0.4)",
          borderRadius: 100,
          padding: "6px 16px",
        }}>
          <span style={{ fontSize: 14 }}>🔥</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#C4B5FD" }}>
            +378 membres actifs
          </span>
        </div>

        {/* H1 */}
        <h1 style={{
          fontFamily: "Syne, sans-serif",
          fontSize: "clamp(2.5rem, 4.5vw, 4rem)",
          fontWeight: 900,
          lineHeight: 1.1,
          color: "white",
          margin: 0,
        }}>
          <span style={{ display: "block" }}>Lance et scale ta boutique</span>
          <span style={{
            display: "block",
            marginTop: 6,
            background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #5B21B6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            e-commerce en 90 jours
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          color: "#9CA3AF",
          fontSize: 18,
          lineHeight: 1.7,
          maxWidth: 560,
          margin: 0,
        }}>
          L&apos;accélérateur le plus complet pour réussir dans le e-commerce —
          méthodes testées, communauté active, résultats prouvés.
        </p>

        {/* Video container */}
        <div style={{
          width: "100%",
          maxWidth: 760,
          aspectRatio: "16/9",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(124,58,237,0.3)",
          boxShadow: "0 0 60px rgba(124,58,237,0.2)",
          background: "#111111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}>
          {YOUTUBE_VIDEO_ID ? (
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0`}
              allowFullScreen
              title="Présentation de la formation"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            />
          ) : (
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              width: "100%",
              height: "100%",
            }}>
              <div style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 32px rgba(124,58,237,0.5)",
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M8 5.14v14l11-7-11-7z" /></svg>
              </div>
              <span style={{ color: "#6B7280", fontSize: 14 }}>🎬 Ta vidéo de présentation ici</span>
            </div>
          )}
        </div>

        {/* CTA button */}
        <a
          href={TYPEFORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
            color: "white",
            padding: "16px 40px",
            borderRadius: 12,
            fontSize: 18,
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            marginTop: 8,
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Candidater maintenant →
        </a>

        {/* Avatars + stars */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex" }}>
            {avatars.map((av, i) => (
              <div key={i} style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: av.bg,
                border: "2px solid #0A0A0A",
                marginLeft: i === 0 ? 0 : -8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 700,
                color: "#FFFFFF",
                zIndex: avatars.length - i,
                position: "relative",
                fontFamily: "Syne, sans-serif",
              }}>
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

        {/* Checklist */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 12,
          width: "100%",
          maxWidth: 640,
        }}>
          {checklist.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
              <div style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "rgba(124,58,237,0.2)",
                border: "1px solid rgba(124,58,237,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ color: "#D1D5DB", fontSize: 13 }}>{item}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
