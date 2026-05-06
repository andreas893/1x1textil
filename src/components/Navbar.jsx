import { useState, useRef } from "react"
import MegaMenu from "./MegaMenu"
import { Link } from "react-router-dom"
import { ShoppingCart, Heart, Search } from "lucide-react"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeTimer = useRef(null)

  function handleEnter() {
    clearTimeout(closeTimer.current)
    setMenuOpen(true)
  }

  function handleLeave() {
    // Lille delay så musen kan bevæge sig fra link → menu uden at den lukker
    closeTimer.current = setTimeout(() => setMenuOpen(false), 80)
  }

  return (
    <nav className="relative z-50">

      {/* TOP BAR */}
      <div className="flex justify-between items-center bg-(--color-bg) py-2 px-6 text-(--color-text)">

        {/* LOGO */}
        <Link to="/">
          <img className="w-[55px]" src="/images/1x1-logo1.png" alt="Logo" />
        </Link>

        {/* LINKS */}
        <div className="flex gap-8 items-center">

          {/* SHOP MED MEGAMENU */}
          <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <span className="cursor-pointer select-none">
              Shop +
            </span>
          </div>

          <Link to="/artists">Kunsthåndværkere</Link>
          <Link to="/inspiration">Inspiration</Link>
          <Link to="/om-os">Om os</Link>
          <Link to="/kontakt">Kontakt</Link>

        </div>

        {/* ICONS */}
        <div className="flex gap-4 items-center">
          <Search strokeWidth={1.5} className="cursor-pointer" />
          <Link to="/cart"><ShoppingCart strokeWidth={1.5} /></Link>
          <Link to="/favourites"><Heart strokeWidth={1.5} /></Link>
        </div>

      </div>

      {/* MEGAMENU – sidder udenfor Shop-div så hele bredden virker */}
      {menuOpen && (
        <div
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          className="absolute top-full left-0 right-0 bg-white border-t border-b border-gray-100 shadow-sm z-50 px-10 py-8"
        >
          <MegaMenu />
        </div>
      )}

    </nav>
  )
}