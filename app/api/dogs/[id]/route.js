import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function GET(req, { params }) {
  const id = parseInt(params.id, 10);
  const rows = await query('SELECT * FROM dogs WHERE id = ?', [id]);
  if (!rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(rows[0]);
}

export async function PUT(req, { params }) {
  try {
    const id = parseInt(params.id, 10);
    const body = await req.json();
    const { name, breed, age, description } = body;
    if (!name) return NextResponse.json({ error: 'name required' }, { status: 400 });
    await query('UPDATE dogs SET name = ?, breed = ?, age = ?, description = ? WHERE id = ?', [name, breed || null, age || null, description || null, id]);
    const updated = await query('SELECT * FROM dogs WHERE id = ?', [id]);
    return NextResponse.json(updated[0]);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const id = parseInt(params.id, 10);
  await query('DELETE FROM dogs WHERE id = ?', [id]);
  return NextResponse.json({ success: true });
}
