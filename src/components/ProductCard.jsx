
import { Link } from "react-router-dom"

export default function ProductCard({ product, variant = "default" }) {
   
    // ===== FEATURED (forside) =====
  if (variant === "featured") {
    return (
      <Link to={`/product/${product.id}`}>
        <div className="group flex flex-col cursor-pointer rounded-[10px] h-[400px] overflow-hidden ] min-w-[240px] mb-12">

          {/* IMAGE */}
          <div className="overflow-hidden">
            <img
              src={product.image}
              className="w-full h-90 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* CONTENT */}
          <div className=" pt-4 flex flex-col justify-between">

           {/* TOP CONTENT */}
            <div className="flex flex-col gap-2">

            <p className="body leading-tight w-[55%] line-clamp-2">
                {product.title}
            </p>

            <p className="body-sm pb-4 opacity-70">
                {product.category || " "}
            </p>

            </div>

            {/* CTA ROW */}
            <div className="flex justify-between items-center py-2 border-b border-t font-medium">

              {/* CTA */}
              <span className="relative">
                Tilføj til kurv
                <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-(--color-text) transition-all duration-300 group-hover:w-full" />
              </span>

              {/* PRICE */}
              <span className="body-sm mt-1 font-bold">
                {product.price} kr
              </span>

            </div>

          </div>
        </div>
      </Link>
    )
  }

  
    return (
    <Link to={`/product/${product.id}`}>
                      
        <div key={product.id} className="group cursor-pointer bg-surface rounded-[10px] max-h-[500px] overflow-hidden">

            <div className="overflow-hidden aspect-square">
                <img
                    src={product.image}
                    className="w-full h-full object-cover rounded-t-[10px] transition-transform duration-300 group-hover:scale-105"
                />
            </div>

                    
        
            <div className="mt-2 px-4 pb-4 flex flex-col gap-1">
                <p className="body-sm opacity-70 border-b w-[30%]">
                    {product.category}
                </p>
                        
                <p className="mt-1 body-sm leading-tight line-clamp-2 h-[4em] md:h-[4em]">
                    {product.title}
                </p>

                <p className="body-sm mt-1 font-bold">
                    {product.price} kr
                </p>
            </div>

        </div>
    </Link>
  )
}