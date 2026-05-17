import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import supabase from "../lib/Supabase"
import PostCard from "../components/PostCard"
import ProductGrid from "../components/ProductGrid"
import useCategoryProducts from "../hooks/useCategoryProducts"

export default function PostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])

    // fetch andre posts
  useEffect(() => {
  if (!post) return

  const fetchOtherPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .neq("id", post.id)
      .limit(3)

    if (error) {
      console.error(error)
      return
    }

    setRelatedPosts(data)
  }

  fetchOtherPosts()
}, [post])

    // fetch posts
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          post_blocks (
            id,
            type,
            heading,
            content,
            image,
            images,
            sort_order
          )
        `)
        .eq("slug", slug)
        .single()

      if (error) {
        console.error(error)
        return
      }

      setPost(data)
    }

    fetchPost()
  }, [slug])


    // fetch related kategorier og produkter
  const { products: relatedProducts } = useCategoryProducts({
  categorySlug: post?.category_slug,
  limit: 6,
  mix: true
})

  if (!post) {
    return <div className="py-20 text-center">Loading...</div>
  }



  // Sort blocks korrekt
  const blocks = post.post_blocks
  ? [...post.post_blocks].sort((a, b) => a.sort_order - b.sort_order)
  : []

  return (
    <div className="text-(--color-text)">
        <article className="max-w-3xl mx-auto px-4 py-12">

      <div className="space-y-12">

        <div className="mb-14 text-center">

        <p className="body-sm opacity-60 mb-2">
            {post.type}
        </p>

        <h1 className="h1">
            {post.title}
        </h1>

        </div>

        {blocks.map((block) => {

          //  tekst
         if (block.type === "text") {
            return (
                <div key={block.id} className="max-w-2xl mx-auto">

                {block.heading && (
                    <p className="body-sm tracking-wide mb-3 opacity-60">
                    {block.heading}
                    </p>
                )}

                <p className="body-lg leading-relaxed">
                    {block.content}
                </p>
                </div>
            )
            }

          // single image
          if (block.type === "image") {
            return (
              <div key={block.id}>
                <img
                  src={block.image}
                  alt=""
                  className="w-full rounded-[5px]"
                />
              </div>
            )
          }

          // images gallery - 2 billeder
          if (block.type === "gallery" && block.images) {
            return (
              <div key={block.id} className="grid grid-cols-2 gap-4">
                {block.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="w-full rounded-[5px]"
                  />
                ))}
              </div>
            )
          }

          return null
        })}
         <div className="border-b mt-6 mx-auto w-full max-w-5xl" />
      </div>

    </article>

        <div className="pb-12">
             {relatedProducts.length > 0 && (
        <section className="mt-8">

            <h2 className="h2 mb-6 px-4 md:px-12">
            Udforsk produkter
            </h2>

            <ProductGrid
            products={relatedProducts}
            layout="horizontal"
            variant="featured"
            />

        </section>
        )}

         {relatedPosts.length > 0 && (
        <section className="mt-20 md:px-12">

            <h2 className="h2 px-4 md:px-0 mb-6 ">
            Flere indlæg
            </h2>

            <div className="no-scrollbar px-4 md:px-0 flex gap-4 overflow-x-auto snap-mandatory
  md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
            {relatedPosts.map(p => (
                <div className="snap-start min-w-[75%] sm:min-w-[45%] md:min-w-0">
                     <PostCard key={p.id} post={p} />
                </div>
            ))}
            </div>

        </section>
        )}
        </div>
    </div>
    
   
  )
}