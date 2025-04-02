import { NavLink } from "react-router-dom"
import SearchBar from "./SearchBar"
import CartOffcanvas from "./CartOffcanvas"

export default function NavBar() {
    return (

        <header className="header">

            <NavLink to="/"> <img src="/Logo.png" alt="" className="img-logo" /> </NavLink>

            <SearchBar />

            <ul
                className="nav justify-content-center  "
            >
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
                    
                </li>
                {/* <li className="nav-item">
                <NavLink className="nav-link disabled" to="/:slug">Disabled link</NavLink>
            </li> */}
            </ul>

        </header>



    )
}