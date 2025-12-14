import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { data: session } = useSession()
  const { items } = useCart()

  return (
    <nav className="bg-white shadow-sm">
      <div className="container-max flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary-500 rounded-full flex items-center justify-center text-white font-bold">BC</div>
            <div>
              <div className="text-sm text-gray-500">Bracelets</div>
              <div className="font-serif text-lg text-gray-900">Connectés</div>
            </div>
          </Link>
        </div>

        <div className="flex-1 mx-6 hidden md:block">
          <input placeholder="Rechercher un bracelet, ex: sport, étanche" className="w-full border rounded-lg px-4 py-2" />
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative text-gray-700">
            🛒
            {items.length > 0 && <span className="absolute -top-2 -right-3 bg-red-500 rounded-full w-5 h-5 text-center text-xs text-white">{items.length}</span>}
          </Link>

          {session ? (
            <>
              <Link href="/admin" className="text-gray-700">Dashboard</Link>
              <button onClick={() => signOut()} className="px-3 py-1 bg-red-50 text-red-600 rounded">Déconnexion</button>
            </>
          ) : (
            <Link href="/login" className="px-3 py-2 bg-primary-500 text-white rounded-lg">Connexion</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
