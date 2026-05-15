import { useState } from "react"

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState([null])

  const items = [
    {
      title: "Tæt på",
      content: "Vi arbejder tæt på både kunstnerne, processerne og materialerne. Hvert værk bærer spor af hænderne bag – og af tiden, der er lagt i det. Det er det sanselige og det menneskelige, vi ønsker at bringe frem."
    },
    {
      title: "Kurateret udvalg",
      content: "Udvalget i butikken er personligt sammensat af Helene Vonsild. Hver kunstner og hvert værk er valgt med fokus på kvalitet, form og materialitet. Det er ikke et bredt sortiment, men et bevidst og gennemarbejdet udvalg."
    },
    {
      title: "Særligt bånd mellem kunstner og butik",
      content: "Mange af kunstnerne har Helene en personlig relation til – blandt andet fra Designskolen i Kolding. Det skaber en tæt forbindelse mellem butik og kunstner, hvor samarbejde og dialog er en naturlig del af processen. Det er relationer, der kan mærkes i det, der bliver vist."
    }
  ]

  const toggle = (index) => {
    setActiveIndex(prev => (prev === index ? null : index))
  }

  return (
    <div className="flex flex-col">

      {items.map((item, index) => {
        const isOpen = activeIndex === index

        return (
          <div key={index} className="py-2 border-b border-b-(--color-text)">

            {/* HEADER */}
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center text-left"
            >
              <span className="body">{item.title}</span>

              {/* ICON */}
              <span className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                +
              </span>
            </button>

            {/* CONTENT */}
            <div
              className={`
                overflow-hidden transition-all duration-300
                ${isOpen ? "max-h-40 mt-2 opacity-100" : "max-h-0 opacity-0"}
              `}
            >
              <p className="text-sm opacity-70">
                {item.content}
              </p>
            </div>

          </div>
        )
      })}

    </div>
  )
}