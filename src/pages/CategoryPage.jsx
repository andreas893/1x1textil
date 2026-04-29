import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../lib/Supabase"
import { Link } from "react-router-dom"
import { SlidersHorizontal } from "lucide-react"
import { ArrowDownWideNarrow } from "lucide-react"

export default function CategoryPage() {
  const { slug } = useParams()
  const [category, setCategory] = useState(null)
const [products, setProducts] = useState([])
const [subcategories, setSubcategories] = useState([])
const [parent, setParent] = useState(null)

// fetch
async function fetchCategory() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.log("Category error:", error)
    return
  }

  setCategory(data)
  console.log(products)
  return data
}

//fetch produkter fra kategori
async function fetchProducts(cat) {

  let categoryIds = [cat.id]

  // find children
  const { data: children } = await supabase
    .from("categories")
    .select("id")
    .eq("parent_id", cat.id)

  if (children?.length) {
    categoryIds = [cat.id, ...children.map(c => c.id)]
  }

  // hent produkter via join table
  const { data, error } = await supabase
    .from("product_categories")
    .select(`
      products (
        id,
        title,
        price,
        image
      )
    `)
    .in("category_id", categoryIds)

  if (error) {
    console.log("Product fetch error:", error)
    return
  }

  // fjern duplicates
  const unique = [
    ...new Map(
      data.map(item => [item.products.id, item.products])
    ).values()
  ]

  setProducts(unique)
}

async function fetchSubcategories(cat) {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("parent_id", cat.id)

  if (error) {
    console.log("Subcategory error:", error)
    return
  }

  setSubcategories(data || [])
}



async function fetchParent(cat) {
  if (!cat.parent_id) return

  const { data } = await supabase
    .from("categories")
    .select("*")
    .eq("id", cat.parent_id)
    .single()

  setParent(data)
}

//fetch kategori, produkter, breadcrumbs
useEffect(() => {
  async function init() {
    const cat = await fetchCategory()

    if (!cat) return

    await fetchProducts(cat)
    await fetchSubcategories(cat)
    await fetchParent(cat)
  }

  init()
}, [slug])

// mousewheel scroll
useEffect(() => {
  const el = document.querySelector(".horizontal-scroll")

  if (!el) return

  const onWheel = e => {
    if (e.deltaY !== 0) {
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }
  }

  el.addEventListener("wheel", onWheel)

  return () => el.removeEventListener("wheel", onWheel)
}, [])



  return (
    <div className="space-y-16 text-(--color-text)">

      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-10 items-center p-12">
        <div>
          <h1 className="text-4xl font-semibold capitalize">{slug}</h1>
          <p className="mt-4 max-w-md">
            Håndlavet keramik med fokus på form, funktion og materialets karakter.
          </p>
        </div>

            <img
        src={category?.image}
        className="w-full h-[300px] object-cover"
        />
      </section>


      {/* SUBCATEGORIES */}
      <section className="bg-(--color-surface) p-12">
        <h2 className="mb-6 h2 ">Udforsk vores udvalg</h2>

        <div className="flex gap-4 pb-4 pt-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
        {subcategories.map(cat => (
            <a href={`/shop/${cat.slug}`} key={cat.id} className="min-w-[240px] snap-start">
            <div>
                <img src={cat.image || "/fallback.jpg"} className="w-full h-70 object-cover rounded-[5px]" />
                <p className="mt-2">{cat.name} →</p>
            </div>
            </a>
        ))}
        </div>
      </section>


      {/* PRODUCT GRID */}
      <section className="">
     <div className="text-sm font-serif mb-6 p-12">
            <Link to="/" className="hover:underline">Hjem</Link>

            <span className="mx-2">/</span>

            {parent && (
                <>
                <Link to={`/shop/${parent.slug}`} className="hover:underline">
                    {parent.name}
                </Link>
                <span className="mx-2">/</span>
                </>
            )}

            <span className="cursor-pointer">{category?.name}</span>
        </div>
        
        <h2 className="h2 mb-4 pl-12">Alt {slug} fra butikken</h2>

        <div className="flex justify-between mb-6 text-sm border-b border-t pl-12 pr-12 pt-2 pb-2">
          <button className="flex gap-2">Filtrer <SlidersHorizontal size={20}/> </button>
          <button className="flex gap-2">Sorter <ArrowDownWideNarrow size={20}/> </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map(p => (
                <div key={p.id} className="group cursor-pointer">

                <div className="overflow-hidden">
                    <img
                    src={p.image}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                <div className="mt-3">
                    <p className="text-sm leading-tight">
                    {p.title}
                    </p>

                    <p className="text-sm mt-1 text-gray-600">
                    {p.price} kr
                    </p>
                </div>

                </div>
            ))}
        </div>
      </section>


      {/* EDITORIAL BLOCK */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <img
          src="https://images.unsplash.com/photo-1582582494700-86f7f0c3d8b5"
          className="w-full h-[300px] object-cover"
        />

        <div>
          <h3 className="text-xl font-semibold">Nyeste fra kollektionen</h3>
          <p className="mt-2 text-gray-600">
            Farverige lysestager og unikke former inspireret af sæsonens stemning.
          </p>
          <button className="mt-4 px-4 py-2 border">
            Se kollektion
          </button>
        </div>
      </section>


      {/* ARTISTS */}
      <section>
        <h2 className="text-xl mb-6">Kunsthåndværkere</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i}>
              <img
                src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
                className="w-full h-56 object-cover rounded"
              />
              <p className="mt-2">Kunstner navn</p>
            </div>
          ))}
        </div>
      </section>


      {/* INSPIRATION */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <img
          src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
          className="w-full h-[300px] object-cover"
        />

        <div>
          <h3 className="text-xl font-semibold">Inspiration fra butikken</h3>
          <p className="mt-2 text-gray-600">
            Opdag nye måder at bruge kunsthåndværk i din hverdag.
          </p>
          <button className="mt-4 px-4 py-2 border">
            Se inspiration
          </button>
        </div>
      </section>

    </div>
  )
}