"use client";

import { useState } from "react";

const navLinks = [
  { label: "Présentation", href: "#presentation" },
  { label: "Programme", href: "#programme" },
  { label: "Témoignages", href: "#temoignages" },
  { label: "L'équipe", href: "#equipe" },
  { label: "Rejoindre", href: "#rejoindre" },
];

const legalLinks = [
  { label: "Politique de confidentialité", href: "#" },
  { label: "CGV", href: "#" },
  { label: "Mentions légales", href: "#" },
];

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
    </svg>
  );
}

const socials = [
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "TikTok", href: "#", Icon: TikTokIcon },
  { label: "YouTube", href: "#", Icon: YouTubeIcon },
];

function SocialButton({ social }: { social: (typeof socials)[number] }) {
  const [hovered, setHovered] = useState(false);
  const { Icon, label, href } = social;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: hovered ? "linear-gradient(135deg, #7C3AED, #5B21B6)" : "#1A1A1A",
        border: `1px solid ${hovered ? "#7C3AED" : "#2A2A2A"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: hovered ? "#FFFFFF" : "#6B7280",
        transform: hovered ? "scale(1.1)" : "scale(1)",
        transition: "all 220ms ease",
        textDecoration: "none",
        flexShrink: 0,
      }}
    >
      <Icon />
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ color: hovered ? "#D1D5DB" : "#6B7280", fontSize: 14, textDecoration: "none", transition: "color 200ms ease", lineHeight: 1 }}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer style={{ width: "100%", paddingTop: 48, paddingBottom: 32, background: "#0A0A0A", borderTop: "1px solid #1A1A1A", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* 3 columns */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40, marginBottom: 48 }}>

          {/* Col 1: Logo + description + socials */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 20, background: "linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              MaFormation
            </span>
            <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              L&apos;accélérateur e-commerce qui t&apos;emmène du zéro à tes premiers chiffres d&apos;affaires en 90 jours.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {socials.map((s) => <SocialButton key={s.label} social={s} />)}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, color: "#FFFFFF", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8, margin: 0 }}>
              Navigation
            </p>
            <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {navLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
              ))}
            </nav>
          </div>

          {/* Col 3: Contact */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, color: "#FFFFFF", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8, margin: 0 }}>
              Contact
            </p>
            <a
              href="https://wa.me/33600000000"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#6B7280", fontSize: 14, textDecoration: "none", transition: "color 200ms ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#D1D5DB")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.561 4.136 1.535 5.875L.057 24l6.305-1.655A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.013-1.374l-.36-.214-3.733.979 1.002-3.645-.234-.375A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="mailto:contact@maformation.fr"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#6B7280", fontSize: 14, textDecoration: "none", transition: "color 200ms ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#D1D5DB")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
                <path d="M2 8l10 7 10-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              contact@maformation.fr
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #1A1A1A", paddingTop: 24, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <p style={{ color: "#4B5563", fontSize: 13, margin: 0 }}>© 2025 Ton Nom. Tous droits réservés.</p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
            {legalLinks.map((link, i) => (
              <span key={link.href} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
                {i < legalLinks.length - 1 && <span style={{ color: "#2A2A2A", fontSize: 12 }}>|</span>}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
