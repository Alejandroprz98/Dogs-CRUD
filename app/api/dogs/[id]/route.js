import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

// Obtener un perro por ID
export async function GET(req, { params }) {
  try {
    const id = parseInt(params.id, 10);
    const rows = await query('SELECT * FROM dogs WHERE id = $1', [id]);

    if (!rows.length) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (e) {
    console.error('Error en GET /dogs/[id]:', e);
    return NextResponse.json({ error: 'Error al obtener el perro' }, { status: 500 });
  }
}

// Actualizar un perro por ID
export async function PUT(req, { params }) {
  try {
    const id = parseInt(params.id, 10);
    const body = await req.json();
    const { name, breed, age, description } = body;

    if (!name) {
      return NextResponse.json({ error: 'El campo "name" es obligatorio' }, { status: 400 });
    }

    // ✅ PostgreSQL usa $1, $2, etc.
    await query(
      'UPDATE dogs SET name = $1, breed = $2, age = $3, description = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5',
      [name, breed || null, age || null, description || null, id]
    );

    const updated = await query('SELECT * FROM dogs WHERE id = $1', [id]);
    return NextResponse.json(updated[0]);
  } catch (e) {
    console.error('Error en PUT /dogs/[id]:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// Eliminar un perro por ID
export async function DELETE(req, { params }) {
  try {
    const id = parseInt(params.id, 10);
    await query('DELETE FROM dogs WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Error en DELETE /dogs/[id]:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
