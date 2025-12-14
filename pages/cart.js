import { useCart } from '../context/CartContext'
import Layout from '../components/Layout'

export default function CartPage() {
  const { items, updateQty, removeItem, clear } = useCart()
  const total = items.reduce((s, it) => s + (Number(it.price) * (it.qty || 1)), 0)

  const handleCheckout = async () => {
    const res = await fetch('/api/checkout-cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items })
    })
    const data = await res.json()
    if (data.url) window.location = data.url
  }

  if (!items.length) return <Layout><div className="p-6">Votre panier est vide.</div></Layout>

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Panier</h1>
      <div className="space-y-4">
        {items.map(it => (
          <div key={it.id} className="flex items-center justify-between bg-white p-3 rounded border">
            <div>
              <div className="font-semibold">{it.name}</div>
              <div className="text-sm text-gray-500">{it.price} €</div>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" className="w-16 border rounded px-2" value={it.qty} onChange={(e) => updateQty(it.id, Math.max(0, Number(e.target.value)))} />
              <button onClick={() => removeItem(it.id)} className="text-red-600">Supprimer</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <strong>Total: {total} €</strong>
        <div>
          <button onClick={() => clear()} className="mr-3 px-3 py-2 border rounded">Vider</button>
          <button onClick={handleCheckout} className="bg-green-600 text-white px-4 py-2 rounded">Passer au paiement</button>
        </div>
      </div>
    </Layout>
  )
}
