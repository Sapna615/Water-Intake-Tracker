const placeholder = (text) => `https://placehold.co/600x400?text=${encodeURIComponent(text)}`
const products = [
  { id: 1, name: 'HydroMax 1L', img: placeholder('HydroMax 1L'), price: '$19.99', desc: 'BPA-free with time markers', link: 'https://amazon.com', rating: 4.5 },
  { id: 2, name: 'SteelFlow 750ml', img: placeholder('SteelFlow 750ml'), price: '$24.99', desc: 'Insulated stainless steel', link: 'https://amazon.com', rating: 4.8 },
  { id: 3, name: 'SmartHydrate 600ml', img: placeholder('SmartHydrate 600ml'), price: '$39.99', desc: 'Bluetooth reminders', link: 'https://amazon.com', rating: 4.2 },
  { id: 4, name: 'EcoSip 1.5L', img: placeholder('EcoSip 1.5L'), price: '$17.99', desc: 'Large capacity eco material', link: 'https://amazon.com', rating: 4.1 },
  { id: 5, name: 'SportFlex 800ml', img: placeholder('SportFlex 800ml'), price: '$21.99', desc: 'Flip-top for workouts', link: 'https://amazon.com', rating: 4.6 },
  { id: 6, name: 'CrystalClear 500ml', img: placeholder('CrystalClear 500ml'), price: '$12.99', desc: 'Compact everyday bottle', link: 'https://amazon.com', rating: 4.0 }
]

export default function Products() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Recommended Products</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-white dark:bg-neutral-800 rounded shadow">
            <img src={p.img} alt={p.name} className="h-48 w-full object-cover rounded-t" referrerPolicy="no-referrer" crossOrigin="anonymous" />
            <div className="p-3">
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-600">{p.desc}</div>
              <div className="mt-2 flex justify-between items-center">
                <span className="font-semibold">{p.price}</span>
                <a href={p.link} className="px-3 py-1 bg-primary text-white rounded" target="_blank">Buy Now</a>
              </div>
              <div className="mt-2 text-yellow-500">{'★'.repeat(Math.round(p.rating))}{'☆'.repeat(5 - Math.round(p.rating))}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
