export default function ProductCard({ product }) {
  const price = product.price && product.price > 1000 ? (product.price/100).toFixed(2) : product.price
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-premium hover:shadow-2xl transition-shadow duration-300">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
        <div className="absolute top-3 left-3 bg-white/80 text-sm rounded px-2 py-1 text-gray-800">New</div>
        <div className="absolute top-3 right-3 bg-gradient-to-r from-accent to-primary-500 text-white rounded px-3 py-1 font-semibold">{price} €</div>
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 h-12 overflow-hidden">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-yellow-500">★★★★★</div>
            <div className="text-sm text-gray-400">(120)</div>
          </div>
          <button className="btn-primary">Voir le produit</button>
        </div>
      </div>
    </article>
  )
}
