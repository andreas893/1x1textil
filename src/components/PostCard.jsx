import { Link } from "react-router-dom"

export default function PostCard({ post, variant = "default" }) {
  return (
    <Link to={`/inspiration/${post.slug}`} className="group block">

      <div className="overflow-hidden rounded-[8px]">
        <img
          src={post.image}
          alt={post.title}
          className="h-[40vh] w-full md:h-[60vh] object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-2 flex flex-col">
         <p className="body opacity-70">
          {post.type}
        </p>

        <h4 className="body-lg font-sans! leading-tight">
          {post.title}
        </h4>
      </div>

    </Link>
  )
}