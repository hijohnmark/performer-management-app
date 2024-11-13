import { NavLink } from 'react-router-dom'
import "../navbar.css"

function NavBar() {
    return (
        <nav>
            <NavLink 
            to='/'
            className='nav-link'
            >
                Home
            </NavLink>
            <NavLink
            to='/events'
            className='nav-link'
            >
                Events
            </NavLink>
            <NavLink
            to='/manage'
            className='nav-link'
            >
                Manage
            </NavLink>
        </nav>
    )
}

export default NavBar