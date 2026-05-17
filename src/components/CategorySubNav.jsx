import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export default function CategorySubNav({ categories = [], parentName }) {
  if (!categories.length) return null

  return (
    <section className="mt-12 bg-surface">

      <h2 className="h2 px-4 mb-6 pt-8 lg:px-12">
        Udforsk vores udvalg af {parentName?.toLowerCase()}
      </h2>

      <div className="flex overflow-x-auto no-scrollbar snap-mandatory gap-4 px-4 pb-8 lg:px-12">

        {categories.map(cat => (
          <Link
            to={`/shop/${cat.slug}`}
            key={cat.id}
            className="group min-w-[260px] md:min-w-[300px] flex flex-col gap-2 snap-start"
          >

            {/* IMAGE */}
            <div className="overflow-hidden">
              <img
                src={cat.image || "/placeholder.jpg"}
                alt={cat.name}
                className="w-full aspect-3/4 object-cover rounded-[5px] transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* TEXT */}
            <p className="body flex items-center gap-1 mt-2">
              {cat.name} <ArrowRight size={18}/>
            </p>

          </Link>
        ))}

      </div>

    </section>
  )
}