import { Link } from 'react-router-dom';
import './styles.css';

const Logo = () => {
    return (
        <Link to='/' className='logo' >
            <span className='actuaText'>&nbsp;iSolutions</span>
            <span className='hoverText' aria-hidden='true'>&nbsp;iS</span>
        </Link >
    )
}

export default Logo;