import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Shop from './pages/Shop'
import Artist from './pages/Artist'
import Product from './pages/ProductPage'
import CategoryPage from './pages/CategoryPage'

import './index.css'
import ProductPage from './pages/ProductPage'


export default function App() {
  

  return (
    <>
      <Navbar />
     

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:slug" element={<CategoryPage />} />
        <Route path="/artist/:slug" element={<Artist />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </>
  )
}

