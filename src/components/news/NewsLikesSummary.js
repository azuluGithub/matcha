import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { viewUser } from '../../store/actions/profileActions';

class NewslikesSummary extends Component {
    
    handleClick = () => {
        const { like } = this.props;
        this.props.viewUser(like.liked_id, like.liked_name, like.liked_url, like.liker_id, like.liker_name, like.liker_url);
        // console.log(`viewer_id: ${view.viewed_id} viewer_name: ${view.viewed_name} "VIEWED" viewed_id:${view.viewer_id} viewed_name: ${view.viewer_name}`);
    }
    

    render() {
        const { like } = this.props;
        return (
            <React.Fragment>
                <Link style={{ textDecoration: 'none' }}  onClick={this.handleClick} to={'/viewuser/'+like.liker_id}>
                    <div className="nuus-container">
                        <div className="nuus-img">
                            <img src={like.liker_url} alt="img"/>
                        </div>
                        <div className="nuus-content">
                            <span className="nuus-user" >{ like.liker_name[0].toUpperCase() + like.liker_name.slice(1) }, liked your profile</span><br/>
                            <span className="nuus-time">{moment(like.createdAt.toDate()).calendar()}</span>
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

export default connect(null, mapDispatchToProps) (NewslikesSummary);