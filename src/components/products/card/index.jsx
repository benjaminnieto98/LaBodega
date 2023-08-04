import { memo } from 'react';
import './styles.css';

const Card = memo(({ id, image, name, description, price, stock, onAddToCart, onShowDetails }) => {
    return (
        <div className='card'>
            <button type='button' className='cardButtonContainer' onClick={() => onShowDetails(id)}>
                <div className="cardTitleContainer">
                    <h1 className='cardTitle'>{name}</h1>
                </div>
                <div className='cardImageContainer'>
                    <img className='cardImage' src={image} alt={name} />
                </div>
            </button >
            <p className='cardPrice'>USD{price}</p>
            <div className='cardActionsContainer'>
                <button className='cardButton' onClick={() => onAddToCart(id)}>Add to cart</button>
            </div>
        </div>
    )
});

export default Card;
