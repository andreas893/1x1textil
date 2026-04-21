import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
         <div>
             <div className="max-w-6xl mx-auto px-4 flex justify-between">
                <Link to="/">1+1</Link>

                <div className="flex gap-6">
                    <Link to="/shop">Shop</Link>
                    <Link to="/artists">Kunstnere</Link>
                    <Link to="/inspiration">Inspiration</Link>
                </div>
            </div>
         </div>
    </nav>
  )
}

export default Navbar