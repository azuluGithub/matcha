import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewsMatchesSummary extends Component {

    render() {
        const { user } = this.props;
        return (
            <React.Fragment>
                <Link style={{ textDecoration: 'none' }} to={'/viewuser/'+ user.id}>
                    <div className="nuus-container">
                        <div className="nuus-img">
                            <img src={user.url} alt="img"/>
                        </div>
                        <div className="nuus-content">
                            <span className="nuus-user" >{ "You" } matched with { user.firstname[0].toUpperCase() + user.firstname.slice(1) }</span><br/>
                        </div>
                    </div>
                </Link>
            </React.Fragment>
        )
    }
}

export default NewsMatchesSummary;