import { Route, Routes, Navigate } from "react-router-dom"
import Home from "../pages/home"
import ProductDetail from "../pages/product-detail"
import Cart from "../pages/cart"
import Checkout from "../pages/checkout"
import SuccessOrder from "../pages/success-order"
import Login from "../pages/login"
import Admin from "../pages/admin"
import Orders from "../pages/orders"
import { AuthContext } from "../context/auth-context"
import { useContext } from "react"

function Router() {

    const { currentUser } = useContext(AuthContext)

    const RequiereAuth = ({ children }) => {
        if (currentUser && currentUser.email === "labodega@admin.com") {
            return children;
        } else {
            return <Navigate to="/login" />;
        }
    }

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin' element={<RequiereAuth><Admin /></RequiereAuth>} />
            <Route path='/orders' element={<RequiereAuth><Orders /></RequiereAuth>} />
            <Route path="/login" element={<Login />} />
            <Route path='/products/:productId' element={<ProductDetail />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/success-order' element={<SuccessOrder />} />
        </Routes>
    )
}

export default Router;
