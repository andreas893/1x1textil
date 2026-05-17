import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import supabase from "../lib/Supabase"
import ArtistShowcase from "./ArtistShowcase"
import { ArrowRight } from "lucide-react"

export default function ArtistSection() {
  const [artists, setArtists] = useState([])
  const featuredArtists = artists.filter(a =>
  ["bjarni-sigurdsson", "julie-damhus"].includes(a.slug)
)

  useEffect(() => {
    const fetchArtists = async () => {
      const { data, error } = await supabase
        .from("artists")
        .select("*")

      if (error) {
        console.error(error)
        return
      }

      setArtists(data)
    }

    fetchArtists()
  }, [])

  return (
    <section className="pt-12">
        <div className="flex flex-col md:flex-row justify-between px-4 mb-6 md:px-12">
             <h2 className="h2">
                Udvalgte kunsthåndværkere
            </h2>

            <Link className="flex pt-2 body-sm md:body items-center border-b w-fit h-fit" to="/artists">Se alle kunsthåndværkere <ArrowRight size={18}/></Link>
        </div>

      <div className="flex flex-col md:px-12 gap-8">
        {featuredArtists.map((artist, i) => (
          <ArtistShowcase key={artist.id} artist={artist} index={i} />
        ))}
      </div>
    </section>
  )
}