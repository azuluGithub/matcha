import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav className="navba">
            {/**FLEX BOX*/}
            <ul>
                <li><NavLink className="logo-matcha" to="/signin">Matcha</NavLink></li>
                <li><NavLink to="/signin">Login</NavLink></li>
                <li><NavLink to="/signup">SignUp</NavLink></li>
                <li><NavLink to="/forgot">Forgot</NavLink></li>
            </ul>
        </nav>
    )
}

export default Nav;
