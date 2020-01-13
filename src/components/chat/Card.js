import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ user, auth, blocks, iBlocked }) => {
    const wasIBlocked = blocks.filter(iBlocked(user.id, auth.uid));
    const didIBlock = blocks.filter(iBlocked(auth.uid, user.id));
    if (didIBlock.length > 0 || wasIBlocked.length > 0) {
        return <div></div>
    } else {
        return (
            <React.Fragment>
                <Link style={{ textDecoration: 'none' }} to={'/chatlist/'+user.id}>
                    <div className="nuus-container">
                        <div className="chat-img">
                            <img src={user.url} alt="img"/>
                        </div>
                        <div className="nuus-content">
                            <span className="nuus-name" > { user.firstname[0].toUpperCase() + user.firstname.slice(1) }</span><br/>
                        </div>
                    </div>
                </Link>
            </React.Fragment>
        )
    }
}

export default Card
