import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { Heart } from 'lucide-react'
import { Search } from 'lucide-react'

function Navbar() {
  return (
    <nav>
         <div>
             <div className="max-w mx-auto flex justify-between items-center bg-(--color-bg) py-2 px-4 text-[var(--color-text)] body-sm">
                <Link to="/"><img className='w-[55px]' src="/images/1x1-logo1.png" alt="1x1textil logo" /></Link>

                <div className="flex gap-6 ">
                    <Link to="/shop">Shop +</Link>
                    <Link to="/artists">Kunsthåndværkere</Link>
                    <Link to="/inspiration">Inspiration</Link>
                    <Link to="/om-os">Om os</Link>
                    <Link to="/kontakt">Kontakt</Link>

                </div>

                <div className='flex gap-4'>
                
                
                    <button><Search strokeWidth={1.5}/></button>
                    <Link to="/cart"><ShoppingCart strokeWidth={1.5}/></Link>
                    <Link to="/favourites"><Heart strokeWidth={1.5}/></Link>
                    
                </div>
            </div>
         </div>
    </nav>
  )
}

export default Navbar