import './App.css'
import Header from './components/header/navigation'
import { CartProvider } from './context/cart-context'
import Router from './navigation'
function App() {
  return (
    <div>
      <CartProvider>
        <Header />
        <Router />
      </CartProvider>
    </div>
  )
}

export default App;
