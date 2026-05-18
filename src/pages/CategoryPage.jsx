import { useParams, Link } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import supabase from "../lib/Supabase"
import ArtistModul from "../components/ArtistModul"
import ProductGrid from "../components/ProductGrid"
import CategorySubNav from "../components/CategorySubNav"
import { useCategories } from "../context/CategoryContext"
import { SlidersHorizontal } from "lucide-react"
import { mixProducts } from "../utils/mixProducts"
import { normalizeProduct } from "../utils/normalizeProduct"

export default function CategoryPage() {
  const gridRef = useRef(null)
  const { slug } = useParams()

  const [category, setCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [parent, setParent] = useState(null)
  const [artists, setArtists] = useState([])
  const [sort, setSort] = useState("popular")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [artistCounts, setArtistCounts] = useState([])
  const [selectedArtists, setSelectedArtists] = useState([])

  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const PAGE_SIZE = 32
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  const { categories } = useCategories()

  const filterRef = useRef(null)


  // fetch products
  async function fetchProducts(cat) {

    let categoryIds = [cat.id]

    const { data: children } = await supabase
      .from("categories")
      .select("id")
      .eq("parent_id", cat.id)

    if (children?.length) {
      categoryIds = [cat.id, ...children.map(c => c.id)]
    }

    //  popular
    if (sort === "popular") {

      const FETCH_SIZE = 120

      const { data, error, count } = await supabase
        .from("products")
        .select(`
          id,
          title,
          price,
          image,
          artist_id,
          product_categories!inner (
            category_id,
            categories (
              id,
              name,
              parent_id
            )
          )
        `, { count: "exact" })
        .in("product_categories.category_id", categoryIds)
        .range(0, FETCH_SIZE - 1)

      if (error) {
        console.log(error)
        return
      }

      let processed = data.map(normalizeProduct)

      // shuffle
      processed = processed.sort(() => 0.5 - Math.random())

      // Filter før mix
      if (selectedArtists.length > 0) {
        processed = processed.filter(p =>
          selectedArtists.includes(p.artist_id)
        )
      }

      // derefter mix
      processed = mixProducts({
        products: processed,
        limit: PAGE_SIZE,
        groupBy: "artist_id"
      })

      
      setProducts(processed)
      setTotalCount(count || 0)
      return
    }

    // ALFABETISK (NORMAL PAGINATION)
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    let query = supabase
      .from("products")
      .select(`
        id,
        title,
        price,
        image,
        artist_id,
        product_categories!inner (
          category_id,
          categories (
            id,
            name,
            parent_id
          )
        )
      `, { count: "exact" })
      .in("product_categories.category_id", categoryIds)
      .order("title", { ascending: true })
      .range(from, to)

    const { data, error, count } = await query

    if (error) {
      console.log(error)
      return
    }

    let processed = data.map(normalizeProduct)

      // filter efter artist
    if (selectedArtists.length > 0) {
      processed = processed.filter(p =>
        selectedArtists.includes(p.artist_id)
      )
    }
    
    setProducts(processed)
    setTotalCount(count || 0)
  }

  function fetchSubcategories(cat) {
    const subs = categories.filter(c => c.parent_id === cat.id)
    setSubcategories(subs)
  }

  function fetchParent(cat) {
    if (!cat.parent_id) {
      setParent(null)
      return
    }

    const parentCat = categories.find(c => c.id === cat.parent_id)
    setParent(parentCat)
  }

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
      console.log(error)
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

    // fetch artist count - antal produkter
  async function fetchArtistCounts(cat) {

  let categoryIds = [cat.id]

  const { data: children } = await supabase
    .from("categories")
    .select("id")
    .eq("parent_id", cat.id)

  if (children?.length) {
    categoryIds = [cat.id, ...children.map(c => c.id)]
  }

  const { data, error } = await supabase
    .from("product_categories")
    .select(`
      product:products (
        artist_id
      )
    `)
    .in("category_id", categoryIds)

  if (error) {
    console.log(error)
    return
  }

  const counts = {}

  data.forEach(item => {
    const artistId = item.product?.artist_id
    if (!artistId) return

    counts[artistId] = (counts[artistId] || 0) + 1
  })

  // merge med artist data
  const result = artists.map(a => ({
    ...a,
    count: counts[a.id] || 0
  }))

  setArtistCounts(result)
}

    // main fetch
  useEffect(() => {
  if (!categories.length) return


  const cat = categories.find(c => c.slug === slug)
  if (!cat) return

  setCategory(cat)

  fetchProducts(cat)
  fetchSubcategories(cat)
  fetchParent(cat)
  fetchArtists(cat)

}, [slug, page, categories, sort, selectedArtists])

  useEffect(() => {
    setPage(1)
  }, [slug])

  // useeffect til artist antal af produkter
 useEffect(() => {
  if (!category || artists.length === 0) return
  fetchArtistCounts(category)
}, [artists, category])
  

  // scroll smooth ved sideskift og scroll to top
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
    }
  }, [page])

  // close overlay ved klik uden for
  useEffect(() => {
  if (!isFilterOpen) return

  function handleClickOutside(e) {
    if (filterRef.current && !filterRef.current.contains(e.target)) {
      setIsFilterOpen(false)
    }
  }

  document.addEventListener("mousedown", handleClickOutside)

  return () => {
    document.removeEventListener("mousedown", handleClickOutside)
  }
}, [isFilterOpen])

  function toggleArtist(id) {
  setSelectedArtists(prev =>
    prev.includes(id)
      ? prev.filter(a => a !== id)
      : [...prev, id]
  )
}

console.log(category)

  return (
    <div className="space-y-12 text-(--color-text)">

      <section className="grid md:grid-cols-2 gap-6 items-center px-4 pt-8 md:p-12">
        <div className="flex gap-6 justify-between md:flex lg:flex flex-col md:gap-0">
          <h1 className="h1">{category?.name}</h1>
          {category?.intro && (
            <p className="md:mt-4 body-lg w-2xs">
              {category.intro}
            </p>
          )}
        </div>

        <img
          src={category?.image}
          className="w-full aspect-3/2 rounded-[5px] object-cover"
        />
      </section>

      {!category?.parent_id && subcategories.length > 0 && (
        <CategorySubNav 
          categories={subcategories} 
          parentName={category.name}
        />
      )}

      <section ref={gridRef} className="mt-20">

        <div className="font-serif px-4 pb-6 md:px-12 body-sm">
          <Link to="/">Hjem</Link>

          {parent && (
            <>
              <span className="mx-2">/</span>
              <Link to={`/shop/${parent.slug}`} className="hover:underline">
                {parent.name}
              </Link>
            </>
          )}

          {category && (
            <>
              <span className="mx-2">/</span>
              <span className="font-medium text-(--color-text)">
                {category.name}
              </span>
            </>
          )}
        </div>

        <h2 className="h2 mb-6 pl-4 md:pl-12">
          Hele kollektionen af {category?.name}
        </h2>

        <div className="flex justify-between mb-2 text-sm border-b border-t px-4 md:px-12 py-2">
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex gap-2 cursor-pointer"
            >
              Filtrer <SlidersHorizontal size={20}/>
            </button>
            
           {isFilterOpen && (
            <div className="relative inset-0 z-50"
            ref={filterRef}>

              {/* BACKDROP */}
              <div
                className="absolute inset-0"
                onClick={() => setIsFilterOpen(false)}
              />

              {/* PANEL */}
              <div className="absolute top-auto mt-2 w-[300px] bg-white border rounded-[5px] p-4 z-10"
              onClick={(e) => e.stopPropagation()}>

                {/* HEADER */}
                <div className="border-b pb-2 mb-3 flex justify-between items-center">
                  <span>Filtrer efter kunstner</span>

                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-sm opacity-60 cursor-pointer hover:opacity-100"
                  >
                    Luk
                  </button>
                </div>

                {/* STATUS */}
                <div className="mb-3 text-sm opacity-60">
                  {selectedArtists.length === 0
                    ? "Alle produkter"
                    : `${selectedArtists.length} valgt`}
                </div>

                <div className="space-y-2">

                  {/* ALL */}
                  <button
                    onClick={() => setSelectedArtists([])}
                    className={`block cursor-pointer text-left w-full ${
                      selectedArtists.length === 0 ? "font-medium" : ""
                    }`}
                  >
                    • Alle produkter
                  </button>

                  {/* ARTISTS */}
                  {artistCounts.map(a => (
                    <button
                      key={a.id}
                      onClick={() => toggleArtist(a.id)}
                      className={`
                        flex justify-between cursor-pointer w-full text-left hover:opacity-70 transition
                        ${selectedArtists.includes(a.id) ? "font-medium" : ""}
                      `}
                    >
                      <span>
                        {selectedArtists.includes(a.id) ? "• " : ""}
                        {a.name}
                      </span>

                      <span className="opacity-50">
                        ({a.count})
                      </span>
                    </button>
                  ))}

                </div>

              </div>
            </div>
          )}
          </div>
         

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value)
              setPage(1)
            }}
            className="cursor-pointer border rounded-[5px] bg-transparent"
          >
            <option value="popular">Mest populære</option>
            <option value="alphabetical">A–Z</option>
          </select>

        </div>

        <ProductGrid 
          products={products}
          layout="grid"
          showEditorial={true}
        />

        <div className="flex gap-2 justify-center mt-12">
          <div className="border rounded-[5px]">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`
                  px-3 py-1 cursor-pointer transition
                  ${
                    page === p
                      ? "bg-(--color-text) text-white"
                      : "bg-white text-(--color-text) hover:bg-(--color-text) hover:text-white"
                  }
                `}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

      </section>

      <ArtistModul 
        artists={artists} 
        title={`Kunsthåndværkere inden for ${category?.name}`} 
      />
    </div>

    
  )
}