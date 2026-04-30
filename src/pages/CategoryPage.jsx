import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../lib/Supabase"
import { Link } from "react-router-dom"
import { useRef } from "react"
import ArtistModul from "../components/ArtistModul"
import ProductGrid from "../components/ProductGrid"
import { SlidersHorizontal } from "lucide-react"
import { ArrowDownWideNarrow } from "lucide-react"

export default function CategoryPage() {
const gridRef = useRef(null)
const { slug } = useParams()
const [category, setCategory] = useState(null)
const [products, setProducts] = useState([])
const [subcategories, setSubcategories] = useState([])
const [parent, setParent] = useState(null)
const [artists, setArtists] = useState([])

const BREAKPOINT = 12

const firstBatch = products.slice(0, BREAKPOINT)
const restBatch = products.slice(BREAKPOINT)

const [page, setPage] = useState(1)
const [totalCount, setTotalCount] = useState(0)

const PAGE_SIZE = 32

const totalPages = Math.ceil(totalCount / PAGE_SIZE)

// fetch kateori
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

//fetch produkter 
async function fetchProducts(cat) {

  let categoryIds = [cat.id]

  const { data: children } = await supabase
    .from("categories")
    .select("id")
    .eq("parent_id", cat.id)

  if (children?.length) {
    categoryIds = [cat.id, ...children.map(c => c.id)]
  }

  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const { data, error, count } = await supabase
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
    image
      )
    `, { count: "exact" })
    .in("category_id", categoryIds)
    .range(from, to)

  if (error) {
    console.log(error)
    return
  }

  const unique = [
  ...new Map(
    data
      .filter(item => item.products)
      .map(item => [
        item.products.id,
        {
          ...item.products,
          category: item.categories?.name // 👈 HER
        }
      ])
  ).values()
]

  setProducts(unique)
  setTotalCount(count || 0)
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
  if (!cat.parent_id) {
    setParent(null) // resetter hver gang man skifter til en ny kategori
    return
  }

  const { data } = await supabase
    .from("categories")
    .select("*")
    .eq("id", cat.parent_id)
    .single()

  setParent(data)
}

// Hent artists
async function fetchArtists(cat) {

  let categoryIds = [cat.id]

  const { data: children } = await supabase
    .from("categories")
    .select("id")
    .eq("parent_id", cat.id)

  if (children?.length) {
    categoryIds = [cat.id, ...children.map(c => c.id)]
  }

  const { data, error } = await supabase
    .from("products")
    .select(`
      artist_id,
      artists (
        id,
        name,
        slug,
        image,
        bio
      ),
      product_categories!inner (
        category_id
      )
    `)
    .in("product_categories.category_id", categoryIds)

  if (error) {
    console.log("Artist fetch error:", error)
    return
  }

  const unique = [
    ...new Map(
      data
        .filter(item => item.artists)
        .map(item => [item.artists.id, item.artists])
    ).values()
  ]

  setArtists(unique)
}

//fetch kategori, produkter, breadcrumbs
useEffect(() => {
  async function init() {
    const cat = await fetchCategory()

    if (!cat) return

    await fetchProducts(cat)
    await fetchSubcategories(cat)
    await fetchParent(cat)
    await fetchArtists(cat)
  }

  init()
}, [slug, page])

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

useEffect(() => {
  setPage(1)
}, [slug])

//scroll når page ændres
useEffect(() => {
  if (gridRef.current) {
    gridRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  }
}, [page])



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
      <section ref={gridRef}>
     <div className="text-sm font-serif mb-6 px-12">
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
        
        <h2 className="h2 mb-6 pl-12">Alt {slug} fra butikken</h2>

        <div className="flex justify-between mb-6 text-sm border-b border-t pl-12 pr-12 pt-2 pb-2">
          <button className="flex gap-2 cursor-pointer">Filtrer <SlidersHorizontal size={20}/> </button>
          <button className="flex gap-2 cursor-pointer">Sorter <ArrowDownWideNarrow size={20}/> </button>
        </div>

        <ProductGrid 
            products={products}
            layout="grid"
            showEditorial={true}
            columns={4}
        />

    

        <div className="flex gap-2 justify-center mt-12">

            <div className="border rounded-[5px]">
                 {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 cursor-pointer ${
                    page === p ? "bg-(--color-text) text-white" : ""
                }`}
                >
                {p}
                </button>
            ))}
            </div>

        </div>
      </section>


      {/* ARTISTS */}
        <ArtistModul artists={artists} title={`Kunsthåndværkere inden for ${category?.name}`} />


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