"use client";

import { useRef, useState } from "react";

const faqs = [
  {
    q: "Puis-je rejoindre même si je débute complètement ?",
    a: "Oui, la formation est conçue pour tous les niveaux. Que tu partes de zéro ou que tu veuilles scaler, tu trouveras ton compte. Les modules sont progressifs et les coachs sont là à chaque étape.",
  },
  {
    q: "Y a-t-il un suivi personnalisé ?",
    a: "Oui. Au-delà des modules vidéo, tu as accès à des coachs disponibles chaque jour, des lives hebdomadaires en direct, et selon ton niveau, des sessions privées pour débloquer plus vite.",
  },
  {
    q: "Combien de temps ai-je accès ?",
    a: "L'accès est à vie. Tu peux suivre à ton rythme et revenir sur les contenus quand tu veux. Toutes les mises à jour futures sont incluses gratuitement.",
  },
  {
    q: "Quel budget faut-il pour commencer ?",
    a: "Tu peux démarrer avec 500€, mais pour appliquer la stratégie optimale, nous recommandons 1 500€ à 2 000€ (pub + outils + produits). On t'aide à adapter selon ton niveau.",
  },
  {
    q: "En combien de temps puis-je espérer des résultats ?",
    a: "Certains membres génèrent leurs premières ventes dès la première semaine. Tout dépend de ton implication et de ta régularité. On t'accompagne étape par étape.",
  },
  {
    q: "Qu'est-ce qui vous différencie des autres formations ?",
    a: "Une approche terrain — méthodes testées sur de vraies boutiques, communauté active de membres qui chiffrent, coachs réactifs, ressources mises à jour chaque semaine, et un suivi réel, pas juste des vidéos.",
  },
  {
    q: "Y a-t-il une garantie ?",
    a: "Nous proposons une garantie satisfaction. Si tu appliques les méthodes et que tu n'obtiens aucun résultat dans les 30 premiers jours, on examine ta situation en détail avec toi.",
  },
];

function AccordionItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#111111",
        border: `1px solid ${isOpen ? "rgba(124,58,237,0.55)" : hovered ? "rgba(124,58,237,0.4)" : "#2A2A2A"}`,
        borderRadius: 12,
        overflow: "hidden",
        transition: "border-color 250ms ease",
        animation: `fadeInUp 0.4s ease ${index * 60}ms both`,
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "22px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 16, color: isOpen ? "#FFFFFF" : "#E5E7EB", lineHeight: 1.4, transition: "color 200ms ease" }}>
          {faq.q}
        </span>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: isOpen ? "rgba(124,58,237,0.25)" : "rgba(124,58,237,0.1)",
            border: "1px solid rgba(124,58,237,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 250ms ease, transform 350ms ease",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 1v11M1 6.5h11" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      </button>

      <div
        ref={bodyRef}
        style={{
          maxHeight: isOpen ? (bodyRef.current?.scrollHeight ?? 400) + "px" : "0px",
          overflow: "hidden",
          transition: "max-height 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <p style={{ color: "#9CA3AF", fontSize: 15, lineHeight: 1.75, padding: "16px 24px 24px", borderTop: "1px solid #1A1A1A" }}>
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section className="w-full px-4 md:px-8 py-16 md:py-24" style={{ background: "#0A0A0A" }}>
      <div className="max-w-3xl mx-auto w-full">

        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center" style={{ fontFamily: "Syne, sans-serif", color: "#FFFFFF", lineHeight: 1.2 }}>
            Questions{" "}
            <span style={{ background: "linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              fréquentes
            </span>
          </h2>
          <p style={{ color: "#6B7280", fontSize: 16 }}>
            Tu n&apos;as pas trouvé ta réponse ?{" "}
            <span style={{ color: "#8B5CF6", cursor: "pointer" }}>Contacte-nous directement.</span>
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} faq={faq} index={i} isOpen={openIndex === i} onToggle={() => toggle(i)} />
          ))}
        </div>

      </div>
    </section>
  );
}
