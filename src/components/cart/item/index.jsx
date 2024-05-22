import './styles.css'

const CartItem = ({ onAddToCart, onDecreaseItem, onRemoveItem, id, image, name, price, quantity, stock, measure }) => {
    return (
        <div className='cartItem'>
            <div className='cartItemImageContainer'>
                <img className='cartItemImage' src={image} alt={name} />
            </div>
            <div className='cartItemContentContainer'>
                <div className="content">
                <p className='cartItemProductName'>{name} x {quantity}</p>
                <p className='cartItemMeasure'>{measure}ml</p>
                </div>
                <p className='cartItemPrice'>${price}</p>
            </div>
            <div className='cartItemActions'>
                <button onClick={() => onAddToCart(id)} className='cartItemButttonAdd'><i className="material-symbols-rounded">
                    add
                </i></button>
                <button onClick={() => onDecreaseItem(id)} className='cartItemButttonDecrease'><i className="material-symbols-rounded">
                    remove
                </i></button>
            </div>
            <div className="dlt">
                <button onClick={() => onRemoveItem(id)} className='cartItemButttonRemove'><i className="material-symbols-rounded">
                    delete
                </i></button>
            </div>
        </div>
    )
}

export default CartItem

