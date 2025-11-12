import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET() {
  const rows = await query('SELECT * FROM dogs ORDER BY created_at DESC');
  return NextResponse.json(rows);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, breed, age, description } = body;
    if (!name) return NextResponse.json({ error: 'name required' }, { status: 400 });
    await query('INSERT INTO dogs (name, breed, age, description) VALUES (?, ?, ?, ?)', [name, breed || null, age || null, description || null]);
    const inserted = await query('SELECT * FROM dogs WHERE id = LAST_INSERT_ID()');
    return NextResponse.json(inserted[0], { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
