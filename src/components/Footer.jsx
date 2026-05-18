import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-(--color-bg) text-(--color-text) px-6 py-12 md:px-12">

      {/* MAIN GRID */}
      <section className="grid gap-12 md:grid-cols-[1fr_1fr_1fr_1.5fr]">

        {/* COL 1 */}
        <div className="gap-2 flex flex-col">
          <h3 className="h3 font-semibold">1+1 Textil</h3>
          <Link to="/shop" className="body">Shop</Link>
          <Link to="/artists" className="body">Kunsthåndværkere</Link>
          <Link to="/inspiration" className="body">Inspiration</Link>
          <Link to="/om-os" className="body">Om os</Link>
          <Link to="/kontakt" className="body">Kontakt</Link>
        </div>

        {/* COL 2 */}
        <div className="flex flex-col gap-2">
          <h3 className="h3 font-semibold">Butikken</h3>
          <div className="flex flex-col gap-1">
            <p className="body">Lokation</p>
            <p>Grønnegade 41 - 8000 Århus C</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="body">Åbningstider</p>
            <p>Man. – Ons. – kl.11 – 17.30</p>
            <p> Lør. – kl. 11.00 – 14.00</p>
            </div>
          <div className="flex flex-col gap-1">
            <p className="body">Kontakt</p>
            <p>Tlf.: 70 20 10 42</p>
            <p>E-mail: 1x1@1x1textil.dk</p>
          </div>
        </div>

        {/* COL 3 */}
        <div className="flex flex-col gap-2">
          <h3 className="h3 font-semibold">Info</h3>
          <Link className="body">FAQ</Link>
          <Link className="body">Handelsbetingelser</Link>
          <Link className="body">Privatlivspolitik</Link>
        </div>

        {/* COL 4 — NEWSLETTER */}
        <div className="space-y-6">

          <div className="space-y-3">
            <h2 className="h2">
              Hold øje med nyhedsbrevet
            </h2>

            <p className="body opacity-70">
              Nyheder fra butikken, nye kunstnere og udvalgte produkter.
            </p>
          </div>

          <div className="border-b pb-2 flex justify-between items-center">
            <input
              type="email"
              placeholder="Email adresse"
              className="bg-transparent outline-none w-full"
            />
            <span><ArrowRight size={18}/></span>
          </div>

        </div>

      </section>

      {/* IMAGE GRID */}
     <section className="mt-6 md:mt-12 w-full h-full">

      <div className="grid grid-cols-4 gap-3">

        <div>
          <img src="/images/insta-1.jpeg" className="w-full h-full object-cover rounded-[5px]" />
          <p className="body-sm mt-1">@1x1textilogdesign</p>
        </div>

        <img src="/images/insta-2.jpeg" className="w-full h-full object-cover rounded-[5px]" />
        <img src="/images/insta-3.jpeg" className="w-full h-full object-cover rounded-[5px]" />
        <img src="/images/insta-4.jpeg" className="w-full h-full object-cover rounded-[5px]" />

      </div>

    </section>

      {/* SOCIAL */}
      <div className="flex gap-8 mt-12 body-sm">
        <Link className="cursor-pointer" to="https://www.facebook.com/1x1textilogdesign">Facebook</Link>
        <Link className="cursor-pointer" to="https://www.instagram.com/1x1textilogdesign/">Instagram</Link>
        <p>TikTok</p>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t mt-4 pt-2 flex flex-wrap gap-6 text-sm">
        <p>© 1+1 Textil 2026</p>
        <p>Terms</p>
        <p>Privacy</p>
        <p>Cookies</p>
      </div>

    </footer>
  )
}