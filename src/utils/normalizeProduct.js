export function normalizeProduct(p) {
  const categories =
    p.product_categories?.map(pc => pc.categories) || []

  const specific =
    categories.find(c => c.parent_id !== null) || categories[0]

  return {
    ...p,
    category: specific?.name || "",
    categorySlug: specific?.slug || ""
  }
}