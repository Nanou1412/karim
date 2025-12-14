const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.product.createMany({
    data: [
      { name: 'Bracelet A', description: 'Suivi activité + notifications', price: 4900, image: 'https://placehold.co/600x400?text=Bracelet+A' },
      { name: 'Bracelet B', description: 'Design premium', price: 8900, image: 'https://placehold.co/600x400?text=Bracelet+B' },
      { name: 'Bracelet C', description: 'Étanche', price: 6900, image: 'https://placehold.co/600x400?text=Bracelet+C' }
    ],
  })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => { await prisma.$disconnect() })
