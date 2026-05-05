import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { SlidersHorizontal } from "lucide-react"
import { ArrowDownWideNarrow } from "lucide-react"
import supabase from "../lib/Supabase"
import ProductGrid from "../components/ProductGrid"
import ArtistStory from "../components/ArtistStory"
import { useRef } from "react"


export default function ArtistPage() {
  const [artist, setArtist] = useState(null)
  const [artistProducts, setArtistProducts] = useState([])

  const { slug } = useParams()

  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const PAGE_SIZE = 12
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  const gridRef = useRef(null)

  const [categories, setCategories] = useState([])

//fetch artist
  async function fetchArtist() {
  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.log(error)
    return null
  }

  setArtist(data)
  return data
}

//fetch artist products
async function fetchArtistProducts(artist) {
  if (!artist?.id) return

  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const { data, error, count } = await supabase
    .from("products")
    .select(`
      id,
      title,
      price,
      image,
      product_categories (
        categories (
          id,
          name,
          slug,
          image
        )
      )
    `, { count: "exact" })
    .eq("artist_id", artist.id)
    .range(from, to)

  if (error) {
    console.log(error)
    return
  }

 setArtistProducts(data || [])

const cats = extractCategories(data || [])
setCategories(cats)
  setTotalCount(count || 0)
}


function extractCategories(products) {
  const all = products.flatMap(p =>
    p.product_categories.map(pc => pc.categories)
  )

  // fjern duplicates
  const unique = [
    ...new Map(all.map(c => [c.id, c])).values()
  ]

  //  fjern uønskede (meget vigtigt)
  return unique.filter(
    c =>
      c.slug !== "kunsthaandvaerkere" &&
      c.slug !== "keramik" // valgfri hvis du kun vil have underkategorier
  )
}


   useEffect(() => {
  async function init() {
    const a = await fetchArtist()
    if (!a) return

    await fetchArtistProducts(a)
  }

  init()
}, [slug, page])

  useEffect(() => {
    setPage(1)
  }, [slug])


  //scroll når page ændres
useEffect(() => {
  if (gridRef.current) {
    gridRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  }
}, [page])

  return (
    <div className="text-(--color-text)">
       {artist && (
        <section className="grid md:grid-cols-2 gap-10 h-[70vh] bg-surface text-(--color-text) border">

          <img
            src={artist.image}
            className="w-full h-[70vh] object-cover"
          />

          <div className="pt-12">
            <h1 className="h1">{artist.name}</h1>

            <p className="mt-6 w-[80%] body">
              {artist.bio}
            </p>
          </div>
        </section>
      )}

       <div ref={gridRef} className="pt-12 text-(--color-text)">
           <h2 className="h2 mb-6 pl-12">Værker fra {artist?.name}</h2>

        <div className="flex justify-between mb-6 text-sm border-b border-t pl-12 pr-12 pt-2 pb-2">
          <button className="flex gap-2 cursor-pointer">Filtrer <SlidersHorizontal size={20}/> </button>
          <button className="flex gap-2 cursor-pointer">Sorter <ArrowDownWideNarrow size={20}/> </button>
        </div>

        <ProductGrid
          products={artistProducts}
          layout="grid"
          showEditorial={false}
          columns={4}
        />
      
      <div className="flex gap-2 justify-center mt-6">

            <div className="border rounded-[5px]">
                 {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 cursor-pointer ${
                    page === p ? "bg-(--color-text) text-white" : ""
                }`}
                >
                {p}
                </button>
            ))}
            </div>

        </div>

      </div>
      
      
      <ArtistStory artist={artist}/>

      {categories.length > 0 && (
  <section className="p-12">

    <h2 className="h2 mb-6">
      Udforsk kategorier fra {artist.name}
    </h2>

    <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">

      {categories.map(cat => (
        <Link
          to={`/shop/${cat.slug}`}
          key={cat.id}
          className="min-w-[240px] h-[70] snap-start group"
        >

          <div>
            <img
              src={cat.image || "/fallback.jpg"}
              className="w-full h-70 object-cover rounded-[5px]"
            />

            <p className="mt-2 group-hover:underline">
              {cat.name} →
            </p>
          </div>

        </Link>
      ))}

    </div>

  </section>
)}


    </div>


  )
}

