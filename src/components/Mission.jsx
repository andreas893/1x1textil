import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import Accordion from "./Accordion"

export default function Mission() {
  return (
    <div className='mt-4 bg-(--color-bg)'>

        <div className='p-4 md:p-12'>
            <div>
                <h2 className="h2 mt-2 w-[50%] md:w-[30%]">Vi tror på, at det kan mærkes</h2>
            </div>

            <div className="mt-6 flex justify-center">
            <img className="h-[45vh] w-full rounded-[5px] md:min-h-[65vh] lg:max-h-[70vh]" src="/images/choice-small.jpeg" alt="Hænder på væv" />
            </div>

            <div className="mt-4 lg:grid grid-cols-2 gap-x-4">
                <div>
                    <h3 className="h3 mb-4">Et bevidst valg</h3>
                    <p className="body-sm mb-6 w-[80%] md:w-[60%] lg:w-full lg:mb-4">Hos 1+1 Textil & Design er tekstildesigner "Helene Vonsild" omdrejningspunktet. Butikken er formet af hendes blik for kvalitet, materialer og håndværk. Hvert værk er udvalgt med en tydelig intention – med fokus på det ærlige, det sanselige og det veludførte.</p>
                </div>
                
                
                <Accordion />

                <Link className="flex items-center border-b w-fit body semi-bold mt-6 lg:m-0">Lær os at kende <ArrowRight size={18}/></Link>
            </div>
        </div>
    </div>
  )
}

