import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import supabase from "../lib/Supabase"
import ProductGrid from "./ProductGrid"
import { ArrowRight } from "lucide-react"

export default function ArtistShowcase({ artist, index = 0 }) {
  const [products, setProducts] = useState([])
  const isReversed = index % 2 === 1

  useEffect(() => {
    if (!artist?.id) return

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, title, image, price")
        .eq("artist_id", artist.id)
        .limit(6)

      if (error) {
        console.error(error)
        return
      }

      // let random rækkefølge
      const shuffled = data.sort(() => Math.random() - 0.5)

      setProducts(shuffled)
    }

    fetchProducts()
  }, [artist?.id])

  if (!artist) return null

  return (
    <section className="flex flex-col gap-4 border-b w-full">
        <div className="md:hidden">
             {/* HERO IMAGE */}
      <div className="overflow-hidden rounded-[5px] mx-4">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-[50vh] object-cover "
        />
      </div>

      {/* TEXT */}
      <div className="flex flex-col gap-1 px-4 mt-2">
        <p className="text-lg font-medium">
          {artist.name} — {artist.role || "Kunsthåndværker"}
        </p>

        {(artist.city || artist.country) && (
          <p className="text-sm opacity-70">
            {artist.city} {artist.city && artist.country ? "·" : ""} {artist.country}
          </p>
        )}
        
          {/* CTA */}
      <Link
        to={`/artist/${artist.slug}`}
        className="w-fit px-4 py-2 mt-2 mb-10 rounded-full bg-surface text-sm"
      >
        Se alle værker af {artist.name}
      </Link>
      </div>

       {/* PRODUCTS */}
      <ProductGrid
        products={products}
        layout="horizontal"
        variant="featured"
      />
    </div>
    

    {/* Desktop styling af sektionen */}
<div className={`
  hidden md:grid pb-12 pt-8 gap-8 lg:gap-12 items-start
  ${isReversed 
    ? "md:grid-cols-[2fr_1fr]" 
    : "md:grid-cols-[1fr_2fr]"
  }
`}>

  {/* LEFT — portræt + navn + link */}
    <div className={`
      flex flex-col gap-3
      ${isReversed ? "md:order-2" : "md:order-1"}
    `}>
    <div className="overflow-hidden rounded-[5px]">
      <img
        src={artist.image}
        alt={artist.name}
        className="w-full aspect-3/4 object-cover object-top"
      />
    </div>

    <div>
      <p className="text-base font-medium">
        {artist.name} — {artist.role || "Keramiker"}
      </p>
      <p className="text-sm opacity-60">
        {[artist.city, artist.country].filter(Boolean).join(" · ")}
      </p>
    </div>

    <Link
      to={`/artist/${artist.slug}`}
      className="flex items-center gap-1 border-b w-fit body-sm pb-0.5"
    >
      Se {artist.name}'s arbejde <ArrowRight size={18} />
    </Link>
  </div>

  {/* RIGHT — produkt grid */}
  <div className={`
  grid grid-cols-[1fr_1fr] grid-rows-2 gap-3 aspect-3/2
  ${isReversed ? "md:order-1" : "md:order-2"}
`}>
    {/* Stort billede */}
    {products[0] && (
    <Link
      to={`/product/${products[0].id}`}
      className="group row-span-2 relative overflow-hidden rounded-[10px]"
    >
      <img
        src={products[0].image}
        alt={products[0].title}
        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
        <p className="text-white body-sm">
          {products[0].title}
        </p>
      </div>
    </Link>
  )}

    {/* To mindre billeder */}
    {products[1] && (
    <Link
      to={`/product/${products[1].id}`}
      className="group relative overflow-hidden rounded-[10px]"
    >
      <img
        src={products[1].image}
        alt={products[1].title}
        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-3">
        <p className="text-white body-sm">
          {products[1].title}
        </p>
      </div>
    </Link>
  )}

    {products[2] && (
    <Link
      to={`/product/${products[2].id}`}
      className="group relative overflow-hidden rounded-[10px]"
    >
      <img
        src={products[2].image}
        alt={products[2].title}
        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-3">
        <p className="text-white body-sm">
          {products[2].title}
        </p>
      </div>
    </Link>
  )}

  </div>

</div>
    
</section>
  )
}