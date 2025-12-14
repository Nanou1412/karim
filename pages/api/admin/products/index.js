import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const products = await prisma.product.findMany()
    res.status(200).json(products)
  } else if (req.method === 'POST') {
    const { name, description, price, image } = req.body
    const p = await prisma.product.create({ data: { name, description, price, image } })
    res.status(201).json(p)
  } else {
    res.status(405).end()
  }
}
