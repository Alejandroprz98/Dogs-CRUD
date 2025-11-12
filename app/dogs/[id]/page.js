import Link from 'next/link';

export const revalidate = 0;

export default async function DogPage({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/dogs/${params.id}`, { cache: 'no-store' });
  if (res.status === 404) return <p>Perro no encontrado</p>;
  const dog = await res.json();
  return (
    <div>
      <h2>{dog.name}</h2>
      <p><strong>Raza:</strong> {dog.breed || '-'}</p>
      <p><strong>Edad:</strong> {dog.age != null ? dog.age : '-'}</p>
      <p><strong>Descripción:</strong> {dog.description || '-'}</p>
      <p>Creado: {new Date(dog.created_at).toLocaleString()}</p>
      <p>
        <Link href="/dogs">Volver</Link> | <Link href={`/dogs/${dog.id}/edit`}>Editar</Link>
      </p>
    </div>
  );
}
