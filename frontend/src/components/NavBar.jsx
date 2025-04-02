import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useCart } from "../contexts/CartContext";

export default function NavBar() {
    const { cart, handleShowCart } = useCart();

    return (
        <header className="header">
            <NavLink to="/">
                <img src="/Logo.png" alt="" className="img-logo" />
            </NavLink>

            <SearchBar />

            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <NavLink className="nav-link active" to="/" aria-current="page">
                        HomePage
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/:slug">
                        I Nostri Prodotti
                    </NavLink>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-primary"
                        onClick={handleShowCart}
                        style={{ position: "relative",marginTop: "40px" }}
                    >
                        Carrello
                        {cart.length > 0 && (
                            <span
                                style={{
                                    position: "absolute",
                                    top: "-5px",
                                    right: "-10px",
                                    backgroundColor: "red",
                                    color: "white",
                                    borderRadius: "50%",
                                    padding: "5px 10px",
                                    fontSize: "12px",
                                }}
                            >
                                {cart.length}
                            </span>
                        )}
                    </button>
                </li>
            </ul>
        </header>
    );
}