import { NavLink } from "react-router-dom"
import SearchBar from "./SearchBar"

export default function NavBar() {
    return (

        <header className="header">
        <NavLink to="/"> <img src="/Logo.png" alt="" className="img-logo" /> </NavLink>
    
        <div className="search-container">
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
    </header>



    )
}