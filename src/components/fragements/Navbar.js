import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authAction';
import { FaFacebookMessenger, FaPowerOff, FaRegBell, FaHouseDamage } from "react-icons/fa";


function Navbar(props) {
    return (
        <nav className="nav-ba">
            {/**FLEX BOX*/}
            <ul>
                <li><NavLink className="logo-matcha" to="/">Matcha</NavLink></li>
                <li>
                    <NavLink to="/profile" className="nav-img">
                        <img src={props.profile.url} alt="img" className="rounded-circle"/>
                        <span className="nav-name">     { } { props.profile.username }</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/"><FaHouseDamage/></NavLink>
                </li>
                <li>
                    <NavLink to="/chat"><FaFacebookMessenger/></NavLink>
                </li>
                <li>
                    <NavLink to="/news"><FaRegBell/></NavLink>
                </li>
                <li>
                    <Link style={{color:"red"}} onClick={props.sign_Out} to="/signin">< FaPowerOff/></Link>
                </li>
            </ul>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sign_Out: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Navbar);