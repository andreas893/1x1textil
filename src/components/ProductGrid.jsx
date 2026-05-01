import EditorialBlock from "./EditorialBlock"
import ProductCard from "./ProductCard"

export default function ProductGrid({
  products = [],
  layout = "grid",        // "grid" | "horizontal"
  showEditorial = false,
  editorialIndex = 12,
  columns = 4
}) {
  if (!products.length) return null

  const first = showEditorial ? products.slice(0, editorialIndex) : products
  const rest = showEditorial ? products.slice(editorialIndex) : []

  return (
    <div>

      {/* GRID */}
      <div
        className={
          layout === "grid"
            ? `grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6 md:p-12 lg:pt-4 gap-6`
            : "flex gap-4 overflow-x-auto"
        }
      >

        {first.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}

      </div>

      {/* EDITORIAL */}
      {showEditorial && <EditorialBlock />}

      {/* REST */}
      {showEditorial && (
        <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 lg:pt-4 md:p-12 mt-6`}>
          {rest.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

    </div>
  )
}