import { Link } from "react-router-dom"

export default function NavCategories({ menuData }) {
  const all = menuData.flatMap(s => s.children)
  const featured = all.slice(0, 4)

  return (
    <div className="flex overflow-x-auto gap-3 p-4 no-scrollbar snap-x snap-mandatory
  md:grid md:grid-cols-2 md:overflow-visible md:gap-2">
       {featured.map(cat => (
    <Link
      key={cat.id}
      to={`/shop/${cat.slug}`} 
      className="
        min-w-[200px] shrink-0 snap-start
        md:min-w-0
        relative aspect-square overflow-hidden rounded-[5px] group
      "
    >
      <img
        src={cat.image}
        alt={cat.name}
        className="
          absolute inset-0 w-full h-full object-cover
          transition-transform duration-300
          group-hover:scale-105
        "
      />
    </Link>
  ))}
    </div>
  )
}