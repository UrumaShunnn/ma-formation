"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─── Données — à personnaliser ───────────────────────── */

const team = [
  {
    initials: "TN",
    photo: "",                          // Mets le chemin vers ta photo ici
    name: "Ton Nom",
    role: "Fondateur & Expert E-Commerce",
    bio: "J'ai commencé depuis mon appart avec 300€ en poche. Aujourd'hui je génère plusieurs dizaines de milliers d'euros par mois grâce au e-commerce. Mon objectif : te donner exactement ce dont j'aurais eu besoin quand j'ai démarré — pas du théorique, du concret et testé.",
    stats: [
      { icon: "💰", value: "500k€+", label: "générés en ligne" },
      { icon: "📅", value: "4 ans", label: "d'expérience" },
      { icon: "👥", value: "250+", label: "élèves formés" },
    ],
    quote:
      "Je ne vends pas du rêve. Je te donne les mêmes outils, les mêmes méthodes et le même accès que ceux qui ont construit avant toi.",
  },
  // Décommente et remplis ce bloc si tu as un co-fondateur :
  // {
  //   initials: "AL",
  //   photo: "",
  //   name: "Autre Prénom",
  //   role: "Expert Ads & Scaling",
  //   bio: "Spécialiste des campagnes publicitaires à fort volume...",
  //   stats: [
  //     { icon: "📈", value: "2M€+", label: "budget ads géré" },
  //     { icon: "📅", value: "5 ans", label: "d'expérience" },
  //     { icon: "🏆", value: "Top 1%", label: "ROAS moyen" },
  //   ],
  //   quote: "La publicité payante n'est pas une dépense, c'est un levier de croissance.",
  // },
];

/* ─── Sous-composants ─────────────────────────────────── */

function Avatar({ photo, initials }: { photo: string; initials: string }) {
  const [imgError, setImgError] = useState(false);

  if (!photo || imgError) {
    return (
      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: 16,
          background: "#2A2A2A",
          border: "3px solid #7C3AED",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: 52,
            background: "linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {initials}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={photo}
      alt={initials}
      width={200}
      height={200}
      priority
      onError={() => setImgError(true)}
      style={{
        width: 200,
        height: 200,
        borderRadius: 16,
        objectFit: "cover",
        border: "3px solid #7C3AED",
        flexShrink: 0,
      }}
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
      { threshold: 0.15 }
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
        padding: "40px",
        boxShadow: "0 0 48px rgba(124,58,237,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: 32,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 700ms ease, transform 700ms ease",
      }}
    >
      {/* Photo + identité */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="self-center md:self-start flex-shrink-0">
          <Avatar photo={member.photo} initials={member.initials} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }} className="w-full">
          {/* Badge rôle */}
          <span
            style={{
              display: "inline-block",
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(124,58,237,0.35)",
              borderRadius: 100,
              padding: "4px 14px",
              fontSize: 12,
              fontWeight: 600,
              color: "#8B5CF6",
              marginBottom: 12,
              fontFamily: "Syne, sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            {member.role}
          </span>

          {/* Nom */}
          <h3
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: 28,
              color: "#FFFFFF",
              marginBottom: 14,
              lineHeight: 1.2,
            }}
          >
            {member.name}
          </h3>

          {/* Bio */}
          <p
            style={{
              color: "#D1D5DB",
              fontSize: 15,
              lineHeight: 1.75,
              maxWidth: 480,
            }}
          >
            {member.bio}
          </p>
        </div>
      </div>

      {/* Stats personnelles */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        {member.stats.map((stat, i) => (
          <div
            key={i}
            style={{
              flex: "1 1 140px",
              background: "#1A1A1A",
              border: "1px solid #2A2A2A",
              borderRadius: 12,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 24 }} role="img" aria-hidden="true">{stat.icon}</span>
            <div>
              <p
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: 20,
                  color: "#8B5CF6",
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {stat.value}
              </p>
              <p style={{ color: "#6B7280", fontSize: 12 }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Citation */}
      <div style={{ position: "relative", paddingLeft: 24 }}>
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -16,
            left: -8,
            fontFamily: "Georgia, serif",
            fontSize: 80,
            lineHeight: 1,
            color: "#7C3AED",
            opacity: 0.25,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          &ldquo;
        </span>
        <div
          style={{
            borderLeft: "2px solid rgba(124,58,237,0.4)",
            paddingLeft: 20,
          }}
        >
          <p
            style={{
              color: "#D1D5DB",
              fontSize: 16,
              lineHeight: 1.7,
              fontStyle: "italic",
            }}
          >
            {member.quote}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Composant principal ─────────────────────────────── */

export default function Team() {
  return (
    <section
      id="equipe"
      className="py-16 md:py-24 px-4 md:px-6"
      style={{ background: "#0A0A0A" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 44px)",
              color: "#FFFFFF",
              marginBottom: 12,
              lineHeight: 1.2,
            }}
          >
            Qui{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              suis-je ?
            </span>
          </h2>
          <p style={{ color: "#6B7280", fontSize: 17 }}>
            Un entrepreneur de terrain, pas un vendeur de rêves.
          </p>
        </div>

        {/* Grille : 1 colonne si 1 personne, 2 colonnes si 2 personnes */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: team.length >= 2
              ? "repeat(auto-fit, minmax(440px, 1fr))"
              : "1fr",
            gap: 24,
            maxWidth: team.length === 1 ? 800 : "100%",
            margin: "0 auto",
          }}
        >
          {team.map((member, i) => (
            <MemberCard key={i} member={member} />
          ))}
        </div>

      </div>
    </section>
  );
}
