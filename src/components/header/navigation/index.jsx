import { useContext } from "react";
import { CartContext } from "../../../context/cart-context";
import { useNavigate } from "react-router-dom";
import Logo from '../logo/index';
import './styles.css';

const Header = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCart = () => {
    navigate('/cart');
  }
  return (
    <header className='header'>
      <div className="navContent">
        <Logo />
        <input type='checkbox' className='sideMenu' id='sideMenu' />
        <label htmlFor='sideMenu' className='hamb'>
          <span className='hambLine'></span>
        </label>
        <nav className='nav'>
          <ul className='menu'>
            <li onClick={goToCart}>
              <div className='cartWidget'>
                <i className="material-symbols-rounded">
                  shopping_bag
                </i>
                <span className="cartCount">{cart.length}</span>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>

  );
};

export default Header;
