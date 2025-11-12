import './globals.css';
export const metadata = {
  title: 'Dogs CRUD'
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: 20 }}>
        <header>
          <h1>Dogs CRUD</h1>
          <nav>
            <a href="/dogs">Perros</a> | <a href="/dogs/new">Crear perro</a>
          </nav>
          <hr />
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
