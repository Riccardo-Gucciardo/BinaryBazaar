import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function NavBar() {
    return (
        <header className="header">
            <NavLink to="/"> 
                <img src="/Logo.png" alt="" className="img-logo" />
            </NavLink>

            {/* SearchBar Desktop */}
            <div className="desktop-search">
                <SearchBar />
            </div>

            {/* Menu Hamburger */}
            <input type="checkbox" className="menu-checkbox" id="menu-toggle" />
            <label className="menu-toggle" htmlFor="menu-toggle">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </label>

            {/* Menu Items */}
            <div className="nav-menu">
                {/* SearchBar Mobile */}
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
                        <NavLink className="nav-link" to="/:slug">
                            I Nostri Prodotti
                        </NavLink>
                    </li>
                </ul>
            </div>
        </header>
    );
}
