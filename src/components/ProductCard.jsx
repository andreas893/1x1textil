
import { Link } from "react-router-dom"

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>
                      
        <div key={product.id} className="group cursor-pointer h-110 bg-surface rounded-[10px] min-w-[340px]">

            <div className="overflow-hidden">
                <img
                    src={product.image}
                    className="w-full h-76 object-cover rounded-t-[10px] transition-transform duration-300 group-hover:scale-105"
                />
            </div>

                    
        
            <div className="mt-2 px-4 flex flex-col gap-1">
                <p className="body-sm opacity-70 border-b w-[30%]">
                    {product.category}
                </p>
                        
                <p className="mt-1 body leading-tight line-clamp-2">
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