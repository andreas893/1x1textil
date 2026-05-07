import { useState } from "react"
import { useCategories } from "../context/CategoryContext"
import NavCategories from "./NavCategories"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export default function MobileMenu({ onClose }) {
  const { menuData } = useCategories()

  const [openSection, setOpenSection] = useState(null)
  const [openCategory, setOpenCategory] = useState(null)

const CATEGORY_LABELS = {
  "Keramik": "Se alt keramik",
  "Smykker": "Se alle smykker",
  "Papir & Prints": "Se alle prints",
  "Bolig & Interiør": "Se alt bolig & interiør",
  "Tekstil": "Se alt tekstil",
  "Accessories": "Se alle accessories",
  "Bøger & DIY": "Se alle Bøger & DIY"
}

  return (
    <div className="gap-2 bg-(--color-bg) p-4 m-2 h-full flex flex-col rounded-[5px]">

        <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
            {/* SHOP */}
            <div className="border-b py-2">

                <button
                onClick={(e) => {
                    e.stopPropagation()
                    setOpenSection(openSection === "shop" ? null : "shop")
                }
                }
                className="flex justify-between w-full body-lg"
                >
                Shop
                <span>{openSection === "shop" ? "–" : "+"}</span>
                </button>
                
                {/* LEVEL 2 */}
                {openSection === "shop" && (
                <div className="mt-2 px-2 space-y-2">
                    <Link to="/shop" className="body pt-2 flex items-center border-b font-semibold w-fit">Shop alt <ArrowRight strokeWidth={1.5} size={18} /></Link>

                    {menuData.map(section => (
                    <div key={section.slug}>

                        {/* LEVEL 2 BUTTON */}
                        <button
                        onClick={() =>
                            setOpenCategory(
                            openCategory === section.slug
                                ? null
                                : section.slug
                            )
                        }
                        className="flex gap-2 w-full text-left"
                        >
                        {section.name}
                        <span>
                            {openCategory === section.slug ? "–" : "+"}
                        </span>
                        </button>
                        

                        {/* LEVEL 3 */}
                    {openCategory === section.slug && (
                            <div className="ml-4 mt-2 border-l pl-4 space-y-1">

                                {/* ALT KATEGORI */}
                                <Link
                                to={`/Shop/${section.slug}`}
                                className="block body-sm flex my-2 items-center font-semibold border-b w-fit"
                                onClick={onClose}
                                >
                                {CATEGORY_LABELS[section.name]} <ArrowRight size={18} strokeWidth="1.5"/>
                                </Link>

                                {section.children.map(child => (
                                <Link
                                    key={child.id}
                                    to={`/shop/${child.slug}`}
                                    className="block body-sm py-2"
                                    onClick={onClose}
                                >
                                    {child.name}
                                </Link>
                                ))}

                            </div>
                            )}
                    </div>
                    ))}
                </div>
                )}
            </div>

            {/* ANDRE LINKS */}
            <div className="gap-2 flex flex-col body-lg">
                <Link className="border-b py-2" to="/artists">Kunsthåndværkere</Link>
                <Link className="border-b py-2" to="/inspiration">Inspiration</Link>
                <Link className="border-b py-2" to="/om-os">Om os</Link>
                <Link className="border-b py-2" to="/kontakt">Kontakt</Link>
            </div>

            {/* BILLEDER */}
            <NavCategories menuData={menuData} />

            {/* FOOTER LINKS */}
            <div className="grid grid-cols-2 gap-6 text-sm pb-4 pt-4 border-t">
                <div>
                <h4 className="body mb-2">Info</h4>
                <p>FAQ</p>
                <p>Handelsbetingelser</p>
                </div>

                <div>
                <h4 className="body mb-2">Sociale medier</h4>
                <p>Instagram</p>
                <p>TikTok</p>
                </div>
            </div>
        </div>

        <div className="border-t">
            {/* CLOSE */}
            <button
                onClick={onClose}
                className="w-full text-center mt-4 underline"
            >
                Luk
            </button>
        </div>
     
    </div>
  )
}