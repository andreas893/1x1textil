const { data: children } = await supabase
  .from("categories")
  .select("*")
  .eq("parent_id", category.id)

export default function CategorySubNav({ categories }) {
  return (
    <section>
      <h2>Se vores udvalg af keramik</h2>

      <div className="grid grid-cols-4 gap-4">
        {categories.map(cat => (
          <Link to={`/shop/${cat.slug}`} key={cat.id}>
            <div>
              <img src="/placeholder.jpg" />
              <p>{cat.name} →</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}