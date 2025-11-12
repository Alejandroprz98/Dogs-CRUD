'use client'
import DogForm from '../../../components/DogForm'
import { useRouter } from 'next/navigation'

export default function NewDogPage() {
  const router = useRouter()
  return (
    <div>
      <h2>Crear perro</h2>
      <DogForm submitUrl="/api/dogs" method="POST" onSuccess={() => router.push('/dogs')} />
    </div>
  )
}
