import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css';
import successAnimation from '../../assets/success.json';
import Lottie from 'lottie-react';

const SuccessOrder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderId } = location.state || { orderId: null };

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="successOrderContainer">
            <h1>¡Tu pedido se envió con éxito!</h1>
            <Lottie animationData={successAnimation} loop={false} className='animation'/>
        </div>
    );
}

export default SuccessOrder;
