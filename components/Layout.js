import Navbar from '../components/Navbar'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">{children}</main>
      <footer className="bg-gray-800 text-white p-6 text-center">
        © 2025 Bracelets Connectés. Tous droits réservés.
      </footer>
    </>
  )
}
