"use client";

import { useEffect, useRef } from "react";

interface VideoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

function resolveEmbedUrl(url: string): string {
  if (!url) return "";

  // YouTube : watch?v=ID ou youtu.be/ID → embed/ID
  const ytWatch = url.match(/[?&]v=([^&#]+)/);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}?autoplay=1&rel=0`;

  const ytShort = url.match(/youtu\.be\/([^?&#]+)/);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}?autoplay=1&rel=0`;

  const ytEmbed = url.match(/youtube\.com\/embed\/([^?&#]+)/);
  if (ytEmbed) return `${url}${url.includes("?") ? "&" : "?"}autoplay=1`;

  // Vimeo : vimeo.com/ID → player.vimeo.com/video/ID
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;

  // URL déjà propre (embed direct)
  return url;
}

export default function VideoLightbox({ isOpen, onClose, videoUrl }: VideoLightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const embedUrl = resolveEmbedUrl(videoUrl);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        animation: "lightboxIn 250ms ease both",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 800,
          animation: "lightboxScaleIn 280ms cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          aria-label="Fermer la vidéo"
          style={{
            position: "absolute",
            top: -44,
            right: 0,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#FFFFFF",
            fontSize: 16,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 200ms ease, transform 200ms ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(124,58,237,0.5)";
            el.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(255,255,255,0.1)";
            el.style.transform = "scale(1)";
          }}
        >
          ✕
        </button>

        {/* Iframe container */}
        <div
          style={{
            position: "relative",
            aspectRatio: "16 / 9",
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid rgba(124,58,237,0.4)",
            boxShadow: "0 0 60px rgba(124,58,237,0.3)",
            background: "#111111",
          }}
        >
          {embedUrl ? (
            <iframe
              src={embedUrl}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              title="Vidéo"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p style={{ color: "#4B5563", fontSize: 15 }}>Vidéo non disponible</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes lightboxIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lightboxScaleIn {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
