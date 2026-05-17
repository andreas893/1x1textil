export default function Footer() {
  return (
    <footer className="bg-(--color-bg) text-(--color-text) px-6 py-12 md:px-12 space-y-12">

      {/* NEWSLETTER */}
      <section className="text-center max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          <h2 className="h2">
            Hold dig opdateret
          </h2>
          <p className="body leading-relaxed max-w-xl mx-auto">
            Få nyt om kunsthåndværkere, nyheder i butikken og et udvalg fra webshoppen
          </p>
        </div>

        <div className="space-y-3 md:space-y-0 md:flex md:flex-wrap md:justify-center md:gap-4">
           <input
            type="text"
            placeholder="Fornavn"
            className="w-full md:w-[200px] border border-(--color-text) rounded-[8px] px-4 py-3 bg-transparent"
          />

          <input
            type="text"
            placeholder="Efternavn"
            className="w-full md:w-[200px] border border-(--color-text) rounded-[8px] px-4 py-3 bg-transparent"
          />

          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Email adresse"
              className="flex-1 md:w-[260px] border border-(--color-text) rounded-[8px] px-4 py-3 bg-transparent"
            />

            <button className="bg-(--color-text) text-white px-6 rounded-[10px]">
              Tilmeld
            </button>
          </div>
        </div>
      </section>

        <div className="border-t border-[#5A2E0C]/40" />
      
    <section className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_2fr] gap-10 items-start">
    
            {/* LOCATION */}
      <div className="space-y-4 text-sm leading-relaxed">
        <h3 className="h3 font-semibold">Lokation</h3>

        <div className="body leading-relaxed">
          <p>1+1 Textil og Design</p>
          <p>Grønnegade 41</p>
          <p>8000 Århus C</p>
          <p>Tlf.: 70 20 10 42</p>
          <p>Mail: 1x1@1x1textil.dk</p>
        </div>

        <div className="body leading-relaxed">
          <p className="mt-4">Åbningstider 2026</p>
          <p>Man. – Ons. – kl. 11 – 17.30</p>
          <p>Lør. – kl. 11.00 – 14.00</p>
        </div>

        <div className="mt-4 body leading-relaxed">
          <p>Se flere særlige og helligdags åbningstider her:</p>
          <a href="#" className="underline">
            Særlige åbningstider
          </a>
        </div>
      </div>

      {/* SITE INDEX */}
      <div className="space-y-4 text-sm">
        <h3 className="h3 font-semibold">Site Index</h3>
        <div className="space-y-2 body">
          <p>Shop</p>
          <p>Kunsthåndværkere</p>
          <p>Inspiration</p>
          <p>Om os</p>
          <p>Kontakt</p>
        </div>

        {/* Social medier */}
          <div className="space-y-3 body">
          <h3 className="h3 font-semibold">Sociale medier</h3>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>TikTok</p>
        </div>
      </div>

        {/* info */}
        <div className="space-y-3 body">
          <h3 className="h3 font-semibold">Info</h3>
          <p>FAQ</p>
          <p>Handelsbetingelser</p>
          <p>Privatlivspolitik</p>
        </div>

         {/* IMAGE */}
        <div className="hidden md:block">
          <img
            src="/images/inspiration-butik.jpg"
            className="w-full aspect-square object-cover rounded-[5px]"
          />
        </div>

    </section>

      

    </footer>
  )
}