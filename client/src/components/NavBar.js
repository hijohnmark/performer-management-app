import { NavLink } from 'react-router-dom'
import "../navbar.css"

function NavBar() {
    return (
        <nav>
            <NavLink 
            to='/'
            >
                Home
            </NavLink>
        </nav>
    )
}

export default NavBar