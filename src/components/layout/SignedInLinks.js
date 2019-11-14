import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authAction';
import { FaCommentAlt, FaPowerOff, FaRegBell, FaHouseDamage } from "react-icons/fa";

const SignedInLinks = (props) => {
    
    return (
        <React.Fragment>
            <Link className="navbar-brand" to="/">
                <img src="https://techcrunch.com/wp-content/uploads/2013/05/matcha_logo_big_no_mark.png" alt="logo" style={{ width: '100px' }} />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav m-auto">
                    <li className="nav-item active">
                        <NavLink className="nav-link text-white  mr-3" to="/profile">
                        <img src={props.profile.url} alt="avatar" style={{width:"30px", height:"30px"}} className="rounded-circle"/>
                             { } { props.profile.username }
                        </NavLink>
                    </li>
                    <li className="nav-item active">
                        <NavLink className="nav-link text-white  mr-3" to="/"><FaHouseDamage/></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink  className="nav-link text-white  mr-3" to="/chat"><FaCommentAlt/></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-white  mr-3" to="/news"><FaRegBell/></NavLink>
                    </li>

                    <li className="nav-item">
                        <Link style={{color:"red"}} className="nav-link log_out_style mr-3" onClick={props.sign_Out} to="/signin">< FaPowerOff/></Link>
                    </li>
                </ul>
            </div>
        </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps) (SignedInLinks);