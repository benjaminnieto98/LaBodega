import { useLocation } from 'react-router-dom';
import './styles.css'

const SuccessOrder = () => {
    const location = useLocation();

    const { orderId } = location.state || { orderId: null }
    return (
        <div className='successContainer'>
            <div class="successTitle">
                <span>¡Congratulations!</span>
                <span>¡Congratulations!</span>
            </div>
            <h2 className='successDescription'><span className="material-symbols-rounded">rocket_launch</span> Your order was successful</h2>
            <p className='orderId'>Order Id: <span>{orderId}</span></p>
        </div>
    )
}

export default SuccessOrder