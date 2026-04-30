import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../lib/Supabase"
import ProductGrid from "../components/ProductGrid"
import { Heart } from "lucide-react"

export default function ProductPage() {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [artist, setArtist] = useState(null)
  const [related, setRelated] = useState([])
  const [artistProducts, setArtistProducts] = useState([])

  function formatDescription(text) {
  if (!text) return ""

  return text
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/\n\s*\n/g, "\n\n")
    .trim()
}

  //produkter fra samme kunstner
  async function fetchArtistProducts(product) {
  if (!product.artist_id) return

  const { data, error } = await supabase
    .from("products")
    .select("id, title, price, image")
    .eq("artist_id", product.artist_id)
    .limit(12)

  if (error) {
    console.log(error)
    return
  }

  const filtered = data.filter(p => p.id !== product.id)

  setArtistProducts(filtered.slice(0, 8))
}

  //  Hent produkt + relationer
  async function fetchProduct() {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        artists (
          id,
          name,
          slug,
          image,
          bio
        ),
        product_categories (
          categories (
            id,
            name,
            slug
          )
        )
      `)
      .eq("id", id)
      .single()

    if (error) {
      console.log(error)
      return null
    }

    setProduct(data)
    setArtist(data.artists)

    return data
  }

  //  Relaterede produkter (samme kategori)
  async function fetchRelatedByCategory(product) {

  const categories =
    product.product_categories?.map(pc => pc.categories) || []

  // vælg mest specifikke kategori
  const specific =
    categories.find(c => c.slug !== "keramik") ||
    categories[0]

  const categoryId = specific?.id

  if (!categoryId) return

  const { data, error } = await supabase
    .from("product_categories")
    .select(`
      products (
        id,
        title,
        price,
        image,
        artist_id
      )
    `)
    .eq("category_id", categoryId)
    .limit(50)

  if (error) {
    console.log(error)
    return
  }



// lav flat liste
let products = [
  ...new Map(
    data.map(i => [i.products.id, i.products])
  ).values()
]

// fjern current product
products = products.filter(p => p.id !== product.id)

// fjern artist overlap
const artistIds = new Set(artistProducts.map(p => p.id))
products = products.filter(p => !artistIds.has(p.id))

// GROUP BY ARTIST
const grouped = {}

for (const p of products) {
  const key = p.artist_id || "unknown"

  if (!grouped[key]) grouped[key] = []
  grouped[key].push(p)
}

//  tag 1 fra hver kunstner ad gangen
const mixed = []
let added = true

while (added && mixed.length < 8) {
  added = false

  for (const key in grouped) {
    if (grouped[key].length > 0 && mixed.length < 8) {
      mixed.push(grouped[key].shift())
      added = true
    }
  }
}

setRelated(mixed)
}

 useEffect(() => {
    async function init() {
      const p = await fetchProduct()
      if (!p) return

      await fetchArtistProducts(p)
      await fetchRelatedByCategory(p)
    }

    init()
  }, [id])

  if (!product) return <div className="p-12">Loader...</div>

  return (
    <div className="space-y-16 text-(--color-text)">

      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-12 p-12 bg-(--color-bg) m-0">

        <img
          src={product.image}
          className="w-full h-[600px] object-cover rounded"
        />

        <div>
          <h1 className="h1">
            {product.title}
          </h1>

          <p className="body-sm pt-2 opacity-70">
            {product.product_categories?.[0]?.categories?.name}
          </p>

          <p className="mt-6">
            Af{" "}
            <Link
              to={`/artist/${artist?.slug}`}
              className="underline"
            >
              {artist?.name}
            </Link>
          </p>

          <p className="mt-4 text-xl font-bold">
            {product.price} kr
          </p>

          <p className="whitespace-pre-line mt-4">
            {formatDescription(product.description)}
          </p>

          <p className="mt-4 opacity-70 body-sm">
            1-2 dages levering
          </p>

          <p className="mt-1 opacity-70 body-sm">
            5 stk. på lager
          </p>

          <div className="flex gap-2 mt-6">
              <button className="cursor-pointer px-6 py-3 w-[50%] bg-(--color-accent) text-(--color-text) rounded-[10px]">
            Læg i kurv
          </button>

          <button className="cursor-pointer px-4 py-3 bg-(--color-accent) text-(--color-text) rounded-[10px]">
            <Heart/>
          </button>
          </div>
        

        </div>

      </section>



      {/* ARTIST */}
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

      {/* RELATERET */}
     {artistProducts.length > 0 && (
  <section className="p-12 pt-0">

    <h2 className="mb-6 h2">
      Flere produkter fra {artist.name}
    </h2>

    <ProductGrid
      products={artistProducts}
      layout="horizontal"
      showEditorial={false}
    />

  </section>
)}

{related.length > 0 && (
  <section className="p-12 pt-0">

    <h2 className="mb-6 h2">
      Flere {product.product_categories?.[0]?.categories?.name}
    </h2>

    <ProductGrid
      products={related}
      layout="horizontal"
      showEditorial={false}
    />

  </section>
)}

    </div>
  )
}