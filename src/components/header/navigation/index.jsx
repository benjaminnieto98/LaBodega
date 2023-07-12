import { useContext } from "react";
import { CartContext } from "../../../context/cart-context";
import { useNavigate } from "react-router-dom";
import CartWidget from '../cart/index';
import Logo from '../logo/index';
import './styles.css';

const NavBar = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCart = () => {
    navigate('/cart');
  }
  return (
    <header className='header'>
      <Logo />
      <input type='checkbox' className='sideMenu' id='sideMenu' />
      <label htmlFor='sideMenu' className='hamb'>
        <span className='hambLine'></span>
      </label>
      <nav className='nav'>
        <ul className='menu'>
          <li><a href='#'>Store</a></li>
          <li><a href='#'>iPhone</a></li>
          <li><a href='#'>iPad</a></li>
          <li><a href='#'>Mac</a></li>
          <li><a href='#'>Watch</a></li>
          <li><a href='#'>TV & Home</a></li>
          <li><a href='#'>Accessories</a></li>
          <a onClick={goToCart}><CartWidget />
            <span className='cartCounter'>{cart.length}</span>
          </a>
        </ul>
      </nav>
    </header>

  );
};

export default NavBar;
