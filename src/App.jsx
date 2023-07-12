import './App.css';
import NavBar from './components/header/navigation';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import ProductDetail from './pages/product-detail/'
import { CartProvider } from './context/cart-context'
import Cart from './pages/cart'
function App() {
  return (
    <div>
      <CartProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </CartProvider>
    </div>
  )
}

export default App;
