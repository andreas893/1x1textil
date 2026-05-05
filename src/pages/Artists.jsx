import { useEffect, useState } from "react"
import supabase from "../lib/Supabase"
import ArtistCard from "../components/ArtistCard"


export default function Artists() {
  const [artists, setArtists] = useState([])
  const [filtered, setFiltered] = useState([])
  const [activeFilter, setActiveFilter] = useState("Alle")
  const [filters, setFilters] = useState([])
    

  //  fetch artists + preview products
  async function fetchArtists() {
    const { data, error } = await supabase
      .from("artists")
      .select(`
        id,
        name,
        slug,
        image,
        title,
        bio
      `)

    if (error) {
      console.log(error)
      return
    }

    //  hent 3 produkter pr artist
    const enriched = await Promise.all(
      data.map(async (artist) => {
        const { data: products } = await supabase
          .from("products")
          .select("id, image")
          .eq("artist_id", artist.id)
          .limit(3)

            // count (ALLE produkter)
        const { count } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("artist_id", artist.id)


        return {
          ...artist,
          products: products || [],
          productCount: count || 0
        }
      })
    )

  const uniqueTitles = [
  "Alle",
  ...[...new Set(enriched.map(a => a.title).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "da"))
]

    const sorted = enriched.sort((a, b) => {
  const aFirst = a.name.trim()[0]
  const bFirst = b.name.trim()[0]

  const aIsNumber = /^\d/.test(aFirst)
  const bIsNumber = /^\d/.test(bFirst)

  // 1. tal først
  if (aIsNumber && !bIsNumber) return -1
  if (!aIsNumber && bIsNumber) return 1

  // 2. ellers normal dansk sortering
  return a.name.localeCompare(b.name, "da", { sensitivity: "base" })
})

setArtists(sorted)
setFiltered(sorted)
setFilters(uniqueTitles)
  }

  useEffect(() => {
    fetchArtists()
  }, [])

  function applyFilter(filter) {
  setActiveFilter(filter)

  if (filter === "Alle") {
    setFiltered(artists)
    return
  }

  const result = artists.filter(
    artist => artist.title === filter
  )

  setFiltered(result)
}

  return (
    <div className="space-y-12 text-(--color-text)">

      {/* HERO */}
      <section className="bg-(--color-surface) p-12 sm:p-8">
        <h1 className="h1 mb-4">
          Kunsthåndværkere i butikken
        </h1>

        <p className="max-w-[600px] body">
          Bag hvert objekt står en kunstner. Her finder du et udvalg af
          håndværkere med hver deres tilgang til materialer, proces og form.
        </p>
      </section>

      {/* FILTERS */}
      <section className="">
        <h2 className="h2 mb-4 md:px-12 sm:px-8">
          Alle kunsthåndværkere
        </h2>

       <div className="flex gap-2 py-2 flex-wrap border-b border-t sm:px-6 md:px-12">
        {filters.map(f => {
            const count = 
            f === "Alle"
            ? artists.length
            : artists.filter(a => a.title === f).length

            return (
            <button
            key={f}
            onClick={() => applyFilter(f)}
            className={`px-3 py-1 rounded-full border text-sm cursor-pointer ${
                activeFilter === f
                ? "bg-(--color-text) text-white"
                : "bg-transparent text-(--color-text) border-(--color-text) hover:bg-(--color-text) hover:text-white transition-colors duration-200"
            }`}
            >
            {f} ({count})
            </button>
            )
        })}
        </div>
      </section>

      {/* GRID */}
      <section className="md:px-10 sm:px-8  pt-0">

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">

          {filtered.map(artist => (
            <ArtistCard
              key={artist.id}
              artist={artist}
            />
          ))}

        </div>

      </section>

    </div>
  )
}