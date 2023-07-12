import './styles.css';

const Card = ({ id, image, name, description, price, stock, onAddToCart, onShowDetails }) => {
    return (
        <div className='card'>
            <button type='button' className='cardButtonContainer' onClick={() => onShowDetails(id)}>
                <img className='cardImage' src={image} alt={name} />
                <div className='cardContent'>
                    <h3 className='cardTitle'>{name}</h3>
                    <p className='cardDescription'>{description}</p>
                    <p className='cardPrice'>USD{price}</p>
                    <p className='cardStock'>{stock} left</p>
                </div>
            </button >
            <div className='cardActions'>
                <button className='cardButton' onClick={() => onAddToCart(id)}>Add to cart</button>
            </div>
        </div>
    )
}

export default Card;
