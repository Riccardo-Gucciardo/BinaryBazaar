import { NavLink } from "react-router-dom"

export default function NavBar() {
    return (

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
            {/* <li className="nav-item">
                <NavLink className="nav-link disabled" to="/:slug">Disabled link</NavLink>
            </li> */}
        </ul>



    )
}