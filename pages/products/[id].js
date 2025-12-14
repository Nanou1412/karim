import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { useCart } from '../../context/CartContext'

export default function ProductPage({ product }) {
  const router = useRouter()
  const { addItem } = useCart()

  if (!product) return <Layout><div className="p-6">Produit introuvable</div></Layout>

  const handleAddToCart = () => {
    addItem(product)
    router.push('/cart')
  }

  const handleBuyNow = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product.id })
    })
    const data = await res.json()
    if (data.url) window.location = data.url
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded" />
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mt-2 text-gray-600">{product.description}</p>
          <div className="mt-4 text-xl font-semibold">{product.price} €</div>
          <div className="mt-6 space-x-2">
            <button onClick={handleAddToCart} className="bg-blue-600 text-white px-4 py-2 rounded">Ajouter au panier</button>
            <button onClick={handleBuyNow} className="bg-green-600 text-white px-4 py-2 rounded">Acheter maintenant</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.params
  const base = process.env.NEXT_PUBLIC_BASE_URL || ''
  const res = await fetch(base + '/api/products/' + id) || await fetch('/api/products/' + id)
  const product = await res.json()
  if (!product) return { notFound: true }
  return { props: { product } }
}
