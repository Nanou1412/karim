import Layout from '../components/Layout'
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <Layout>
      <div className="max-w-md mx-auto p-6 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold mb-2">Paiement réussi !</h1>
        <p className="text-gray-600 mb-6">Merci pour votre achat. Votre commande a été confirmée.</p>
        <p className="text-sm text-gray-500 mb-4">Un email de confirmation a été envoyé à votre adresse.</p>
        <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded inline-block">Retour à la boutique</Link>
      </div>
    </Layout>
  )
}
