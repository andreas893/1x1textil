import { useCategories } from "../context/CategoryContext"
import { Link } from "react-router-dom"
import NavCategories from "./NavCategories"

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
    const { menuData, loading } = useCategories()

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
      
       <NavCategories menuData={menuData} />
      

    </div>
  )
}