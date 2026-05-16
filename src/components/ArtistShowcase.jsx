import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import supabase from "../lib/Supabase"
import ProductGrid from "./ProductGrid"
import { ArrowRight } from "lucide-react"

export default function ArtistShowcase({ artist }) {
  const [products, setProducts] = useState([])

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
    <section className="flex flex-col gap-4 border-b">
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
        className="w-fit px-4 py-2 mt-2 mb-10 rounded-full bg-[#D9D4C7] text-sm"
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
    <div className="hidden md:grid px-12 pb-12 pt-8 md:grid-cols-2 gap-8 lg:gap-12">

        {/* LEFT */}
        <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-[5px]">
            <img
                src={artist.image}
                className="w-full h-full object-cover"
            />
            </div>

            <Link
            to={`/artist/${artist.slug}`}
            className="flex items-center border-b w-fit text-sm"
            >
            Se {artist.name}’s arbejde <ArrowRight size={18}/>
            </Link>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-4">

            {/* TEXT */}
            <div>
            <p className="text-xl font-medium">
                {artist.name} — {artist.role || "Keramiker"}
            </p>

            <p className="text-sm opacity-70">
                {artist.city} {artist.country}
            </p>
            </div>

            {/* PRODUCTS (custom grid) */}
            <div className="flex gap-3">

            {products.slice(0, 3).map((p, i) => (
                <div
                key={p.id}
                className={i === 0 ? "col-span-2 row-span-2" : ""}
                >
                <img
                    src={p.image}
                    className="w-full h-full object-cover rounded-[10px]"
                />
                </div>
            ))}

            </div>

        </div>

    </div>
    
</section>
  )
}