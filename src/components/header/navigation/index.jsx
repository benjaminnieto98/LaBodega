import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/cart-context";
import { Link } from "react-router-dom";
import { firebaseServices } from '../../../services/firebase/index';
import Logo from '../../../assets/logo.png';
import './styles.css';
import { AuthContext } from "../../../context/auth-context";

const Header = () => {
  const { cart } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(currentUser && currentUser.email === 'labodega@admin.com');
  }, [currentUser]);

  return (
      <nav className="navBar">
        <div className="logoContainer">
          <Link to='/'>
            <img src={Logo} alt="La Bodega" className="logoImage" />
          </Link>
        </div>

        <div className="userContainer">

          <Link to='login'>
            <div className="userAvatar">
              <i className="material-symbols-rounded">account_circle</i>
            </div>
          </Link>
          
          {!isAdmin && (
            <Link to='cart'>
            <div className="bagWidget">
              <i className="material-symbols-rounded">shopping_bag</i>
              <span className="cartCount">{cart.length}</span>
            </div>
          </Link>
          )}

          {isAdmin && (
            <Link to='orders'>
              <div className="adminAvatar">
                <i className="material-symbols-rounded">receipt_long</i>
              </div>
            </Link>
          )}
          {isAdmin && (
            <Link to='admin'>
              <div className="adminAvatar">
                <i className="material-symbols-rounded">shield_person</i>
              </div>
            </Link>
          )}

          {/* <div className="burgerMenu">
            <label className="burger" htmlFor="burger">
              <input type="checkbox" id="burger" />
              <span></span>
              <span></span>
              <div className="navLinks">
                <a href="">Tienda</a>
                {categories.map((category) => (
                  <a key={category.id} href={`#${category.name}`}>
                    {category.name}
                  </a>
                ))}
              </div>
            </label>
          </div> */}
        </div>
      </nav>
  );
};

export default Header;
