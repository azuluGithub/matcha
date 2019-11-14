import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignedOutLinks = () => {

    return (
        <>
            <Link className="navbar-brand" to="/">
                <img src="https://techcrunch.com/wp-content/uploads/2013/05/matcha_logo_big_no_mark.png" alt="logo" style={{ width: '100px' }} />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav m-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link text-white mr-5" to="/signup">Signup</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-white mr-5" to="/signin">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-white mr-5" to="/forgot">Forgot</NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SignedOutLinks;