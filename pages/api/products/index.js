const sample = [
  { id: '1', name: 'Bracelet A', description: 'Suivi activité + notifications', price: 49, image: 'https://placehold.co/600x400?text=Bracelet+A' },
  { id: '2', name: 'Bracelet B', description: 'Design premium, batterie longue durée', price: 89, image: 'https://placehold.co/600x400?text=Bracelet+B' },
  { id: '3', name: 'Bracelet C', description: 'Étanche, suivi sommeil', price: 69, image: 'https://placehold.co/600x400?text=Bracelet+C' }
]

export default function handler(req, res) {
  res.status(200).json(sample)
}
