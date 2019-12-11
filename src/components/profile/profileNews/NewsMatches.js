import React from 'react';
import { Link } from 'react-router-dom';

const NewsMatches = () => {
    return (
        <React.Fragment>
                <Link style={{ textDecoration: 'none' }}  to="#">
                    <div className="nuus-container">
                        <div className="nuus-img">
                            <img src="" alt="img"/>
                        </div>
                        <div className="nuus-content">
                            <span className="nuus-user" >Arnold , liked your profile</span><br/>
                            <span className="nuus-time">Today at 2:00pm</span>
                        </div>
                    </div>
                </Link>
        </React.Fragment>
    )
}

export default NewsMatches;
