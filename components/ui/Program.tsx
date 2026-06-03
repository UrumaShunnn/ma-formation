"use client";

import { useState } from "react";

const TYPEFORM_URL = "https://tally.so/r/QKkZ91";

const modules = [
  { number: "01", title: "Les bases", description: "Comprendre le modèle Vinted & Dropshipping et poser les fondations de ton business" },
  { number: "02", title: "Le contenu", description: "Créer des annonces et visuels qui attirent les acheteurs et font scroller" },
  { number: "03", title: "Les produits", description: "Trouver les bons produits à sourcer sur Shein, Temu et Aliexpress" },
  { number: "04", title: "Le pricing", description: "Fixer les bons prix pour maximiser ta marge tout en restant compétitif" },
  { number: "05", title: "Scaler", description: "Multiplier tes ventes, automatiser et passer à l'échelle supérieure" },
  { number: "06", title: "Le mindset", description: "Développer l'état d'esprit des entrepreneurs qui réussissent durablement" },
];

function ModuleCard({ mod, index }: { mod: (typeof modules)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: "#111111", border: `1px solid ${hovered ? "rgba(124,58,237,0.6)" : "#2A2A2A"}`, borderRadius: 12, padding: 20, display: "flex", gap: 16, alignItems: "flex-start", transition: "border-color 250ms ease, box-shadow 250ms ease", boxShadow: hovered ? "0 0 20px rgba(124,58,237,0.08)" : "none", cursor: "default", opacity: 0, animation: `fadeInUp 0.5s ease ${index * 50}ms both` }}>
      <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 30, lineHeight: 1, background: "linear-gradient(135deg,#8B5CF6,#5B21B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", opacity: 0.55, flexShrink: 0, userSelect: "none", minWidth: 40 }}>
        {mod.number}
      </span>
      <div>
        <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 14, color: "#FFFFFF", marginBottom: 4, lineHeight: 1.3 }}>{mod.title}</p>
        <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.6 }}>{mod.description}</p>
      </div>
    </div>
  );
}

export default function Program() {
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <section id="programme" style={{ width: "100%", paddingTop: 64, paddingBottom: 64, background: "#0A0A0A", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ display: "inline-block", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.35)", borderRadius: 100, padding: "6px 16px", fontSize: 13, fontWeight: 600, color: "#8B5CF6", marginBottom: 20, fontFamily: "Syne, sans-serif", letterSpacing: "0.05em" }}>
            Le programme complet
          </span>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, marginBottom: 16, textAlign: "center", color: "#FFFFFF", lineHeight: 1.2 }}>
            6 modules pour maîtriser{" "}
            <span style={{ background: "linear-gradient(135deg,#8B5CF6,#5B21B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Vinted & Dropshipping</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16, marginBottom: 40 }}>
          {modules.map((mod, i) => <ModuleCard key={mod.number} mod={mod} index={i} />)}
        </div>

        <div style={{ textAlign: "center" }}>
          <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => setCtaHovered(true)} onMouseLeave={() => setCtaHovered(false)}
            style={{ display: "inline-block", border: `1px solid ${ctaHovered ? "#8B5CF6" : "rgba(124,58,237,0.5)"}`, borderRadius: 10, padding: "13px 28px", fontSize: 15, fontWeight: 600, fontFamily: "Syne, sans-serif", color: ctaHovered ? "#FFFFFF" : "#8B5CF6", background: ctaHovered ? "rgba(124,58,237,0.12)" : "transparent", textDecoration: "none", transition: "all 220ms ease" }}>
            Voir le programme complet →
          </a>
        </div>

      </div>
    </section>
  );
}
