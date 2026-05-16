import { useEffect, useState } from "react"
import supabase from "../lib/Supabase"
import { mixProducts } from "../utils/mixProducts"

export default function useCategoryProducts({
  categorySlug,
  limit = 6,
  mix = true
}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!categorySlug) return

    const fetchProducts = async () => {
      setLoading(true)

      try {
        // 1. find kategori
        const { data: category, error: catError } = await supabase
          .from("categories")
          .select("id")
          .eq("slug", categorySlug)
          .single()

        if (catError || !category) {
          console.error("Category error:", catError)
          setProducts([])
          return
        }

        // 2. find children
        let categoryIds = [category.id]

        const { data: children } = await supabase
          .from("categories")
          .select("id")
          .eq("parent_id", category.id)

        if (children?.length) {
          categoryIds = [category.id, ...children.map(c => c.id)]
        }

        // 3. fetch produkter
        const { data, error } = await supabase
          .from("product_categories")
          .select(`
            category_id,
            categories (
              id,
              name
            ),
            products (
              id,
              title,
              price,
              image,
              artist_id
            )
          `)
          .in("category_id", categoryIds)
          .limit(40)

        if (error) {
          console.error("Product fetch error:", error)
          setProducts([])
          return
        }

        // 4. dedupe
        let unique = [
          ...new Map(
            data
              .filter(item => item.products)
              .map(item => [
                item.products.id,
                {
                  ...item.products,
                  category: item.categories?.name
                }
              ])
          ).values()
        ]

        // 5. mix (valgfrit)
        if (mix) {
          unique = mixProducts({
            products: unique,
            limit,
            groupBy: "artist_id"
          })
        } else {
          unique = unique.slice(0, limit)
        }

        setProducts(unique)

      } catch (err) {
        console.error("Unexpected error:", err)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categorySlug, limit, mix])

  return { products, loading }
}