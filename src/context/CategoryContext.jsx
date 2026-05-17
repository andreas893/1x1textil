import { createContext, useContext, useEffect, useState, useMemo } from "react"
import supabase from "../lib/Supabase"

const MENU_STRUCTURE = [
  {
    name: "Keramik",
    slug: "keramik",
    children: ["Kopper", "Tallerkener", "Skåle", "Fade", "Vaser", "Kander", "Urtepotter", "Lågkrukker"]
  },
  {
    name: "Smykker",
    slug: "smykker",
    children: ["Øreringe", "Halskæder", "Armbånd"]
  },
  {
    name: "Bolig & Interiør",
    slug: "bolig-interior",
    children: ["Glas", "Opbevaring", "Lysestager", "Flag", "Figurer", "Ophæng"]
  },
  {
    name: "Accessories",
    slug: "accessories",
    children: ["Tasker", "Tørklæder"]
  },
  {
    name: "Tekstil",
    slug: "tekstil",
    children: ["Boligtekstil"]
  },
  {
    name: "Bøger & DIY",
    slug: "boeger-diy",
    children: ["Bøger", "Magasiner", "DIY"]
  },
  {
    name: "Papir & Prints",
    slug: "papir-prints",
    children: ["Kort", "Prints"]
  },
  
]

const CategoryContext = createContext(null)

export function CategoryProvider({ children }) {
  const [menuData, setMenuData] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  function buildMenu(data) {
    const categoryMap = Object.fromEntries(
      data.map(c => [c.name, c])
    )

    return MENU_STRUCTURE.map(section => ({
      ...section,
      children: section.children
        .map(name => categoryMap[name])
        .filter(Boolean)
    }))
  }

  useEffect(() => {
   async function fetchCategories() {
  const CACHE_KEY = "categories_v1"  // bump når du ændrer schema
  const MAX_AGE = 1000 * 60 * 30     // 30 minutter

  const cached = sessionStorage.getItem(CACHE_KEY)

  if (cached) {
    const { data, timestamp } = JSON.parse(cached)
    const isExpired = Date.now() - timestamp > MAX_AGE

    if (!isExpired) {
      setCategories(data)
      setMenuData(buildMenu(data))
      setLoading(false)
      return
    }
    // Udløbet — fall through til fetch
  }

  const { data, error } = await supabase
    .from("categories")
    .select("*")

  if (error) {
    console.error(error)
    setLoading(false)
    return
  }

  sessionStorage.setItem(CACHE_KEY, JSON.stringify({
    data,
    timestamp: Date.now()
  }))

  setCategories(data)
  setMenuData(buildMenu(data))
  setLoading(false)
}

    fetchCategories()
  }, [])

  // useMemo
  const value = useMemo(() => ({
    menuData,
    categories,
    loading
  }), [menuData, categories, loading])

  //  return SKAL OGSÅ LIGGE HER
  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  )
}

// Hook til nem brug i komponenter
export function useCategories() {
  return useContext(CategoryContext)
}