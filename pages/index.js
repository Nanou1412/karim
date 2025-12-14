import Link from 'next/link'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'

export default function Home({ products = [] }) {
  return (
    <Layout>
      <div className="container-max">
        <section className="grid md:grid-cols-2 gap-8 items-center py-20">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-4">Bracelets connectés — Luxe & Performance</h2>
            <p className="text-gray-600 mb-6">Design élégant, suivi précis et fonctionnalités connectées pour améliorer votre quotidien. Découvrez la collection premium.</p>
            <div className="flex gap-4">
              <Link href="#products" className="btn-primary">Voir la collection</Link>
              <Link href="/admin" className="btn-ghost">Espace partenaire</Link>
            </div>
          </div>
          <div>
            <img src="https://placehold.co/800x600?text=Hero+Bracelet" alt="Hero" className="rounded-xl shadow-xl" />
          </div>
        </section>

        <main id="products" className="py-8">
          <h3 className="text-2xl font-semibold mb-6">Nos best-sellers</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="block">
                <ProductCard product={p} />
              </Link>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/products`) || await fetch('/api/products')
  // If running server-side, prefer NEXT_PUBLIC_BASE_URL; fallback to relative when available
  const products = await res.json()

  return { props: { products } }
}
