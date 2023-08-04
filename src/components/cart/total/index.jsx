import './styles.css'

const Total = ({ onHandlerCheckout, total, totalItemQuantity, isCart }) => {
    return (
        <div className='cartDetailActions'>
            <p className='cartItemQuantityTotal'>Total Items: {totalItemQuantity}</p>
            {isCart ? <button onClick={onHandlerCheckout} className='cartButttonCheckout'>Checkout</button> : null}
            <p className='cartTotal'>Total: USD {total}</p>
        </div>
    )
}

export default Total