
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import supabase from "../lib/Supabase"
import ProductGrid from "./ProductGrid"

export default function ArtistShowcase({ artist }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (!artist?.id) return

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, title, image, price, is_new, is_unique")
        .eq("artist_id", artist.id)
        .limit(3) // screenshottet viser 3 produkter

      if (error) { console.error(error); return }

      setProducts(data.sort(() => Math.random() - 0.5))
    }

    fetchProducts()
  }, [artist?.id])

  if (!artist) return null

  return (
    <section className="py-12 border-b border-[var(--color-border)]">
      {/*
        Desktop: [portræt 280px] [højre kolonne: tekst + produkter]
        Tablet:  samme men lidt smallere portræt
        Mobil:   stacked
      */}
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-8 lg:gap-12 items-start">

        {/* VENSTRE — portræt + CTA */}
        <div className="flex flex-col gap-3">
          <div className="overflow-hidden rounded-[5px]">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-[50vh] md:h-[55vh] object-cover object-top"
            />
          </div>

          <Link
            to={`/artist/${artist.slug}`}
            className="text-sm underline underline-offset-4 w-fit"
          >
            Se {artist.name}s arbejde →
          </Link>
        </div>

        {/* HØJRE — navn + by + produkter */}
        <div className="flex flex-col gap-6">

          {/* Navn og lokation */}
          <div className="flex flex-col gap-1 pt-1">
            <p className="text-lg font-medium">
              {artist.name}
              <span className="font-normal text-[var(--color-text-secondary)]">
                {" "}— {artist.role || "Kunsthåndværker"}
              </span>
            </p>

            {(artist.city || artist.country) && (
              <p className="text-sm text-[var(--color-text-secondary)]">
                {[artist.city, artist.country].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>

             {/* PRODUCTS */}
            <ProductGrid
                products={products}
                layout="horizontal"
                variant="featured"
            />

        </div>
      </div>
    </section>
  )
}