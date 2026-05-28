"use client";

import { useEffect, useRef, useState } from "react";

function useSlideIn(direction: "left" | "right") {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : direction === "left" ? "translateX(-32px)" : "translateX(32px)",
    transition: "opacity 700ms ease, transform 700ms ease",
  };
  return { ref, style };
}

function CheckItem({ text }: { text: string }) {
  return (
    <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <span style={{ color: "#D1D5DB", fontSize: 15, lineHeight: 1.5 }}>{text}</span>
    </li>
  );
}

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: 200, background: "linear-gradient(135deg, #1A1A1A 0%, #111111 100%)", borderRadius: 12, border: "1px solid rgba(124,58,237,0.25)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, overflow: "hidden", position: "relative" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(124,58,237,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="14" rx="2" stroke="#8B5CF6" strokeWidth="1.5" /><path d="M8 21h8M12 17v4" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </div>
      <span style={{ color: "#4B5563", fontSize: 13, zIndex: 1 }}>{label}</span>
    </div>
  );
}

const bonusCards = [
  { icon: "🎯", title: "Accès événements exclusifs", desc: "Masterclasses & meetups réservés aux membres" },
  { icon: "📱", title: "Support 7j/7 en communauté", desc: "Répond à toutes tes questions en quelques heures" },
  { icon: "🤖", title: "Templates IA + scripts d'annonces", desc: "Gagne des semaines de travail grâce à l'IA" },
  { icon: "📊", title: "Analyses de boutiques en direct", desc: "Débrief live sur des boutiques réelles" },
];

function BonusCard({ card }: { card: (typeof bonusCards)[number] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ background: hovered ? "rgba(124,58,237,0.08)" : "#1A1A1A", border: `1px solid ${hovered ? "rgba(124,58,237,0.4)" : "#2A2A2A"}`, borderRadius: 12, padding: 24, transition: "background 250ms ease, border-color 250ms ease", cursor: "default" }}>
      <span style={{ fontSize: 28, display: "block", marginBottom: 12 }} role="img" aria-hidden="true">{card.icon}</span>
      <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 15, color: "#FFFFFF", marginBottom: 6 }}>{card.title}</p>
      <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.5 }}>{card.desc}</p>
    </div>
  );
}

export default function Features() {
  const block1Text = useSlideIn("left");
  const block1Img = useSlideIn("right");
  const block2Img = useSlideIn("left");
  const block2Text = useSlideIn("right");
  const block3Text = useSlideIn("left");
  const block3Img = useSlideIn("right");
  const block4 = useSlideIn("left");

  return (
    <section id="programme-detail" style={{ width: "100%", paddingTop: 64, paddingBottom: 64, background: "#0A0A0A" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ display: "inline-block", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.35)", borderRadius: 100, padding: "6px 16px", fontSize: 13, fontWeight: 600, color: "#8B5CF6", marginBottom: 20, fontFamily: "Syne, sans-serif", letterSpacing: "0.05em" }}>
            Ce que tu vas débloquer
          </span>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, marginBottom: 16, textAlign: "center", color: "#FFFFFF", lineHeight: 1.2 }}>
            Tout ce dont tu as besoin pour réussir,{" "}
            <span style={{ background: "linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              réuni au même endroit.
            </span>
          </h2>
          <p style={{ color: "#6B7280", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
            Des outils, des méthodes et une communauté pour t&apos;emmener du zéro au premier chiffre d&apos;affaires.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Bloc 1 */}
          <div style={{ background: "#111111", borderRadius: 16, border: "1px solid #2A2A2A", padding: 40 }}>
            <div style={{ display: "flex", gap: 40, alignItems: "center", flexWrap: "wrap" }}>
              <div ref={block1Text.ref} style={{ ...block1Text.style, flex: 1, minWidth: 280 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 22, color: "#FFFFFF" }}>Une formation ultra-complète</h3>
                  <span style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", borderRadius: 100, padding: "3px 10px", fontSize: 11, fontWeight: 600, color: "#8B5CF6", whiteSpace: "nowrap" }}>Mis à jour 2025</span>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                  <CheckItem text="Création de boutique e-commerce" />
                  <CheckItem text="Recherche de produits gagnants" />
                  <CheckItem text="Publicités Facebook, TikTok, Google" />
                  <CheckItem text="Scaling et automatisation" />
                  <CheckItem text="Module IA pour accélérer tes process" />
                </ul>
              </div>
              <div ref={block1Img.ref} style={{ ...block1Img.style, flex: 1, minWidth: 280, minHeight: 200, background: "#1A1A1A", borderRadius: 12 }}>
                <ImagePlaceholder label="Screenshot plateforme formation" />
              </div>
            </div>
          </div>

          {/* Bloc 2 */}
          <div style={{ background: "#111111", borderRadius: 16, border: "1px solid #2A2A2A", padding: 40 }}>
            <div style={{ display: "flex", gap: 40, alignItems: "center", flexWrap: "wrap" }}>
              <div ref={block2Img.ref} style={{ ...block2Img.style, flex: 1, minWidth: 280, minHeight: 200, background: "#1A1A1A", borderRadius: 12 }}>
                <ImagePlaceholder label="Screenshot communauté" />
              </div>
              <div ref={block2Text.ref} style={{ ...block2Text.style, flex: 1, minWidth: 280 }}>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 22, color: "#FFFFFF", marginBottom: 20 }}>Accompagnement & Communauté</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                  <CheckItem text="Communauté privée de membres qui chiffrent" />
                  <CheckItem text="Coachs disponibles 7j/7" />
                  <CheckItem text="Lives hebdomadaires stratégiques" />
                  <CheckItem text="Support réactif à chaque étape" />
                </ul>
              </div>
            </div>
          </div>

          {/* Bloc 3 */}
          <div style={{ background: "#111111", borderRadius: 16, border: "1px solid #2A2A2A", padding: 40 }}>
            <div style={{ display: "flex", gap: 40, alignItems: "center", flexWrap: "wrap" }}>
              <div ref={block3Text.ref} style={{ ...block3Text.style, flex: 1, minWidth: 280 }}>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 22, color: "#FFFFFF", marginBottom: 20 }}>Méthodes Exclusives & Testées</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                  <CheckItem text="Scripts d'annonces qui convertissent" />
                  <CheckItem text="Templates prêts à l'emploi" />
                  <CheckItem text="Études de cas avec produits révélés" />
                  <CheckItem text="Ressources IA, fichiers agents" />
                </ul>
              </div>
              <div ref={block3Img.ref} style={{ ...block3Img.style, flex: 1, minWidth: 280, minHeight: 200, background: "#1A1A1A", borderRadius: 12 }}>
                <ImagePlaceholder label="Screenshot ressources" />
              </div>
            </div>
          </div>

          {/* Bloc 4 — Bonus */}
          <div ref={block4.ref} style={{ ...block4.style, background: "#111111", borderRadius: 16, border: "1px solid #2A2A2A", padding: 40 }}>
            <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 22, color: "#FFFFFF", marginBottom: 28, textAlign: "center" }}>Bonus réservés aux membres</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {bonusCards.map((card, i) => <BonusCard key={i} card={card} />)}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
