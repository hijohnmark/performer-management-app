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
            to='/performers'
            className='nav-link'
            >
                Manage Performers
            </NavLink>
            <NavLink
            to='/events'
            className='nav-link'
            >
                Manage Events
            </NavLink>
            <NavLink
            to='/venues'
            className='nav-link'
            >
                Manage Venues
            </NavLink>
            <NavLink
            to='/nearby'
            className='nav-link'
            >
                Near Me
            </NavLink>
        </nav>
    )
}

export default NavBar