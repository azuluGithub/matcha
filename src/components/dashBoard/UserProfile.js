import React, { Component} from 'react';
import Content from '../sidebar/Content';

class UserProfile extends Component {
    render() {
        const { isSortAge, sexPref, searchedTag, ageRange, popularityRange, users, city, isSearchedcity, isSearchedAge, /*isSearchgender,*/ isSearchSexPref, isSearchedPopularity, isSearchedTag } = this.props;
        return (
            <div className="main-content-container">
                <div className="dash-content-container">
                    { 
                        users && users.filter(isSearchSexPref(sexPref))
                        .filter(isSearchedTag(searchedTag))
                        .filter(isSearchedcity(city))
                        .filter(isSearchedAge(ageRange))
                        .filter(isSearchedPopularity(popularityRange))
                        .sort(isSortAge())
                        .map(user => <Content key={user.id} user={user}/>)
                    }
                </div>
            </div>
        )
    }
}

export default UserProfile;