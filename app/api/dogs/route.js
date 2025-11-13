import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET() {
  try {
    const rows = await query('SELECT * FROM dogs ORDER BY created_at DESC');
    return NextResponse.json(rows);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al obtener perros' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, breed, age, description } = body;

    if (!name) {
      return NextResponse.json({ error: 'El campo "name" es obligatorio' }, { status: 400 });
    }

    // ✅ PostgreSQL usa $1, $2... en lugar de ?
    const insert = await query(
      'INSERT INTO dogs (name, breed, age, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, breed || null, age || null, description || null]
    );

    return NextResponse.json(insert[0], { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
