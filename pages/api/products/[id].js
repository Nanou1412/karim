const sample = {
  '1': { id: '1', name: 'Bracelet A', description: 'Suivi activité + notifications', price: 49, image: 'https://placehold.co/600x400?text=Bracelet+A' },
  '2': { id: '2', name: 'Bracelet B', description: 'Design premium, batterie longue durée', price: 89, image: 'https://placehold.co/600x400?text=Bracelet+B' },
  '3': { id: '3', name: 'Bracelet C', description: 'Étanche, suivi sommeil', price: 69, image: 'https://placehold.co/600x400?text=Bracelet+C' }
}

export default function handler(req, res) {
  const { id } = req.query
  const p = sample[id]
  if (!p) return res.status(404).json({ error: 'Not found' })
  res.status(200).json(p)
}
