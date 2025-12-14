import Layout from '../components/Layout'
import Link from 'next/link'

export default function CanceledPage() {
  return (
    <Layout>
      <div className="max-w-md mx-auto p-6 text-center">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-2xl font-bold mb-2">Paiement annulé</h1>
        <p className="text-gray-600 mb-6">Votre paiement a été annulé ou n'a pas pu être complété.</p>
        <p className="text-sm text-gray-500 mb-4">Votre panier a été conservé. Veuillez réessayer.</p>
        <Link href="/cart" className="bg-blue-600 text-white px-4 py-2 rounded inline-block">Retour au panier</Link>
      </div>
    </Layout>
  )
}
