import Layout from '../../components/Layout'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function CreateProductPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '' })
  const [error, setError] = useState(null)

  if (!session) return <Layout><div className="p-6">Accès refusé</div></Layout>

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.price) return setError('Nom et prix requis')

    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: Math.round(Number(form.price) * 100) })
    })

    if (res.ok) router.push('/admin')
    else setError('Erreur lors de la création')
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Nouveau produit</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-600">{error}</div>}
          <div>
            <label className="block text-sm font-semibold">Nom</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold">Prix (€)</label>
            <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold">Image URL</label>
            <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full border rounded px-3 py-2" />
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Créer</button>
        </form>
      </div>
    </Layout>
  )
}
