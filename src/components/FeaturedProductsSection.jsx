import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { mixProducts } from "../utils/mixProducts"
import supabase from "../lib/Supabase";
import ProductGrid from "./ProductGrid";

export default function FeaturedProductsSection() {
    const [categories, setCategories] = useState([])
    const [activeCategory, setActiveCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false)


    // fetch parent kategorier
    useEffect(() => {
  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .is("parent_id", null)
      .order("sort_order", { ascending: true })

    if (error) {
      console.error(error)
      return
    }

    setCategories(data)
    setActiveCategory(data?.[0] ?? null) // default = første, fx Keramik
  }

  fetchCategories()
}, [])


    //fetch produkter, via product_category context og brug activeCategory state til at filtrere produkterne der vises
    useEffect(() => {
  if (!activeCategory) return

  const fetchProducts = async () => {
    // HENT SUBCATEGORIES
    const { data: subcategories, error: subError } = await supabase
      .from("categories")
      .select("id")
      .eq("parent_id", activeCategory.id)

    if (subError) {
      console.error(subError)
      return
    }

    // LAV ARRAY AF IDS
    const categoryIds = [
      activeCategory.id,
      ...subcategories.map(c => c.id)
    ]

    const { data, error } = await supabase
      .from("product_categories")
      .select(`
        product:products (
        id,
        title,
        image,
        price,
        artist_id
        ),
        category:categories (
        name
        )
      `)
      .in("category_id", categoryIds)
      .limit(40)

    if (error) {
      console.error(error)
      return
    }

    const mappedProducts = data.map((row) => ({
      ...row.product,
      category: row.category?.name || ""
    }))
  

    const mixed = mixProducts({
    products: mappedProducts,
    limit: 6,
    })
    
    setProducts(mixed)
  }

    fetchProducts()
    }, [activeCategory])

  return (
    <div className="mt-12">
       <div className="flex items-center justify-between mb-6 px-4 md:px-12 lg:px-12">
            <h2 className="h2">Butikkens favoritter.</h2>

            <Link className="flex items-center">
            Se alle <ArrowRight size={18}/>
            </Link>
        </div>


        
        <div className="px-4 md:px-12 mb-4 lg:hidden">
             <button
                onClick={() => setIsFilterOpen(true)}
                className="body flex items-center gap-2"
            >
                Kategorier <SlidersHorizontal size={18}/>
            </button>
        </div>

        <div className="hidden body-sm lg:flex gap-4 px-12 items-center mb-4">
            {categories.map(cat => (
                <button
                key={cat.id}
                onClick={() => setActiveCategory(cat)}
                className={`transition cursor-pointer hover:opacity-100 ${
                    activeCategory?.id === cat.id
                    ? "font-semibold"
                    : "opacity-50"
                }`}
                >
                {cat.name}
                </button>
            ))}
        </div>









        {isFilterOpen && (
            <div className="fixed inset-0 bg-white z-50 p-6 flex flex-col">
                
                <div className="flex justify-between mb-6">
                <p className="font-medium">Kategorier</p>
                <button onClick={() => setIsFilterOpen(false)}>Luk</button>
                </div>

                <div className="flex flex-col gap-4">
                {categories.map(cat => (
                    <button
                    key={cat.id}
                    onClick={() => {
                        setActiveCategory(cat)
                        setIsFilterOpen(false)
                    }}
                    className={`text-left ${
                        activeCategory?.id === cat.id
                        ? "font-semibold"
                        : "opacity-60"
                    }`}
                    >
                    {cat.name}
                    </button>
                ))}
                </div>

            </div>
        )}



        <div>
             <ProductGrid
            key={activeCategory?.id}
            products={products}
            variant="featured"
            layout="horizontal"
            />
        </div>
       

    </div>    
    
  )
}
