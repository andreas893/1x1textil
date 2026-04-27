import React from 'react'

function CatToggle() {
  return (
    <div>
        <h2 className='h2'>Gå på opdagelse</h2>

        <div className='cat-row'>
            <div className='cat-toggle'>
                <img src="" alt="" />
                <span><h3 className='h3'>Keramik</h3></span>
            </div>

            <div className='cat-toggle'>
                <img src="" alt="" />
                <span><h3 className='h3'>Bolig & Interiør</h3></span>
            </div>

            <div className='cat-toggle'>
                <img src="" alt="" />
                <span><h3 className='h3'>Smykker</h3></span>
            </div>
        </div>

        <div className='active-cat'>
            <div className='active-content'>
                <div className='cat-thumb'>
                    <img src="" alt="" />
                    <h3>
                        Keramik
                    </h3>

                    <p>Håndlavet keramik til hjemmet. Sanselige former og unikke detaljer</p>

                    <button className='btn'>Se alt keramik</button>
                </div>

                <div className='cat-img-grid'>
                    <div><img src="" alt="" /></div>

                    <div>
                        <img src="" alt="" />
                        <img src="" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CatToggle