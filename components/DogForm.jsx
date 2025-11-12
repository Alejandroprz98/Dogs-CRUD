'use client'
import React, { useState } from 'react'
import '../app/globals.css' // asegúrate de importar tus estilos globales

export default function DogForm({ initial = {}, submitUrl, method = 'POST', onSuccess }) {
  const [name, setName] = useState(initial.name || '')
  const [breed, setBreed] = useState(initial.breed || '')
  const [age, setAge] = useState(initial.age != null ? initial.age : '')
  const [description, setDescription] = useState(initial.description || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(submitUrl, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, breed, age: age === '' ? null : Number(age), description })
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err?.error || 'Error')
      }
      onSuccess?.()
    } catch (err) {
      setError(err.message || 'Error inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="dog-form">
      <div className="form-group">
        <label>Nombre</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          required
          placeholder="Ej: Rocky"
        />
      </div>

      <div className="form-group">
        <label>Raza</label>
        <input
          value={breed}
          onChange={e => setBreed(e.target.value)}
          placeholder="Ej: Labrador"
        />
      </div>

      <div className="form-group">
        <label>Edad</label>
        <input
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
          min="0"
          placeholder="Ej: 3"
        />
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Ej: Amigable y activo"
        />
      </div>

      {error && <p className="error-text">{error}</p>}

      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  )
}
