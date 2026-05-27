"use client";

import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FieldError {
  name?: string;
  email?: string;
  message?: string;
}

function validate(fields: FormState): FieldError {
  const errors: FieldError = {};
  if (fields.name.trim().length < 2) errors.name = "Prénom requis (2 caractères minimum).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = "Email invalide.";
  if (fields.message.trim().length < 10) errors.message = "Message trop court (10 caractères minimum).";
  return errors;
}

function Spinner() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 18,
        height: 18,
        border: "2px solid rgba(255,255,255,0.3)",
        borderTop: "2px solid #ffffff",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
        flexShrink: 0,
      }}
    />
  );
}

function InputField({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        htmlFor={id}
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#D1D5DB",
          fontFamily: "Syne, sans-serif",
        }}
      >
        {label}
        {required && <span style={{ color: "#8B5CF6", marginLeft: 4 }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: "#1A1A1A",
          border: `1px solid ${error ? "#EF4444" : focused ? "#7C3AED" : "#2A2A2A"}`,
          borderRadius: 10,
          padding: "13px 16px",
          color: "#FFFFFF",
          fontSize: 15,
          outline: "none",
          width: "100%",
          transition: "border-color 200ms ease",
          fontFamily: "DM Sans, sans-serif",
        }}
      />
      {error && (
        <p style={{ color: "#EF4444", fontSize: 12, marginTop: 2 }}>{error}</p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [fields, setFields] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldError>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [textFocused, setTextFocused] = useState(false);

  const set = (key: keyof FormState) => (v: string) => {
    setFields((f) => ({ ...f, [key]: v }));
    if (errors[key as keyof FieldError]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate(fields);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setServerError(data.error ?? "Une erreur est survenue.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setFields({ name: "", email: "", phone: "", message: "" });
    } catch {
      setServerError("Connexion impossible. Vérifie ta connexion et réessaie.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        style={{
          background: "#111111",
          border: "1px solid rgba(34,197,94,0.3)",
          borderRadius: 16,
          padding: "48px 32px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          animation: "fadeInUp 0.5s ease both",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "rgba(34,197,94,0.15)",
            border: "1px solid rgba(34,197,94,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
          }}
        >
          ✅
        </div>
        <h3
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: 22,
            color: "#FFFFFF",
          }}
        >
          Candidature envoyée !
        </h3>
        <p style={{ color: "#9CA3AF", fontSize: 15, lineHeight: 1.6, maxWidth: 360 }}>
          On a bien reçu ta candidature. Tu recevras une réponse sous 24h à l&apos;adresse indiquée.
        </p>
        <button
          onClick={() => setStatus("idle")}
          style={{
            background: "none",
            border: "1px solid #2A2A2A",
            borderRadius: 8,
            padding: "8px 20px",
            color: "#6B7280",
            fontSize: 13,
            cursor: "pointer",
            transition: "color 200ms ease, border-color 200ms ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#D1D5DB";
            (e.currentTarget as HTMLElement).style.borderColor = "#4B5563";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#6B7280";
            (e.currentTarget as HTMLElement).style.borderColor = "#2A2A2A";
          }}
        >
          Envoyer une autre candidature
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        background: "#111111",
        border: "1px solid #2A2A2A",
        borderRadius: 16,
        padding: "40px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 20,
        }}
      >
        <InputField
          label="Prénom"
          id="name"
          value={fields.name}
          onChange={set("name")}
          placeholder="Ton prénom"
          error={errors.name}
          required
        />
        <InputField
          label="Email"
          id="email"
          type="email"
          value={fields.email}
          onChange={set("email")}
          placeholder="ton@email.com"
          error={errors.email}
          required
        />
      </div>

      <InputField
        label="Téléphone"
        id="phone"
        type="tel"
        value={fields.phone}
        onChange={set("phone")}
        placeholder="+33 6 00 00 00 00 (optionnel)"
      />

      {/* Textarea message */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label
          htmlFor="message"
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#D1D5DB",
            fontFamily: "Syne, sans-serif",
          }}
        >
          Motivation / Situation actuelle{" "}
          <span style={{ color: "#8B5CF6" }}>*</span>
        </label>
        <textarea
          id="message"
          value={fields.message}
          onChange={(e) => {
            set("message")(e.target.value);
          }}
          placeholder="Décris ta situation actuelle et pourquoi tu veux rejoindre la formation..."
          rows={5}
          onFocus={() => setTextFocused(true)}
          onBlur={() => setTextFocused(false)}
          style={{
            background: "#1A1A1A",
            border: `1px solid ${errors.message ? "#EF4444" : textFocused ? "#7C3AED" : "#2A2A2A"}`,
            borderRadius: 10,
            padding: "13px 16px",
            color: "#FFFFFF",
            fontSize: 15,
            outline: "none",
            width: "100%",
            resize: "vertical",
            minHeight: 120,
            fontFamily: "DM Sans, sans-serif",
            lineHeight: 1.6,
            transition: "border-color 200ms ease",
          }}
        />
        {errors.message && (
          <p style={{ color: "#EF4444", fontSize: 12 }}>{errors.message}</p>
        )}
        <p style={{ color: "#4B5563", fontSize: 12, textAlign: "right" }}>
          {fields.message.length}/2000
        </p>
      </div>

      {/* Erreur serveur */}
      {status === "error" && serverError && (
        <div
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 10,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 16 }}>❌</span>
          <p style={{ color: "#FCA5A5", fontSize: 14 }}>{serverError}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          background:
            status === "loading"
              ? "rgba(124,58,237,0.6)"
              : "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
          color: "#FFFFFF",
          fontFamily: "Syne, sans-serif",
          fontWeight: 700,
          fontSize: 16,
          borderRadius: 12,
          padding: "16px 24px",
          border: "none",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          width: "100%",
          transition: "filter 200ms ease, transform 200ms ease",
          boxShadow: "0 4px 24px rgba(124,58,237,0.3)",
        }}
        onMouseEnter={(e) => {
          if (status !== "loading") (e.currentTarget as HTMLElement).style.filter = "brightness(1.12)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.filter = "brightness(1)";
        }}
      >
        {status === "loading" ? (
          <>
            <Spinner />
            Envoi en cours...
          </>
        ) : (
          "Envoyer ma candidature →"
        )}
      </button>

      <p style={{ color: "#4B5563", fontSize: 12, textAlign: "center" }}>
        🔒 Tes données sont confidentielles et ne seront jamais partagées.
      </p>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
}
