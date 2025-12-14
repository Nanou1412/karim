import Layout from '../../components/Layout'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function EditProductPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { id } = router.query
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const load = async () => {
      const res = await fetch(`/api/products/${id}`)
      const p = await res.json()
      setForm({ name: p.name, description: p.description, price: (p.price / 100).toFixed(2), image: p.image })
      setLoading(false)
    }
    load()
  }, [id])

  if (!session) return <Layout><div className="p-6">Accès refusé</div></Layout>

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.price) return setError('Nom et prix requis')

    const res = await fetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: Math.round(Number(form.price) * 100) })
    })

    if (res.ok) router.push('/admin')
    else setError('Erreur lors de la modification')
  }

  if (loading) return <Layout><div className="p-6">Chargement...</div></Layout>

  return (
    <Layout>
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Modifier produit</h1>
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
          <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Modifier</button>
        </form>
      </div>
    </Layout>
  )
}
