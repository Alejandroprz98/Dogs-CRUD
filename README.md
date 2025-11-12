# dogs-crud-nextjs

Proyecto Next.js (App Router) - CRUD para perros con MySQL.

## Pasos rápidos

1. `npm install`
2. Configura `.env.local` (host, user, password, database).
3. Crea la base de datos y tabla usando `init.sql`:
   - `mysql -u root -p < init.sql`  (o ejecutar el contenido en tu cliente MySQL)
4. `npm run dev`
5. Abrir http://localhost:3000

## Notas
- El proyecto usa `mysql2/promise`.
- Las rutas API están en `app/api/dogs`.
- Si NEXT_PUBLIC_BASE_URL está vacío, las peticiones usan rutas relativas.
