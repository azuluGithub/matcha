import React, { Component } from 'react';
//import moment from 'moment';
import { Link } from 'react-router-dom';

class NewsViewsSummary extends Component {
    
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
                            <span className="nuus-user" >{ user.firstname[0].toUpperCase() + user.firstname.slice(1)} { user.lastname[0].toUpperCase() + user.lastname.slice(1) }, visited your profile</span><br/>
                            {/*<span className="nuus-time">{moment(view.createdAt.toDate()).calendar()}</span>
                        */}</div>
                    </div>
                </Link>
            </React.Fragment>
        )
    }
}

export default NewsViewsSummary;