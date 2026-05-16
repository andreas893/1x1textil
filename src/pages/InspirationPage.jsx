import { useEffect, useState } from "react"
import supabase from "../lib/Supabase"
import InspirationGrid from "../components/InspirationGrid"

export default function InspirationPage() {
  const [posts, setPosts] = useState([])
  const [activeFilter, setActiveFilter] = useState("all")

    const types = [...new Set(posts.map(p => p.type))]

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

  const filteredPosts =
  activeFilter === "all"
    ? posts
    : posts.filter(p => p.type === activeFilter)

  return (
    <section className="py-12 text-(--color-text)">

      {/* HEADER */}
      <div className="text-center px-4 mb-8">
        <h1 className="h1 mb-8">
          Inspiration
        </h1>

       <div className="flex gap-1 justify-center overflow-x-auto text-sm">
        {/* ALT */}
        <span
            onClick={() => setActiveFilter("all")}
            className={`cursor-pointer body-lg whitespace-nowrap transition-opacity
            ${activeFilter === "all" ? "opacity-100" : "opacity-40"}
            `}
        >
            Alt,
        </span>

        {/* TYPES */}
        {types.map(type => (
            <span
            key={type}
            onClick={() => setActiveFilter(type)}
            className={`cursor-pointer body-lg whitespace-nowrap transition-opacity hover:opacity-100
                ${activeFilter === type ? "opacity-100" : "opacity-40"}
            `}
            >
            {type},
            </span>
        ))}

        </div>

        <div className="border-b mt-6 mx-auto w-full max-w-5xl" />
      </div>

      {/* GRID */}
      <div className="mx-auto md:px-12">
        <InspirationGrid posts={filteredPosts} layout="grid" />
      </div>

    </section>
  )
}