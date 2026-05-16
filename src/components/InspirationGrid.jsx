import PostCard from "./PostCard"

export default function InspirationGrid({
  posts = [],
  layout = "grid" // "grid" | "horizontal"
}) {
  if (!posts.length) return null

  return (
    <div>

      {layout === "horizontal" ? (
        <div className="flex gap-4 px-4 no-scrollbar overflow-x-auto snap-x snap-mandatory md:hidden">
          {posts.map(post => (
            <div key={post.id} className="snap-start min-w-[280px]">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

    </div>
  )
}