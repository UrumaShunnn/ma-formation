"use client";

import { useEffect, useRef, useState } from "react";

const bannerItems = ["E-COMMERCE","DROPSHIPPING","VINTED","SHOPIFY","FACEBOOK ADS","TIKTOK ADS","FORMATION","RÉSULTATS PROUVÉS"];

const stats = [
  { icon: "👥", value: 250, suffix: "+", label: "Membres actifs", sublabel: "qui génèrent du chiffre" },
  { icon: "💰", value: 1, suffix: "M€+", label: "Générés par nos membres", sublabel: "chiffre cumulé" },
  { icon: "🚀", value: 90, suffix: "j", label: "Pour voir tes premiers résultats", sublabel: "accompagnement jusqu'au succès" },
];

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatCard({ stat, delay }: { stat: (typeof stats)[number]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const count = useCountUp(stat.value, 1800, visible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#111111",
        border: `1px solid ${hovered ? "rgba(124,58,237,0.5)" : "#2A2A2A"}`,
        borderRadius: 16,
        padding: 32,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 12,
        cursor: "default",
        boxShadow: hovered ? "0 0 32px rgba(124,58,237,0.15)" : "0 0 0px transparent",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionProperty: "opacity, transform, border-color, box-shadow",
        transitionDuration: `600ms, 600ms, 300ms, 300ms`,
        transitionDelay: `${delay}ms, ${delay}ms, 0ms, 0ms`,
        transitionTimingFunction: "ease",
      }}
    >
      <span style={{ fontSize: 36 }} role="img" aria-hidden="true">{stat.icon}</span>
      <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 48, lineHeight: 1, background: "linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        {count}{stat.suffix}
      </div>
      <div>
        <p style={{ color: "#FFFFFF", fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{stat.label}</p>
        <p style={{ color: "#6B7280", fontSize: 13 }}>{stat.sublabel}</p>
      </div>
    </div>
  );
}

export default function Stats() {
  const repeated = [...bannerItems, ...bannerItems];

  return (
    <>
      {/* Banner */}
      <div style={{ background: "#111111", borderTop: "1px solid #2A2A2A", borderBottom: "1px solid #2A2A2A", overflow: "hidden", padding: "14px 0" }}>
        <div style={{ display: "flex", width: "max-content", animation: "marquee 30s linear infinite" }}>
          {repeated.map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 20, paddingRight: 20, fontFamily: "Syne, sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF", whiteSpace: "nowrap" }}>
              {item}
              <span aria-hidden="true" style={{ color: "#7C3AED", fontSize: 10 }}>◆</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
      </div>

      {/* Compteurs */}
      <section className="py-16 md:py-20 px-4 md:px-6" style={{ background: "#0A0A0A" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, i) => <StatCard key={i} stat={stat} delay={i * 120} />)}
        </div>
      </section>
    </>
  );
}
