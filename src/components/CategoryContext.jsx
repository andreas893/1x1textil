import { createContext, useContext, useEffect, useState } from "react"
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
    children: ["Taser", "Tørklæder"]
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

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from("categories")
        .select("*")

      if (error) {
        console.error(error)
        setLoading(false)
        return
      }

      setCategories(data)

      const merged = MENU_STRUCTURE.map(section => ({
        ...section,
        children: section.children
          .map(name => data.find(c => c.name === name))
          .filter(Boolean)
      }))

      setMenuData(merged)
      setLoading(false)
    }

    fetchCategories()
  }, []) // kører kun én gang

  return (
    <CategoryContext.Provider value={{ menuData, categories, loading }}>
      {children}
    </CategoryContext.Provider>
  )
}

// Hook til nem brug i komponenter
export function useCategories() {
  return useContext(CategoryContext)
}