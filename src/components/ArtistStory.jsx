import React from "react"

export default function ArtistStory({ artist }) {
  if (!artist) return null

  const story = artist.story || artist.bio

  if (!story) return null

  return (
    <section className="grid md:grid-cols-2 pt-12">

      {/* TEKST */}
      <div className="bg-(--color-surface) p-8 md:p-16 flex flex-col justify-center">
        <h2 className="h2 mb-4">
          Processen bag værkerne
        </h2>

        <p className="whitespace-pre-line body max-w-[500px]">
          {story}
        </p>
      </div>

      {/* BILLEDE (fallback hvis du ikke har story-image endnu) */}
      <div>
        <img
          src={artist.image}
          className="w-full h-[400px] md:h-full object-cover"
        />
      </div>

        {/* BILLEDE (fallback hvis du ikke har story-image endnu) */}
      <div>
        <img
          src={artist.image}
          className="w-full h-[400px] md:h-full object-cover"
        />
      </div>

      {/* TEKST */}
      <div className="bg-(--color-surface) p-8 md:p-16 flex flex-col justify-center">
        <h2 className="h2 mb-4">
          Processen bag værkerne
        </h2>

        <p className="whitespace-pre-line body max-w-[500px]">
          {story}
        </p>
      </div>

    </section>
  )
}