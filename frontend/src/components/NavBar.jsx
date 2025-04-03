import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useCart } from "../contexts/CartContext";
import { FaShoppingCart } from 'react-icons/fa'; // Install react-icons if not already installed

export default function NavBar() {
    const { cart, handleShowCart } = useCart();

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <img src="/Logo.png" alt="" className="img-logo img-fluid" />
                </NavLink>

                <div className="d-flex align-items-center order-lg-last">
                    <button
                        className="btn cart-button border-none"
                        onClick={handleShowCart}
                    >
                        <FaShoppingCart size={20} />
                        {cart.length > 0 && (
                            <span className="cart-badge">
                                {cart.length}
                            </span>
                        )}
                    </button>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                        aria-controls="navbarContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" aria-current="page">
                                HomePage
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/products" aria-current="page">
                                Prodotti
                            </NavLink>
                        </li>
                    </ul>
                    <div className="d-lg-none d-xl-none">
                        <SearchBar />
                    </div>
                </div>

                <div className="d-none d-lg-block">
                    <SearchBar />
                </div>
            </div>
        </nav>
    );
}