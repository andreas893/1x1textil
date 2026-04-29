import React from 'react'
import { Link } from 'react-router-dom'

function FeaturedCat() {
  return (
    <div className='grid grid-cols-2 gap-8 mt-16 w-[70%] mx-auto h-[620px]'>

      {/* Venstre – stort billede */}
      <div className='min-h-0 overflow-hidden'>
        <img
          className='w-full h-full object-cover rounded-[8px]'
          src='/images/keramik-feat-1.jpeg'
          alt='Keramikkopper – Keis & Fiedler'
        />
      </div>

      {/* Højre – tekst + lille billede */}
      <div className='flex flex-col min-h-0'>

        <div className='flex flex-col flex-shrink-0'>
          <h2 className='h2 mb-1'>Keramik</h2>
          <span className='body-sm italic text-[var(--color-muted)]'>
            Håndlavet keramik til hjemmet
          </span>
          <p className='body mt-3 max-w-sm leading-relaxed'>
            Sanselige former og håndlavede detaljer.
            Udforsk kopper, skåle og unikke værker.
          </p>
          <Link to='/kategorier/keramik' className='btn mt-5 w-fit'>
            Se alt keramik →
          </Link>
        </div>

        {/* Lille billede fylder resten af højden */}
        <div className='flex-1 min-h-0 mt-5 overflow-hidden'>
          <img
            className='w-full h-full object-cover rounded-[8px]'
            src='/images/keramik-featured-2.jpeg'
            alt='Håndlavet keramikkop'
          />
        </div>

      </div>
    </div>
  )
}

export default FeaturedCat