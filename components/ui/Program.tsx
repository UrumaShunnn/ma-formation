"use client";

import { useState } from "react";

const TYPEFORM_URL = "https://form.typeform.com/to/XXXXXXXX";

const modules = [
  { n: "01", title: "Introduction & Fondamentaux", desc: "Comprendre le modèle e-commerce et poser les bases solides de ton business" },
  { n: "02", title: "Trouver un produit à fort potentiel", desc: "Les méthodes de recherche qui cartonnent pour identifier les gagnants" },
  { n: "03", title: "Approvisionnement & Logistique", desc: "Sourcing, fournisseurs fiables, supply chain optimisée" },
  { n: "04", title: "Création de boutique", desc: "Shopify, design conversion-first, pages produit qui vendent" },
  { n: "05", title: "Fondamentaux Marketing", desc: "Bases du marketing digital appliqué au e-commerce" },
  { n: "06", title: "Créatives qui convertissent", desc: "Vidéos, visuels et copywriting qui transforment le scroll en achat" },
  { n: "07", title: "Publicité Payante", desc: "Facebook Ads, TikTok Ads, Google Ads — de zéro à tes premières ventes" },
  { n: "08", title: "Scaling Publicitaire", desc: "Passer de 100€/j à 1000€/j sans casser ton ROAS" },
  { n: "09", title: "Analyse & Optimisation", desc: "KPIs, ROAS, data-driven decisions pour arrêter de perdre de l'argent" },
  { n: "10", title: "Email Marketing", desc: "Transformer les visiteurs en clients fidèles grâce aux séquences email" },
  { n: "11", title: "Organique", desc: "Vendre sans pub payante — SEO, TikTok organique, réseaux sociaux" },
  { n: "12", title: "Scaler son business", desc: "Équipe, automatisation, délégation — construire une vraie entreprise" },
];

function ModuleCard({ mod, index }: { mod: (typeof modules)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: "#111111", border: `1px solid ${hovered ? "rgba(124,58,237,0.6)" : "#2A2A2A"}`, borderRadius: 12, padding: 20, display: "flex", gap: 16, alignItems: "flex-start", transition: "border-color 250ms ease, box-shadow 250ms ease", boxShadow: hovered ? "0 0 20px rgba(124,58,237,0.08)" : "none", cursor: "default", opacity: 0, animation: `fadeInUp 0.5s ease ${index * 50}ms both` }}>
      <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 30, lineHeight: 1, background: "linear-gradient(135deg,#8B5CF6,#5B21B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", opacity: 0.55, flexShrink: 0, userSelect: "none", minWidth: 40 }}>
        {mod.n}
      </span>
      <div>
        <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 14, color: "#FFFFFF", marginBottom: 4, lineHeight: 1.3 }}>{mod.title}</p>
        <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.6 }}>{mod.desc}</p>
      </div>
    </div>
  );
}

export default function Program() {
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <section id="programme" className="w-full py-16 md:py-24" style={{ background: "#0A0A0A" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ display: "inline-block", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.35)", borderRadius: 100, padding: "6px 16px", fontSize: 13, fontWeight: 600, color: "#8B5CF6", marginBottom: 20, fontFamily: "Syne, sans-serif", letterSpacing: "0.05em" }}>
            Le programme complet
          </span>
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center" style={{ fontFamily: "Syne, sans-serif", color: "#FFFFFF", lineHeight: 1.2 }}>
            12 modules pour maîtriser le e-commerce{" "}
            <span style={{ background: "linear-gradient(135deg,#8B5CF6,#5B21B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>de A à Z</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {modules.map((mod, i) => <ModuleCard key={mod.n} mod={mod} index={i} />)}
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
