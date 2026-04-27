import React from 'react'

function MissionSection() {
  return (
    <section className="relative w-full h-">

      {/*  Background image */}
      <img
        src="/images/bg-choice.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 p-12 mx-auto pt-20 text-white">

        {/* Text */}
        <div className="max-w mb-[20vh]">
          <p className="text-[34px] tracking-[-0.48px]">
           <span className="span text-[38px] inline-block mr-18">Et bevidst valg</span>
           Vi tror på, at det kan mærkes. At forskellen ligger i materialet, i hænderne bag og i tiden, der er brugt. Derfor samler vi ikke bare produkter, vi samler værker med karakter.
            Hos 1+1 Textil & Design er udgangspunktet det håndlavede. Vi går tæt på kunstnerne, processerne og det sanselige i hvert objekt. Ikke for at vise mere, men for at vise det rigtige.
            For os handler det ikke om at have mest.Men om at vælge med omhu, så hvert produkt føles som noget særligt.
          </p>
        </div>

        {/* Floating image */}
        <div className="mt-16 flex justify-center">
          <img
            src="/images/choice-small.jpeg"
            className="w-[400px] h-[500px] object-cover rounded-lg shadow-xl"
          />
        </div>

      </div>
    </section>
  )
}

export default MissionSection