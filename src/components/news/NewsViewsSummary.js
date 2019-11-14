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
                <Link  onClick={this.handleClick} to={'/viewuser/'+view.viewer_id}>
                    <div className="container2 newsCard">
                        <div className="newsImg">
                            <img src={view.viewer_url} alt="avatar" style={{width:"60px", height:"60px"}} className="rounded-circle"/>
                        </div>
                        <div className="newsContent">
                            <span className="newsMsg" >{ view.viewer_name }, visited your profile</span>
                            <p className="newsTime">{moment(view.createdAt.toDate()).calendar()}</p>
                        </div>
                        <div className="overlay">
                            <div className="text"></div>
                        </div>
                    </div>
                </Link>
                <hr />
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