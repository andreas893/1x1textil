import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Shop from './pages/Shop'
import Artist from './pages/Artist'
import Product from './pages/Product'

import './index.css'


export default function App() {
  

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/artist/:slug" element={<Artist />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </div>
  )
}

