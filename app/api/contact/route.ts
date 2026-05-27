import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "";

/* ── Validation manuelle ──────────────────────────────── */

function validate(data: unknown): { name: string; email: string; phone?: string; message: string } {
  if (!data || typeof data !== "object") throw new Error("Corps de requête invalide.");

  const { name, email, phone, message } = data as Record<string, unknown>;

  if (!name || typeof name !== "string" || name.trim().length < 2)
    throw new Error("Le prénom est requis (2 caractères minimum).");

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new Error("L'adresse email est invalide.");

  if (phone !== undefined && phone !== "" && (typeof phone !== "string" || phone.length > 20))
    throw new Error("Le numéro de téléphone est invalide.");

  if (!message || typeof message !== "string" || message.trim().length < 10)
    throw new Error("Le message est requis (10 caractères minimum).");

  if (message.trim().length > 2000)
    throw new Error("Le message ne peut pas dépasser 2000 caractères.");

  return {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: typeof phone === "string" ? phone.trim() : undefined,
    message: message.trim(),
  };
}

/* ── Rate limiting léger (header-based) ──────────────── */

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 3;
const ipMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipMap.get(ip);

  if (!record || now > record.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS) return false;

  record.count++;
  return true;
}

/* ── Handler POST ─────────────────────────────────────── */

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Trop de tentatives. Réessaie dans une minute." },
        { status: 429 }
      );
    }

    // Parse + validation
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Format de requête invalide." }, { status: 400 });
    }

    const fields = validate(body);

    if (!CONTACT_EMAIL) {
      console.error("CONTACT_EMAIL non défini dans les variables d'environnement.");
      return NextResponse.json({ error: "Configuration serveur manquante." }, { status: 500 });
    }

    // Envoi email via Resend
    const { error } = await resend.emails.send({
      from: "Formation <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: fields.email,
      subject: `Nouvelle candidature — ${fields.name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#ffffff;padding:32px;border-radius:12px;">
          <h2 style="color:#8B5CF6;margin-bottom:24px;">Nouvelle candidature reçue</h2>

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#9CA3AF;width:130px;">Prénom</td>
              <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;">${fields.name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#9CA3AF;">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;">${fields.email}</td>
            </tr>
            ${fields.phone ? `
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#9CA3AF;">Téléphone</td>
              <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;">${fields.phone}</td>
            </tr>` : ""}
            <tr>
              <td style="padding:10px 0;color:#9CA3AF;vertical-align:top;">Motivation</td>
              <td style="padding:10px 0;white-space:pre-wrap;">${fields.message}</td>
            </tr>
          </table>

          <p style="margin-top:32px;color:#6B7280;font-size:13px;">
            Reçu le ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi. Réessaie dans quelques instants." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inattendue.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export function GET() {
  return NextResponse.json({ error: "Méthode non autorisée." }, { status: 405 });
}
