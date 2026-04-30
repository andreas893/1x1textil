import { Link } from "react-router-dom"

export default function ArtistModul({ artists = [], title = "Kunsthåndværkere" }) {
  
  if (!artists.length) return null

  return (
    <section className="mt-20 p-12 bg-surface">

      <h2 className="h2 mb-6">
        {title}
      </h2>

      <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-4">

        {artists.slice(0, 6).map(artist => (
          <Link
            to={`/artist/${artist.slug}`}
            key={artist.id}
            className="group min-w-[340px] p-2 flex flex-col gap-4"
          >
            
            <div className="overflow-hidden">
              <img
                src={artist.image || "/fallback.jpg"}
                className="w-full h-100 object-cover rounded-[5px] group-hover:scale-105 transition"
                loading="lazy"
              />
            </div>

            <h3 className="mt-2 h3 font-sans">
              {artist.name}
            </h3>

            <p className="text-sm mt-1 line-clamp-2">
              {artist.bio}
            </p>

            <span className="bg-(--color-text) w-fit text-white px-2 py-1 rounded-[10px]">
              Se alle produkter
            </span>

          </Link>
        ))}

      </div>

    </section>
  )
}