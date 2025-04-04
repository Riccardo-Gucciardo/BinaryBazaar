
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useCart } from "../contexts/CartContext";
import { FaShoppingCart } from "react-icons/fa";

export default function NavBar() {
    const { cart, handleShowCart } = useCart()

    return (
        <header className="header">
            <NavLink to="/">
                <img src="/Logo.png" alt="" className="img-logo img-fluid" />
            </NavLink>

            {/* Menu Hamburger */}

            <input type="checkbox" className="menu-checkbox" id="menu-toggle" />
            <label className="menu-toggle" htmlFor="menu-toggle">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </label>



            {/* SearchBar visibile solo su desktop */}
            <div className="desktop-search">
                <SearchBar />
            </div>

            {/* Menu Items */}
            <div className="nav-menu">

                {/* SearchBar dentro il menu su mobile */}
                <div className="mobile-search">
                    <SearchBar />
                </div>

                <ul className="nav">
                    <li className="nav-item">
                        <NavLink className="nav-link active" to="/" aria-current="page">
                            HomePage
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/products">
                            I Nostri Prodotti
                        </NavLink>
                    </li>
                    <li className="cart-container">
                        <button className="cart-button" onClick={handleShowCart}>
                            <FaShoppingCart size={20} />
                            {cart?.length > 0 && (
                                <span className="cart-badge">{cart.length}</span>
                            )}
                        </button>
                    </li>

                </ul>
            </div>

            {/* Carrello */}

        </header>
    );
}
