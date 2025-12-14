import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'GET') {
    const p = await prisma.product.findUnique({ where: { id } })
    if (!p) return res.status(404).json({ error: 'Not found' })
    res.status(200).json(p)
  } else if (req.method === 'PUT') {
    const { name, description, price, image } = req.body
    const p = await prisma.product.update({ where: { id }, data: { name, description, price, image } })
    res.status(200).json(p)
  } else if (req.method === 'DELETE') {
    await prisma.product.delete({ where: { id } })
    res.status(204).end()
  } else {
    res.status(405).end()
  }
}
