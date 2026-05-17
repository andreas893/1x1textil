import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export default function AboutSection() {
  return (
    <section className="bg-(--color-bg) text-(--color-text)">

      {/* HERO IMAGE */}
      <div className="w-full">
        <img
          src="/images/om-bg.jpeg" // skift til din texture
          alt="Materiale og tekstur"
          className="w-full h-[30vh] md:h-[450px] object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="px-4 md:px-12 py-8 md:py-16">

        {/* TITLE */}
        <h2 className="h2 mb-8 w-[70%] md:w-[40%]">
          <span className="h1">1+1</span> Mere end bare kunsthåndværk
        </h2>

        {/* IMAGE */}
        <div className="mb-6 overflow-hidden rounded-[5px] h-[50vh] md:h-[70vh]">
          <img
            src="/images/1x1-butik.jpeg"
            alt="Butik facade"
            className="w-full h-full object-cover object-[center_50%]"
          />
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:gap-14">
             {/* SECTION 1 */}
            <div className="mb-8 w-[90%]">
            <h3 className="h3 mb-2">
                Om butikken
            </h3>

            <p className="body leading-relaxed">
                Hos 1+1 Textil & Design finder du et nøje udvalgt univers af
                kunsthåndværk og design. Hvert produkt er håndplukket med
                fokus på materialer, form og den sanselige oplevelse, som kun
                håndlavede objekter kan give.
            </p>
            </div>

            {/* SECTION 2 */}
            <div className="mb-10 w-[90%]">
            <h3 className="h3 mb-2">
                Relationer og fortælling
            </h3>

            <p className="body leading-relaxed">
                Butikken bygger på en tæt relation til kunstnerne bag
                værkerne. Vi udvælger med hænderne, ikke kun med øjnene – og
                lægger vægt på kvalitet, personlighed og fortælling i hvert
                enkelt produkt.
                <br /><br />
                Her handler det ikke kun om at købe, men om at opdage, mærke
                og finde noget, der føles rigtigt for dig.
            </p>
            </div>
        </div>
    

        {/* CTA */}
        <div className="md:flex justify-center">
             <Link
            to="/om-os"
            className="px-6 w-fit gap-1 py-3 body-lg rounded-[10px] flex justify-center items-center  bg-surface text-(--color-text) hover:opacity-90 transition"
            >
            Lær mere om butikken <ArrowRight size={18}/>
            </Link>
        </div>
       

      </div>

    </section>
  )
}