import { useState, useRef, useEffect } from "react"
import MegaMenu from "./MegaMenu"
import MobileMenu from "./MobileNav"
import { Link } from "react-router-dom"
import { ShoppingCart, Heart, Search, Menu, X } from "lucide-react"


export default function Navbar() {
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false)
  const closeTimer = useRef(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef(null)
  const [navHeight, setNavHeight] = useState(0)

  function handleEnter() {
    clearTimeout(closeTimer.current)
    setDesktopMenuOpen(true)
  }

  function handleLeave() {
    // Lille delay så musen kan bevæge sig fra link → menu uden at den lukker
    closeTimer.current = setTimeout(() => setDesktopMenuOpen(false), 100)
  }

  useEffect(() => {
  if (navRef.current) {
    setNavHeight(navRef.current.offsetHeight)
  }
}, [])

  useEffect(() => {
  if (mobileMenuOpen) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = ""
  }

  return () => {
    document.body.style.overflow = ""
  }
}, [mobileMenuOpen])
  

  return (
    <nav ref={navRef} className="relative z-50 text-(--color-text)">

      {/* TOP BAR */}
      <div className="flex justify-between items-center bg-(--color-bg) py-6 md:py-2 px-6 text-(--color-text)">

        <button
          className="relative w-6 h-6 md:hidden z-[60]"
          onClick={() => setMobileMenuOpen(prev => !prev)}
        >
          <Menu
            className={`
              absolute inset-0 transition-all duration-300
              ${mobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}
            `}
          />

          <X
            className={`
              absolute inset-0 transition-all duration-300
              ${mobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}
            `}
          />
        </button>

        {/* LOGO */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:left-auto ">
          <img className="w-[55px]" src="/images/1x1-logo1.png" alt="Logo" />
        </Link>

        {/* LINKS */}
        <div className=" hidden md:flex gap-8 items-center">

          {/* SHOP MED MEGAMENU */}
          <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <span className="cursor-pointer select-none">
              Shop +
            </span>

            {/* DESKTOP */}
            <div className="hidden md:block">
              {desktopMenuOpen && <MegaMenu />}
            </div>
          </div>

          <Link to="/artists">Kunsthåndværkere</Link>
          <Link to="/inspiration">Inspiration</Link>
          <Link to="/om-os">Om os</Link>
          <Link to="/kontakt">Kontakt</Link>

        </div>

        {/* ICONS */}
        <div className="flex gap-4 items-center ">
          <Search strokeWidth={1.5} className="cursor-pointer" />
          <Link to="/cart"><ShoppingCart strokeWidth={1.5} /></Link>
          <Link to="/favourites"><Heart strokeWidth={1.5} /></Link>
        </div>

      </div>

    {mobileMenuOpen && (
  <div className="fixed inset-0 z-40 flex flex-col">

    {/*  MØRK BAGGRUND (starter under navbar) */}
    <div
      className="absolute left-0 right-0 bottom-0 bg-black/40"
        style={{ top: navHeight }}
      onClick={() => setMobileMenuOpen(false)}
    />

    {/* MENU */}
    <div
      className="absolute left-0 right-0 bottom-0 w-full flex flex-col"
       style={{ top: navHeight }}
      onClick={(e) => e.stopPropagation()}
    >
      <MobileMenu onClose={() => setMobileMenuOpen(false)} />
    </div>

  </div>
)}


      

    </nav>
  )
}