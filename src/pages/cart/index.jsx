import { useContext } from 'react'
import './styles.css'
import { CartContext } from '../../context/cart-context'
import { useNavigate } from 'react-router-dom';
import { firebaseServices } from '../../services/firebase';
import CartItem from '../../components/cart/item';
import Total from '../../components/cart/total';

function Cart() {
    const navigate = useNavigate();
    const {cart, onAddToCart, onRemoveItem, onDecreaseItem, total, getTotalItemQuantity } = useContext(CartContext);

    const onHandlerCreateCart = async () => {
        const newCart = {
            items: cart,
            createdAt: new Date(),
            total: total,
            status: 'pending',
        }

        const cartId = await firebaseServices.createCart(newCart)

        return cartId
    }
    const onHandlerCheckout = async () => {
        const cartId = await onHandlerCreateCart()
        navigate('/checkout', { state: { cartId: cartId.id } })
    }

    return (
        <div>
            <div className='cartContainer'>
                <h1 className='title'>Carrito🛒</h1>
                {cart.length === 0 && <h2>No hay productos en tu carrito...</h2>}
                {
                    cart?.length > 0 && cart.map((product) => (
                        <CartItem key={product.id} {...product} onAddToCart={onAddToCart} onDecreaseItem={onDecreaseItem} onRemoveItem={onRemoveItem} />
                    ))
                }
                {
                    cart?.length > 0 && (
                        <Total isCart={true} onHandlerCheckout={onHandlerCheckout} total={total} totalItemQuantity={getTotalItemQuantity()} />
                    )
                }
            </div>
        </div>
    )
}

export default Cart
