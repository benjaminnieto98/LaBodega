import { memo } from 'react';
import './styles.css';

const Card = memo(({ id, image, name, category, measure, price, stock, onAddToCart, onShowDetails }) => {
    return (
        <div className='card'>
            {/* onClick={() => onShowDetails(id)} */}
            <button type='button' className='cardButtonContainer'>
                <div className='cardImageContainer'>
                    <img className='cardImage' src={image} alt={name} />
                </div>
                <div className="cardTitleContainer">
                    <h1 className='cardTitle'>{name}</h1>
                    <h2 className='cardMeasure'>{measure}ml</h2>
                    <p className='cardPrice'>${price}</p>
                </div>
            </button >
            <div className='cardActionsContainer'>
                <button className="CartBtn" onClick={() => onAddToCart(id)}>
                    <p className="text">Agregar</p>
                </button>
            </div>
        </div>
    )
});

export default Card;
