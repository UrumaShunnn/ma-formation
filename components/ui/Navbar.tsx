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
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full"
      style={{
        transition: "background 300ms ease, border-color 300ms ease, backdrop-filter 300ms ease",
        background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #2A2A2A" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between px-4 md:px-8" style={{ height: 72 }}>

        {/* Logo */}
        <a href="#" aria-label="Accueil" style={{ display: "flex", alignItems: "center" }}>
          {!logoError && (
            <Image
              src="/logo.svg"
              alt="Ma Formation E-Commerce"
              width={160}
              height={40}
              priority
              onError={() => setLogoError(true)}
              style={{ height: 40, width: "auto" }}
            />
          )}
          <span
            style={{
              display: logoError ? "block" : "none",
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: 20,
              background: "linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            MaFormation
          </span>
        </a>

        {/* Nav desktop */}
        <nav className="hidden md:flex" style={{ alignItems: "center", gap: 32 }}>
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
                  transition: "color 200ms ease",
                  fontWeight: isActive ? 500 : 400,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? "#FFFFFF" : "#D1D5DB")}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* CTA desktop */}
        <a
          href={TYPEFORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-block"
          style={{
            background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
            color: "#FFFFFF",
            borderRadius: 8,
            padding: "10px 20px",
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            transition: "filter 200ms ease, transform 200ms ease",
            whiteSpace: "nowrap",
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

        {/* Hamburger mobile */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <span style={{ display: "block", width: 24, height: 2, background: "#FFFFFF", borderRadius: 2, transition: "transform 300ms ease, opacity 300ms ease", transform: isMenuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: 24, height: 2, background: "#FFFFFF", borderRadius: 2, transition: "opacity 300ms ease", opacity: isMenuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: 24, height: 2, background: "#FFFFFF", borderRadius: 2, transition: "transform 300ms ease, opacity 300ms ease", transform: isMenuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu — fixed full-screen overlay below navbar */}
      <div className={`fixed inset-0 top-[72px] z-40 bg-[#0A0A0A] flex-col p-6 gap-4 md:hidden overflow-y-auto ${isMenuOpen ? "flex" : "hidden"}`}>
        {navLinks.map((link) => {
          const isActive = activeSection === link.href.replace("#", "");
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              style={{
                fontSize: 18,
                color: isActive ? "#8B5CF6" : "#D1D5DB",
                fontWeight: isActive ? 600 : 400,
                padding: "14px 0",
                textDecoration: "none",
                borderBottom: "1px solid #1A1A1A",
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
          onClick={() => setIsMenuOpen(false)}
          style={{
            marginTop: 16,
            background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
            color: "#FFFFFF",
            borderRadius: 10,
            padding: "14px 20px",
            fontSize: 16,
            fontWeight: 700,
            textDecoration: "none",
            textAlign: "center",
            display: "block",
          }}
        >
          Candidater →
        </a>
      </div>
    </header>
  );
}
