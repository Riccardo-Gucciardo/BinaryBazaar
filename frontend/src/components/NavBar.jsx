
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { FaGift, FaShoppingCart,FaHeart } from "react-icons/fa";
import { useWishlist } from "../contexts/WishlistContext";

export default function NavBar() {
    const { cart, handleShowCart } = useCart()
    const {wishlist} = useWishlist();

    return (
        <header className="header">
            <NavLink to="/home">
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
                        <NavLink className="nav-link active" to="/home" aria-current="page">
                            HomePage
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/products">
                            I Nostri Prodotti
                        </NavLink>
                    </li>
                    <li className="wishlist-container">
                        <NavLink to='/WishList' className='nav-link'>
                        <FaHeart size={25}/>
                        {wishlist?.length > 0 && (
                            <span className="wishlist-badge">{wishlist.length}</span>
                        )}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link gift-link" to="/gameDiscount">
                            <FaGift className="gift-icon" size={25} />
                        </NavLink>
                    </li>
                    <li className="cart-container">
                        <button className="cart-button rounded" onClick={handleShowCart}>
                            <FaShoppingCart size={25} />
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
