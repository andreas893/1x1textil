import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import supabase from "../lib/Supabase"
import ArtistShowcase from "./ArtistShowcase"
import { ArrowRight } from "lucide-react"

export default function ArtistSection() {
  const [artists, setArtists] = useState([])

  useEffect(() => {
    const fetchArtists = async () => {
      const { data, error } = await supabase
        .from("artists")
        .select("*")
        .limit(2)

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
        <div className="flex justify-between px-4 mb-6 md:px-12">
             <h2 className="h2">
                Udvalgte kunsthåndværkere
            </h2>

            <Link className="flex items-center border-b w-fit h-fit" to="/artists">Se alle kunsthåndværkere <ArrowRight size={18}/></Link>
        </div>

      <div className="flex flex-col gap-8">
        {artists.map((artist) => (
          <ArtistShowcase key={artist.id} artist={artist} />
        ))}
      </div>
    </section>
  )
}