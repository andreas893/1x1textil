import { useNavigate } from "react-router-dom"


export default function ArtistCard({ artist }) {
    const navigate = useNavigate()
    if (!artist) return null

  const previewProducts = artist.products?.slice(0, 3) || []

  return (
      <div className="group bg-(--color-surface) rounded-[10px] relative overflow-hidden cursor-pointer"
       onClick={() => navigate(`/artist/${artist.slug}`)}>

        {/*  MAIN IMAGE */}
        <div className="relative overflow-hidden aspect-[3/4]">
          <img
            src={artist.image}
            loading="lazy"
            className="w-full aspect-[3/4] object-cover transition-transform duration-500"
          />

          {/*  OVERLAY TEXT */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-90 group-hover:opacity-100 transition">
            
            <div className="absolute bottom-4 left-4 text-white">
            <h3 className="h3  ">
              {artist.name}
            </h3>

            <p className="text-sm opacity-80">
              {artist.title}
            </p>
            </div>
        
          </div>
        </div>

        {/*  PRODUCT PREVIEW */}
        {previewProducts.length > 0 && (
          <div className="grid grid-cols-3 gap-[4px] p-1 border-b text-(--color-text)">
            {previewProducts.map(p => (
              <img
                key={p.id}
                src={p.image}
                loading="lazy"
                className="w-full aspect-square rounded-[5px] object-cover"
              />
            ))}
          </div>
        )}

        {/*  CTA */}
        <div className="flex justify-between items-center px-4 py-3">

            <span className="body-sm opacity-70">{artist.productCount === 1 ? "1 Værk" : `${artist.productCount} Værker`}</span>
          
          <span className="body-sm bg-(--color-text) text-white p-2 rounded-[10px] transition-transform duration-500 group-hover:opacity-80 md:p-2 ">
            Se værker →
          </span>

        </div>

      </div>
 
  )
}