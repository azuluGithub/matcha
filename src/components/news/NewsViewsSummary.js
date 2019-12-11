import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { viewUser } from '../../store/actions/profileActions';

class NewsViewsSummary extends Component {
    
    handleClick = (e) => {
        const { view } = this.props;
        this.props.viewUser(view.viewed_id, view.viewed_name, view.viewed_url, view.viewer_id, view.viewer_name, view.viewer_url);
        console.log(`viewer_id: ${view.viewed_id} viewer_name: ${view.viewed_name} "VIEWED" viewed_id:${view.viewer_id} viewed_name: ${view.viewer_name}`);
    }

    render() {
        const { view } = this.props;
        return (

            <React.Fragment>
                <Link style={{ textDecoration: 'none' }}  onClick={this.handleClick} to={'/viewuser/'+view.viewer_id}>
                    <div className="nuus-container">
                        <div className="nuus-img">
                            <img src={view.viewer_url} alt="img"/>
                        </div>
                        <div className="nuus-content">
                            <span className="nuus-user" >{ view.viewer_name[0].toUpperCase() + view.viewer_name.slice(1) }, visited your profile</span><br/>
                            <span className="nuus-time">{moment(view.createdAt.toDate()).calendar()}</span>
                        </div>
                    </div>
                </Link>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        viewUser: (viewed_id, viewed_name, viewed_url, viewer_id, viewer_name, viewer_url) => dispatch(viewUser(viewed_id, viewed_name, viewed_url, viewer_id, viewer_name, viewer_url))
    }
}

export default connect(null, mapDispatchToProps) (NewsViewsSummary);