import EditorialBlock from "./EditorialBlock"
import ProductCard from "./ProductCard"

export default function ProductGrid({
  products = [],
  layout = "grid",        // "grid" | "horizontal"
  showEditorial = false,
  editorialIndex = 12,
  variant = "default",
}) {
  if (!products.length) return null

  const first = showEditorial ? products.slice(0, editorialIndex) : products
  const rest = showEditorial ? products.slice(editorialIndex) : []

  return (
    <div>

      {/* 2 forskellige layouts til produktgriddet */}
      <div
        className={
          layout === "grid"
            ? `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 md:px-12 py-4 md:py-8 gap-4 md:gap-6`
            : "overflow-x-auto scrollbar-hide no-scrollbar"
        }
      >

        {layout === "horizontal" ? (
          <div className="flex gap-2 px-4 mr-4 md:px-12 lg:px-12 snap-x snap-mandatory">
            {first.map(p => (
              <div key={p.id} className="snap-start pr-4 lg:pr-4 min-w-[240px]">
                <ProductCard product={p} variant={variant}/>
              </div>
            ))}
          </div>
        ) : (
          first.map(p => (
            <ProductCard key={p.id} product={p} variant={variant} />
          ))
        )}

      </div>

      {/* EDITORIAL */}
      {showEditorial && <EditorialBlock />}

      {/* REST */}
      {showEditorial && (
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 md:px-12 py-4 md:py-8 gap-4 md:gap-6`}>
          {rest.map(p => (
            <ProductCard key={p.id} product={p} variant={variant} />
          ))}
        </div>
      )}

    </div>
  )
}