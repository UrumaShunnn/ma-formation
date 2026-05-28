"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Présentation", href: "#presentation" },
  { label: "Témoignages", href: "#temoignages" },
  { label: "Programme", href: "#programme" },
  { label: "L'équipe", href: "#equipe" },
  { label: "Rejoindre", href: "#rejoindre" },
];

const TYPEFORM_URL = "https://form.typeform.com/to/XXXXXXXX";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const close = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 w-full">

        {/* Logo */}
        <a href="#" aria-label="Accueil" className="flex items-center flex-shrink-0">
          {!logoError && (
            <Image
              src="/logo.svg"
              alt="Ma Formation E-Commerce"
              width={140}
              height={36}
              priority
              onError={() => setLogoError(true)}
              style={{ height: 36, width: "auto" }}
            />
          )}
          {logoError && (
            <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, background: "linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              MaFormation
            </span>
          )}
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 14,
                  color: isActive ? "#FFFFFF" : "#D1D5DB",
                  textDecoration: isActive ? "underline" : "none",
                  textDecorationColor: "#7C3AED",
                  textUnderlineOffset: 4,
                  fontWeight: isActive ? 600 : 400,
                  transition: "color 200ms ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? "#FFFFFF" : "#D1D5DB")}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <a
          href={TYPEFORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-block"
          style={{
            background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
            color: "#FFFFFF",
            borderRadius: 8,
            padding: "9px 18px",
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "filter 200ms ease, transform 200ms ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.filter = "brightness(1.15)";
            (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.filter = "brightness(1)";
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          }}
        >
          Candidater →
        </a>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen((o) => !o)}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#FFFFFF",
            fontSize: 24,
            lineHeight: 1,
            padding: "4px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown — absolute below navbar */}
      {isOpen && (
        <div
          className="md:hidden"
          style={{
            position: "absolute",
            top: 64,
            left: 0,
            right: 0,
            width: "100%",
            background: "#111111",
            borderBottom: "1px solid #7C3AED",
            padding: 16,
            zIndex: 999,
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                style={{
                  display: "block",
                  padding: "14px 16px",
                  borderBottom: "1px solid #2A2A2A",
                  color: isActive ? "#8B5CF6" : "#FFFFFF",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: 18,
                  textDecoration: "none",
                  transition: "color 200ms ease",
                }}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href={TYPEFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            style={{
              display: "block",
              marginTop: 16,
              background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
              color: "#FFFFFF",
              borderRadius: 10,
              padding: "14px 20px",
              fontSize: 16,
              fontWeight: 700,
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Candidater →
          </a>
        </div>
      )}
    </header>
  );
}
