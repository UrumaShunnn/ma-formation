import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 });
    }

    console.log('Nouvelle candidature:', { name, email, phone, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
