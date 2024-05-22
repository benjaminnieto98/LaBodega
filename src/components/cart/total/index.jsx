import './styles.css'

const Total = ({ onHandlerCheckout, total, totalItemQuantity, isCart }) => {
    return (
        <div className='cartDetailActions'>
            <div className="totalContent">
                <p className='totalText'>Total sin envío: </p>
                <p className='totalValue'>${total}</p>
            </div>
            {isCart ? <button onClick={onHandlerCheckout} className='cartButttonCheckout'>Continuar</button> : null}
        </div>
    )
}

export default Total