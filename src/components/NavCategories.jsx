import { Link } from "react-router-dom"

export default function NavCategories({ menuData }) {
  const all = menuData.flatMap(s => s.children)
  const featured = all.slice(0, 4)

  return (
    <div className="grid grid-cols-2 gap-2">
      {featured.map(cat => (
        <Link key={cat.id} to={`/shop/${cat.slug}`} className="group relative aspect-square overflow-hidden">
          <img className="absolute inset-0
        w-full h-full
        object-cover
        transition-transform duration-300
        group-hover:scale-105 rounded-[5px]" src={cat.image} />
        </Link>
      ))}
    </div>
  )
}