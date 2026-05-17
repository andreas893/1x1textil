import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../lib/Supabase"
import InspirationGrid from "./InspirationGrid"
import { ArrowRight } from "lucide-react"

function InspirationSection() {
    const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false })

      if (error) {
        console.error(error)
        return
      }

      setPosts(data)
    }

    fetchPosts()
  }, [])

  return (
    <section className='py-12 md:px-0'>
            <h2 className='h2 px-4 md:px-12 pb-6'>Inspiration fra butikken</h2>
           <InspirationGrid posts={posts} layout="horizontal"/>

           <Link className="flex items-center p-2 ml-4 md:ml-12 rounded-[10px] bg-surface w-fit mt-4" to="/inspiration">Se alle indlæg <ArrowRight size={18}/></Link>
    </section>
  )
}

export default InspirationSection