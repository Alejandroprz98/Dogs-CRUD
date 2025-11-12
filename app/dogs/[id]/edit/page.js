'use client'
import DogForm from '../../../../components/DogForm'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditDog({ params }) {
  const { id } = params
  const router = useRouter()
  const [initial, setInitial] = useState(null)

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/dogs/${id}`)
      if (res.ok) {
        const json = await res.json()
        setInitial({ name: json.name, breed: json.breed, age: json.age, description: json.description })
      }
    }
    load()
  }, [id])

  if (!initial) return <p>Cargando...</p>

  return (
    <div>
      <h2>Editar perro</h2>
      <DogForm initial={initial} submitUrl={`/api/dogs/${id}`} method="PUT" onSuccess={() => router.push(`/dogs/${id}`)} />
      <div style={{ marginTop: 12 }}>
        <button onClick={async () => {
          if (!confirm('¿Eliminar este perro?')) return;
          await fetch(`/api/dogs/${id}`, { method: 'DELETE' });
          router.push('/dogs');
        }}>Eliminar</button>
      </div>
    </div>
  )
}
