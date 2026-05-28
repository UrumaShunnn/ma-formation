"use client";

import { useState, useEffect } from "react";

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
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
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
    <header style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: "rgba(10,10,10,0.95)",
      borderBottom: "1px solid #2A2A2A",
      backdropFilter: "blur(10px)",
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
      }}>

        {/* Logo */}
        <a href="#" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "Syne, sans-serif",
            fontSize: 22,
            fontWeight: 800,
            color: "#7C3AED",
          }}>
            The Drop Klub
          </span>
        </a>

        {/* Desktop nav */}
        {!isMobile && (
          <nav style={{ display: "flex", gap: 32 }}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    color: isActive ? "#FFFFFF" : "#D1D5DB",
                    fontSize: 15,
                    textDecoration: isActive ? "underline" : "none",
                    textDecorationColor: "#7C3AED",
                    textUnderlineOffset: 4,
                    cursor: "pointer",
                    fontWeight: isActive ? 600 : 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        )}

        {/* Desktop CTA */}
        {!isMobile && (
          <a
            href={TYPEFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
              color: "white",
              padding: "10px 24px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Candidater →
          </a>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
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
        )}
      </div>

      {/* Mobile dropdown */}
      {isMobile && isOpen && (
        <div style={{
          position: "absolute",
          top: 64,
          left: 0,
          right: 0,
          background: "#111111",
          borderBottom: "1px solid #7C3AED",
          padding: 16,
          zIndex: 999,
        }}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{
                  display: "block",
                  padding: "14px 16px",
                  borderBottom: "1px solid #2A2A2A",
                  color: isActive ? "#8B5CF6" : "#FFFFFF",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: 18,
                  textDecoration: "none",
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
            onClick={() => setIsOpen(false)}
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
