"use client";
import { useEffect, useRef } from "react";

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.3,
      opacity: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      growing: Math.random() > 0.5,
    }));

    // Shooting stars
    const shootingStars: any[] = [];
    let animId: number;

    const addShootingStar = () => {
      if (Math.random() > 0.97) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5,
          length: Math.random() * 100 + 50,
          speed: Math.random() * 8 + 4,
          opacity: 1,
          angle: Math.PI / 6,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        // Twinkle
        if (star.growing) {
          star.opacity += star.twinkleSpeed;
          if (star.opacity >= 1) star.growing = false;
        } else {
          star.opacity -= star.twinkleSpeed;
          if (star.opacity <= 0.1) star.growing = true;
        }

        // Draw star with glow
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.shadowBlur = star.radius * 4;
        ctx.shadowColor = `rgba(180, 150, 255, ${star.opacity * 0.8})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Cross sparkle on bigger stars
        if (star.radius > 1.2) {
          ctx.strokeStyle = `rgba(255,255,255,${star.opacity * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.radius * 3, star.y);
          ctx.lineTo(star.x + star.radius * 3, star.y);
          ctx.moveTo(star.x, star.y - star.radius * 3);
          ctx.lineTo(star.x, star.y + star.radius * 3);
          ctx.stroke();
        }
      });

      // Shooting stars
      addShootingStar();
      shootingStars.forEach((s, i) => {
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.02;

        const grad = ctx.createLinearGradient(
          s.x, s.y,
          s.x - Math.cos(s.angle) * s.length,
          s.y - Math.sin(s.angle) * s.length
        );
        grad.addColorStop(0, `rgba(180,150,255,${s.opacity})`);
        grad.addColorStop(1, "rgba(180,150,255,0)");
        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(
          s.x - Math.cos(s.angle) * s.length,
          s.y - Math.sin(s.angle) * s.length
        );
        ctx.stroke();

        if (s.opacity <= 0) shootingStars.splice(i, 1);
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
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
      }}
    />
  );
}
