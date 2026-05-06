import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
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

export default function MegaMenu() {
  const [menuData, setMenuData] = useState([])
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    fetchMenu()
  }, [])

  async function fetchMenu() {
  const { data: categories } = await supabase
    .from("categories")
    .select("*")

  const merged = MENU_STRUCTURE.map(section => ({
    ...section,
    children: section.children
      .map(name => categories.find(c => c.name === name))
      .filter(Boolean)
  }))

  setMenuData(merged)

  //  vælg 4 underkategorier
  const allChildren = merged.flatMap(s => s.children)

  const shuffled = [...allChildren].sort(() => 0.5 - Math.random())

  setFeatured(shuffled.slice(0, 4))
}

  return (
    <div className="grid grid-cols-[3fr_1fr] gap-12 items-start h-[60vh]">

      {/* VENSTRE: KATEGORIER */}
      <div className="flex gap-12">
        {menuData.map(section => (
          <div>

            {/* Sektion-header — link til samlingssiden */}
            <Link
              to={`/shop/${section.slug}`}
              className="block font-medium text-(--color-text) body mb-3 hover:opacity-70 transition-opacity"
            >
              {section.name}
            </Link>

            {/* Underkategorier */}
            <div className="flex flex-col gap-2">
              {section.children.map(child => (
                <Link
                  key={child.id}
                  to={`/shop/${child.slug}`}
                  className="body-sm text-(--color-text) opacity-80 hover:text-gray-900 transition-colors"
                >
                  {child.name}
                </Link>
              ))}

              {/* "Se alle X" link */}
              <Link
                to={`/shop/${section.slug}`}
                className="text-sm text-gray-400 hover:text-(--color-text) transition-colors mt-1"
              >
                Se alle {section.name.toLowerCase()} →
              </Link>
            </div>

          </div>
        ))}
      </div>

      {/* HØJRE: 4 BILLEDER for aktiv sektion */}
      <div className="grid grid-cols-2 gap-2">
        {featured.map(cat => (
          
          <Link
            key={cat.id}
            to={`/shop/${cat.slug}`}
            className="group relative overflow-hidden rounded-[5px] aspect-square bg-gray-100"
          >
            {cat.image && (
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full block object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
            )}
            <span className="absolute bottom-0 left-0 right-0 p-2 body-sm text-white bg-gradient-to-t from-black/50">
        {cat.name}
      </span>
          </Link>
        ))}
      </div>

    </div>
  )
}