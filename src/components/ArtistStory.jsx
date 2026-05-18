import React from "react"

export default function ArtistStory({ artist }) {
  if (!artist) return null

  const story1 = artist.story_1 || artist.bio
  const story2 = artist.story_2

  if (!story1 && !story2) return null

  return (
    <section className="pt-12 space-y-0">

      {/* ROW 1 */}
      {story1 && (
        <div className="grid p-4 md:p-0 md:grid-cols-2">

          {/* BILLEDE */}
          <div>
            <img
              src={artist.image}
              className="w-full aspect-4/3 rounded-t-[5px] md:rounded-none md:h-full object-cover"
            />
          </div>

          {/* TEKST */}
          <div className="bg-(--color-surface) rounded-b-[5px] md:rounded-none py-8 px-4 md:p-8 flex flex-col justify-center">
            <h2 className="h2 mb-4">
              Processen bag værkerne
            </h2>

            <p className="whitespace-pre-line body">
              {story1}
            </p>
          </div>

        </div>
      )}

      {/* ROW 2 */}
      {story2 && (
        <div className="grid p-4 md:p-0 md:grid-cols-2">

          {/* BILLEDE */}
          <div className="md:order-2">
            <img
              src={artist.image}
              className="w-full aspect-4/3 rounded-t-[5px] md:rounded-none md:h-full object-cover"
            />
          </div>

          {/* TEKST */}
          <div className="bg-(--color-surface) py-8 px-4 rounded-b-[5px] md:rounded-none md:p-8 flex flex-col justify-center md:order-1">
            <h2 className="h2 mb-4">
              Inspiration
            </h2>

            <p className="whitespace-pre-line body max-w-[500px]">
              {story2}
            </p>
          </div>

        </div>
      )}

    </section>
  )
}