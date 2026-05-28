"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const team = [
  {
    initials: "TN",
    photo: "",
    name: "Ton Nom",
    role: "Fondateur & Expert E-Commerce",
    bio: "J'ai commencé depuis mon appart avec 300€ en poche. Aujourd'hui je génère plusieurs dizaines de milliers d'euros par mois grâce au e-commerce. Mon objectif : te donner exactement ce dont j'aurais eu besoin quand j'ai démarré — pas du théorique, du concret et testé.",
    stats: [
      { icon: "💰", value: "500k€+", label: "générés en ligne" },
      { icon: "📅", value: "4 ans", label: "d'expérience" },
      { icon: "👥", value: "250+", label: "élèves formés" },
    ],
    quote: "Je ne vends pas du rêve. Je te donne les mêmes outils, les mêmes méthodes et le même accès que ceux qui ont construit avant toi.",
  },
];

function Avatar({ photo, initials }: { photo: string; initials: string }) {
  const [imgError, setImgError] = useState(false);

  if (!photo || imgError) {
    return (
      <div style={{ width: 180, height: 180, borderRadius: 16, background: "#2A2A2A", border: "3px solid #7C3AED", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 52, background: "linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          {initials}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={photo}
      alt={initials}
      width={180}
      height={180}
      priority
      onError={() => setImgError(true)}
      style={{ width: 180, height: 180, borderRadius: 16, objectFit: "cover", border: "3px solid #7C3AED", flexShrink: 0 }}
    />
  );
}

function MemberCard({ member }: { member: (typeof team)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
    <div
      ref={ref}
      style={{
        background: "#111111",
        border: "1px solid rgba(124,58,237,0.3)",
        borderRadius: 20,
        padding: "32px",
        boxShadow: "0 0 48px rgba(124,58,237,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: 28,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 700ms ease, transform 700ms ease",
      }}
    >
      {/* Photo + identité */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="flex-shrink-0">
          <Avatar photo={member.photo} initials={member.initials} />
        </div>
        <div className="w-full text-center md:text-left">
          <span style={{ display: "inline-block", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.35)", borderRadius: 100, padding: "4px 14px", fontSize: 12, fontWeight: 600, color: "#8B5CF6", marginBottom: 12, fontFamily: "Syne, sans-serif", letterSpacing: "0.04em" }}>
            {member.role}
          </span>
          <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 26, color: "#FFFFFF", marginBottom: 12, lineHeight: 1.2 }}>
            {member.name}
          </h3>
          <p style={{ color: "#D1D5DB", fontSize: 15, lineHeight: 1.75 }}>
            {member.bio}
          </p>
        </div>
      </div>

      {/* Stats personnelles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {member.stats.map((stat, i) => (
          <div key={i} style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 24 }} role="img" aria-hidden="true">{stat.icon}</span>
            <div>
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 20, color: "#8B5CF6", lineHeight: 1, marginBottom: 4 }}>{stat.value}</p>
              <p style={{ color: "#6B7280", fontSize: 12 }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Citation */}
      <div style={{ position: "relative", paddingLeft: 24 }}>
        <span aria-hidden="true" style={{ position: "absolute", top: -16, left: -8, fontFamily: "Georgia, serif", fontSize: 80, lineHeight: 1, color: "#7C3AED", opacity: 0.25, userSelect: "none", pointerEvents: "none" }}>
          &ldquo;
        </span>
        <div style={{ borderLeft: "2px solid rgba(124,58,237,0.4)", paddingLeft: 20 }}>
          <p style={{ color: "#D1D5DB", fontSize: 16, lineHeight: 1.7, fontStyle: "italic" }}>
            {member.quote}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section id="equipe" className="w-full py-16 md:py-24" style={{ background: "#0A0A0A" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center" style={{ fontFamily: "Syne, sans-serif", color: "#FFFFFF", lineHeight: 1.2 }}>
            Qui{" "}
            <span style={{ background: "linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              suis-je ?
            </span>
          </h2>
          <p style={{ color: "#6B7280", fontSize: 17 }}>Un entrepreneur de terrain, pas un vendeur de rêves.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto w-full">
          {team.map((member, i) => (
            <MemberCard key={i} member={member} />
          ))}
        </div>

      </div>
    </section>
  );
}
