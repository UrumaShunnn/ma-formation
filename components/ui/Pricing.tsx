"use client";

import { useEffect, useRef, useState } from "react";

const TYPEFORM_URL = "https://form.typeform.com/to/XXXXXXXX";

const includes = [
  "Formation e-commerce complète (12 modules)",
  "Accompagnement à vie & accès illimité",
  "Coaching live chaque semaine",
  "Communauté privée ultra-active",
  "Méthodes et scripts exclusifs",
  "Études de cas avec produits révélés",
  "Templates IA + fichiers ressources",
  "Accès à tous les événements",
  "Mises à jour gratuites à vie",
];

const miniTestimonials = [
  { name: "Marie L.", text: "Meilleur investissement de ma vie, rentabilisé en 3 semaines." },
  { name: "Thomas R.", text: "La communauté seule vaut déjà le prix. Le reste est du bonus." },
  { name: "Sarah M.", text: "J'aurais payé 3× le prix pour la valeur que j'ai reçue." },
];

function CheckItem({ text }: { text: string }) {
  return (
    <li style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "rgba(124,58,237,0.2)",
          border: "1px solid rgba(124,58,237,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 1,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 6l3 3 5-5"
            stroke="#8B5CF6"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span style={{ color: "#E5E7EB", fontSize: 15, lineHeight: 1.5 }}>{text}</span>
    </li>
  );
}

export default function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="rejoindre"
      style={{ background: "#0A0A0A", padding: "100px 24px", position: "relative", overflow: "hidden" }}
    >
      {/* Glow de fond centré */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "#7C3AED",
          opacity: 0.06,
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
              borderRadius: 100,
              padding: "5px 16px",
              fontSize: 12,
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: 20,
              fontFamily: "Syne, sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Accès Limité
          </span>

          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 46px)",
              color: "#FFFFFF",
              marginBottom: 12,
              lineHeight: 1.15,
            }}
          >
            Rejoins la formation{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              aujourd&apos;hui
            </span>
          </h2>

          <p style={{ color: "#6B7280", fontSize: 17, maxWidth: 480, margin: "0 auto" }}>
            Rejoins une communauté d&apos;entrepreneurs qui passent à l&apos;action.
          </p>
        </div>

        {/* Carte pricing */}
        <div
          ref={ref}
          style={{
            maxWidth: 600,
            margin: "0 auto",
            background: "linear-gradient(135deg, #111111 0%, #1A0A2E 100%)",
            border: "2px solid #7C3AED",
            borderRadius: 24,
            padding: "48px",
            boxShadow: "0 0 80px rgba(124,58,237,0.25)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
            transition: "opacity 700ms ease, transform 700ms ease",
          }}
        >
          {/* Badge accès à vie */}
          <div style={{ marginBottom: 28, textAlign: "center" }}>
            <span
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
                borderRadius: 8,
                padding: "6px 20px",
                fontSize: 11,
                fontWeight: 700,
                color: "#FFFFFF",
                fontFamily: "Syne, sans-serif",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              ✦ Accès à Vie ✦
            </span>
          </div>

          {/* Titre + sous-titre carte */}
          <h3
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: 26,
              color: "#FFFFFF",
              textAlign: "center",
              marginBottom: 8,
              lineHeight: 1.25,
            }}
          >
            Formation Complète — Accès à Vie
          </h3>
          <p
            style={{
              color: "#9CA3AF",
              textAlign: "center",
              fontSize: 15,
              marginBottom: 32,
              lineHeight: 1.6,
            }}
          >
            Tout ce qu&apos;il te faut pour lancer et scaler ton e-commerce, en un seul endroit.
          </p>

          {/* Séparateur */}
          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)", marginBottom: 32 }} />

          {/* Liste */}
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
            {includes.map((item, i) => (
              <CheckItem key={i} text={item} />
            ))}
          </ul>

          {/* CTA principal */}
          <a
            href={TYPEFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
              color: "#FFFFFF",
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: 17,
              letterSpacing: "0.05em",
              borderRadius: 12,
              padding: "20px 32px",
              textDecoration: "none",
              transition: "transform 200ms ease, box-shadow 200ms ease",
              transform: ctaHovered ? "scale(1.02)" : "scale(1)",
              boxShadow: ctaHovered
                ? "0 0 48px rgba(124,58,237,0.6)"
                : "0 0 24px rgba(124,58,237,0.35)",
              animation: "ctaPulse 3s ease-in-out infinite",
            }}
          >
            CANDIDATER MAINTENANT →
          </a>

          {/* Reassurance */}
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            <p style={{ color: "#6B7280", fontSize: 13, textAlign: "center" }}>
              🔒 Paiement sécurisé — Accès immédiat après confirmation
            </p>
            <p
              style={{
                color: "#8B5CF6",
                fontSize: 13,
                fontWeight: 600,
                textAlign: "center",
                fontFamily: "Syne, sans-serif",
              }}
            >
              ⚡ Places limitées — 12 membres actifs cette semaine
            </p>
          </div>
        </div>

        {/* Social proof bas */}
        <div
          style={{
            maxWidth: 600,
            margin: "40px auto 0",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {miniTestimonials.map((t, i) => (
            <div
              key={i}
              style={{
                background: "#111111",
                border: "1px solid #2A2A2A",
                borderRadius: 12,
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 600ms ease ${400 + i * 100}ms, transform 600ms ease ${400 + i * 100}ms`,
              }}
            >
              {/* Avatar initiales */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  fontFamily: "Syne, sans-serif",
                  flexShrink: 0,
                }}
              >
                {t.name.split(" ")[0][0]}{t.name.split(" ")[1]?.[0] ?? ""}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 13, color: "#FFFFFF" }}>
                    {t.name}
                  </span>
                  <span style={{ color: "#F59E0B", fontSize: 12, letterSpacing: 1 }}>★★★★★</span>
                </div>
                <p style={{ color: "#9CA3AF", fontSize: 13, lineHeight: 1.4, margin: 0 }}>
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 0 24px rgba(124,58,237,0.35); }
          50%       { box-shadow: 0 0 48px rgba(124,58,237,0.55); }
        }
      `}</style>
    </section>
  );
}
