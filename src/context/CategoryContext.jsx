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
      const cached = sessionStorage.getItem("categories")

      if (cached) {
        const parsed = JSON.parse(cached)
        setCategories(parsed)
        setMenuData(buildMenu(parsed))
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("categories")
        .select("id, name, slug, image")

      if (error) {
        console.error(error)
        setLoading(false)
        return
      }

      sessionStorage.setItem("categories", JSON.stringify(data))

      setCategories(data)
      setMenuData(buildMenu(data))
      setLoading(false)
    }

    fetchCategories()
  }, [])

  // useMemo SKAL LIGGE HER (inde i funktionen)
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