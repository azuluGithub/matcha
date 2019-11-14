import React, { Component } from 'react';
import UserProfile from './UserProfile';
import Filters from './Filters';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';

const isSearchSexPref = (sexPref) => (user) => {
    return !sexPref || user.sexPref.toLowerCase() === sexPref.toLowerCase();
}

const isSearchedTag = (searchedTag) => (user) => {
    return !searchedTag  || user.tags.includes(searchedTag.toLowerCase());
}

const isSearchedcity = (city) => (user) => {
    return !city  || user.city.toLowerCase() === city.toLowerCase();
}

const isSearchedAge = (ageRange) => (userage) => {
    return !ageRange || userage.age <= ageRange;
}

const isSearchedPopularity = (popularityRange) => (user) => {
    return !popularityRange || user.popularity >= popularityRange;
}

class DashBoard extends Component {

    state = {
        users: [],
        searchedTag: "",
        ageRange: "",
        popularityRange: "",
        sexPref: "",
        city: ""
    }

    componentWillReceiveProps = (props) => {
        const my_pref = props.profile.sexPref === "male" ? "female" : "male";
        this.setState({
            users: props.users,
            sexPref: my_pref
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [ name ] : value,
        })
    }

    render() {
        const { auth } = this.props;
        if (!auth.uid) {
            return <Redirect to="/signin"/>
        } else {
            const { users, searchedTag, sexPref, ageRange, popularityRange, city } = this.state;
            const { handleChange } = this;
            return (
                <div className=" dashLayout container-fluid">
                    <div className="row">
                        <div className="col-sm-12 col-md-3 dashLeft">
                            <Filters
                                handleChange={handleChange}
                                searchedTag={searchedTag}
                                ageRange={ageRange}
                                popularityRange={popularityRange}
                                sexPref={sexPref}
                            />
                        </div>
                        <div className="col-sm-12 col-md-9 dashRight pre-scrollable">
                            <div className="gallery">
                                <UserProfile
                                    sexPref={sexPref}
                                    searchedTag={searchedTag}
                                    ageRange={ageRange}
                                    popularityRange={popularityRange}
                                    users={users}
                                    isSearchedAge={isSearchedAge}
                                    isSearchSexPref={isSearchSexPref}
                                    isSearchedPopularity={isSearchedPopularity}
                                    isSearchedTag={isSearchedTag}
                                    isSearchedcity={isSearchedcity}
                                    city={city}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    const all_users = state.firestore.ordered.users;
    const me_id = state.firebase.auth.uid;
    const f_users =  all_users && all_users.filter(user => {
        return user.id !== me_id
    })
    return {
        users: f_users,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: "users"/*, orderBy: ["age", "asc"]*/}
    ])
)(DashBoard);