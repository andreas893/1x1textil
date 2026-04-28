import React from 'react'

function CatToggle() {
  return (
    <div className='p-12 bg-(--color-bg)'>
        <h2 className='h2'>Gå på opdagelse</h2>

        <div className='cat-row flex gap-10 '>
            <div className='cat-toggle flex flex-col items-center gap-4'>
                <img className='w-[120px] h-[150px]' src="/images/keramik-toggle.jpeg" alt="" />
                <span><h3 className='h3'>Keramik</h3></span>
            </div>

            <div className='cat-toggle flex flex-col items-center gap-4'>
                <img className='w-[120px] h-[150px]' src="/images/bolig-cat.jpeg" alt="" />
                <span><h3 className='h3'>Bolig & Interiør</h3></span>
            </div>

            <div className='cat-toggle flex flex-col items-center gap-4'>
                <img className='object-cover w-[120px] h-[150px]' src="/images/smykker-cat.jpg" alt="" />
                <span><h3 className='h3'>Smykker</h3></span>
            </div>
        </div>

        <div className='active-cat bg-(--color-surface) rounded-[5px] p-7.5'>
            <div className='active-content grid grid-cols-2'>
                <div className='cat-thumb flex flex-col gap-2'>
                    <img className='rounded-[5px]' src="/images/keramik-toggle.jpeg" alt="" />
                    <h3 className='h3 font'>
                        Keramik
                    </h3>

                    <p>Håndlavet keramik til hjemmet. Sanselige former og unikke detaljer</p>

                    <button className='btn'>Se alt keramik</button>
                </div>

                <div className='cat-img-grid grid grid-cols-2'>
                    <div><img className='rounded-[5px]' src="/images/keramik-grid-1.jpeg" alt="" /></div>

                    <div>
                        <img className='rounded-[5px]' src="/images/keramik-grid-2.jpeg" alt="" />
                        <img className='rounded-[5px]' src="/images/keramik-grid-3.jpeg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CatToggle