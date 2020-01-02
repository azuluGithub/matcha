import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewslikesSummary extends Component {
    
    render() {
        const { auth, user, blocks, iBlocked } = this.props;
        const wasIBlocked = blocks.filter(iBlocked(user.id, auth.uid));
        const didIBlock = blocks.filter(iBlocked(auth.uid, user.id));
        if (didIBlock.length > 0 || wasIBlocked.length) {
            return <div></div>
        } else {
            return (
                <React.Fragment>
                    <Link style={{ textDecoration: 'none' }} to={'/viewuser/'+ user.id}>
                        <div className="nuus-container">
                            <div className="nuus-img">
                                <img src={user.url} alt="img"/>
                            </div>
                            <div className="nuus-content">
                                <span className="nuus-msg">You liked </span>
                                <span className="nuus-name">{ user.firstname[0].toUpperCase() + user.firstname.slice(1)} { user.lastname[0].toUpperCase() + user.lastname.slice(1) } </span>
                                <span className="nuus-msg">'s profile</span>
                                <br/>
                            </div>
                        </div>
                    </Link>
                </React.Fragment>
            )
        }
    }
}

export default NewslikesSummary;