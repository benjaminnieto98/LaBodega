import './styles.css'

const CartItem = ({ onAddToCart, onDecreaseItem, onRemoveItem, id, image, name, price, quantity, stock }) => {
    return (
        <div className='cartItem'>
            <div className='cartItemImageContainer'>
                <img className='cartItemImage' src={image} alt={name} />
            </div>
            <div className='cartItemContentContainer'>
                <p className='cartItemProductName'>{name}</p>
                <p className='cartItemQuantity'>quantity: {quantity}</p>
                <p className='cartItemStock'>{stock} left</p>
                <p className='cartItemPrice'>USD {price}</p>
            </div>
            <div className='cartItemActions'>
                <button onClick={() => onAddToCart(id)} className='cartItemButttonAdd'><i className="material-symbols-rounded">
                    add
                </i></button>
                <button onClick={() => onDecreaseItem(id)} className='cartItemButttonDecrease'><i className="material-symbols-rounded">
                    remove
                </i></button>
                <button onClick={() => onRemoveItem(id)} className='cartItemButttonRemove'><i className="material-symbols-rounded">
                    delete
                </i></button>
            </div>
        </div>
    )
}

export default CartItem