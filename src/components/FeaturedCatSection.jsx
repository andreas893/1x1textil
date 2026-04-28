import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import FeaturedCat from './FeaturedCat'

function FeaturedCatSection() {
  return (
    <section className='featured-cat mt-14 mb-14 flex flex-col overflow-hidden'>

      {/* Header */}
      <div className='flex justify-between items-center p-12'>
        <h2 className='h2'>Udforsk vores universer</h2>

        <div className='flex items-center gap-8'>
          <Link to='/kategorier' className='underline body'>
            Se alle kategorier
          </Link>

          <div className='flex gap-2'>
            <button
              aria-label='Forrige kategori'
              className='
                w-10 h-10 rounded-full border border-[var(--color-border)]
                flex items-center justify-center
                hover:bg-[var(--color-bg-subtle)] transition-colors
              '
            >
              <ArrowLeft size={16} />
            </button>
            <button
              aria-label='Næste kategori'
              className='
                w-10 h-10 rounded-full border border-[var(--color-border)]
                flex items-center justify-center
                hover:bg-[var(--color-bg-subtle)] transition-colors
              '
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Slider – peek på siderne afspejler at der er mere */}
      <div className='relative flex items-center'>

        {/* Venstre peek */}
        <div className='
          absolute left-0 w-[6%] h-[620px] z-10
          flex items-center justify-end pr-2
          pointer-events-none
        '>
          <div className='w-full h-[75%] rounded-[5px] bg-(--color-text) opacity-60' />
        </div>

        {/* Kort */}
        <FeaturedCat />

        {/* Højre peek */}
        <div className='
          absolute right-0 w-[6%] h-[620px] z-10
          flex items-center justify-start pl-2
          pointer-events-none
        '>
          <div className='w-full h-[75%] rounded-[5px] bg-(--color-text) opacity-60' />
        </div>

      </div>

      {/* Progress-streger */}
      <div className='flex gap-3 mt-8 px-[7.5%]'>
        <div className='h-[2px] w-16 bg-[var(--color-text-primary)] rounded-full' />
        <div className='h-[2px] w-16 bg-[var(--color-border)] rounded-full' />
        <div className='h-[2px] w-16 bg-[var(--color-border)] rounded-full' />
      </div>

    </section>
  )
}

export default FeaturedCatSection