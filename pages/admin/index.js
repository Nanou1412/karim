import Layout from '../components/Layout'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    else if (status === 'authenticated') loadProducts()
  }, [status])

  const loadProducts = async () => {
    const res = await fetch('/api/products')
    setProducts(await res.json())
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (confirm('Supprimer ce produit ?')) {
      await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
      loadProducts()
    }
  }

  if (status === 'loading' || loading) return <Layout><div className="p-6">Chargement...</div></Layout>
  if (!session) return null

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestion des produits</h1>
          <Link href="/admin/create" className="bg-green-600 text-white px-4 py-2 rounded">+ Nouveau produit</Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-left">Nom</th>
                <th className="border p-2 text-left">Description</th>
                <th className="border p-2 text-left">Prix</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border hover:bg-gray-100">
                  <td className="border p-2">{p.name}</td>
                  <td className="border p-2 text-sm">{p.description}</td>
                  <td className="border p-2">{(p.price / 100).toFixed(2)} €</td>
                  <td className="border p-2 space-x-2">
                    <Link href={`/admin/edit/${p.id}`} className="text-blue-600">Éditer</Link>
                    <button onClick={() => handleDelete(p.id)} className="text-red-600">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
