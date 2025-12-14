import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' })

const productMap = {
  '1': { price: 4900, name: 'Bracelet A' },
  '2': { price: 8900, name: 'Bracelet B' },
  '3': { price: 6900, name: 'Bracelet C' }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { productId } = req.body
  const product = productMap[productId]
  if (!product) return res.status(400).json({ error: 'Invalid product' })

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        { price_data: { currency: 'eur', product_data: { name: product.name }, unit_amount: product.price }, quantity: 1 }
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/canceled`
    })
    res.status(200).json({ url: session.url })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
