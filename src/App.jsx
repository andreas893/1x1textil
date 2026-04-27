import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Shop from './pages/Shop'
import Artist from './pages/Artist'
import Product from './pages/Product'

import './index.css'


export default function App() {
  

  return (
    <>
      <Navbar />
     

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/artist/:slug" element={<Artist />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </>
  )
}

