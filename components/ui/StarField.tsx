"use client";
import { useEffect, useRef } from "react";

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.5 + 0.5,
      baseOpacity: Math.random() * 0.5 + 0.2,
      opacity: Math.random(),
      speed: Math.random() * 0.008 + 0.003,
      growing: Math.random() > 0.5,
      color: Math.random() > 0.6
        ? `rgba(180,150,255,`
        : `rgba(255,255,255,`,
    }));

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        if (star.growing) {
          star.opacity += star.speed;
          if (star.opacity >= star.baseOpacity + 0.3) star.growing = false;
        } else {
          star.opacity -= star.speed;
          if (star.opacity <= star.baseOpacity - 0.15) star.growing = true;
        }
        star.opacity = Math.max(0.05, Math.min(1, star.opacity));

        // Outer glow
        const glow = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.radius * 6
        );
        glow.addColorStop(0, `${star.color}${star.opacity})`);
        glow.addColorStop(0.4, `${star.color}${star.opacity * 0.3})`);
        glow.addColorStop(1, `${star.color}0)`);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 6, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${Math.min(1, star.opacity + 0.3)})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        background: "rgba(124,58,237,0.05)",
      }}
    />
  );
}
