import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ user }) => {
    return (
        <React.Fragment>
            <Link style={{ textDecoration: 'none' }} to={'/chatlist/'+user.id}>
                <div className="nuus-container">
                    <div className="nuus-img">
                        <img src={user.url} alt="img"/>
                    </div>
                    <div className="nuus-content">
                        <span className="nuus-user" > { user.firstname[0].toUpperCase() + user.firstname.slice(1) }</span><br/>
                    </div>
                </div>
            </Link>
        </React.Fragment>
    )

}

export default Card
