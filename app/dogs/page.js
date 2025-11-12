export const dynamic = 'force-dynamic';

export default async function DogsPage() {
  const res = await fetch('http://localhost:3000/api/dogs', { cache: 'no-store' });
  const dogs = await res.json();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Lista de Perros</h2>
        <a href="/dogs/new" className="button add">+ Nuevo Perro</a>
      </div>

      {dogs.length === 0 ? (
        <p>No hay perros registrados 🐾</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Raza</th>
              <th>Edad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dogs.map((dog) => (
              <tr key={dog.id}>
                <td>{dog.name}</td>
                <td>{dog.breed}</td>
                <td>{dog.age}</td>
                <td>
                  <a href={`/dogs/${dog.id}`} className="button view">Ver</a>{' '}
                  <a href={`/dogs/${dog.id}/edit`} className="button edit">Editar</a>{' '}
                  <form
                    action={`/api/dogs/${dog.id}`}
                    method="post"
                    style={{ display: 'inline' }}
                  >
                    <input type="hidden" name="_method" value="DELETE" />
                    <button type="submit" className="button delete">Eliminar</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
