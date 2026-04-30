import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import supabase from "../lib/Supabase"


export default function ArtistPage() {
  const [artist, setArtist] = useState(null)
  const [artistProducts, setArtistProducts] = useState([])

  const { slug } = useParams()

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

  const { data, error } = await supabase
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
          slug
        )
      )
    `)
    .eq("artist_id", artist.id)
    .limit(24)

  if (error) {
    console.log(error)
    return
  }

  setArtistProducts(data || [])
}



   useEffect(() => {
  async function init() {
    const a = await fetchArtist()
    if (!a) return

    await fetchArtistProducts(a)
  }

  init()
}, [slug])


  return (
    <div>
       {artist && (
        <section className="grid md:grid-cols-2 gap-10 border-(--color-text) border">

          <img
            src={artist.image}
            className="w-full h-full object-cover"
          />

          <div className="pt-12">
            <h2 className="h2">{artist.name}</h2>

            <p className="mt-2 w-[80%] body">
              {artist.bio}
            </p>

            <Link
              to={`/artist/${artist.slug}`}
              className="mt-4 inline-block bg-(--color-text) text-white px-3 py-1 rounded-[10px]"
            >
              Se alle værker
            </Link>
          </div>

        </section>
      )}
    </div>
  )
}

