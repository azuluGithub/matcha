import React, { Component} from 'react';
import User from './User';

class UserProfile extends Component {

    render() {
        const { sexPref, searchedTag, ageRange, popularityRange, users, city, isSearchedcity, isSearchedAge, isSearchSexPref, isSearchedPopularity, isSearchedTag } = this.props;
        return (
            <React.Fragment>
               { 
                   users && users.filter(isSearchSexPref(sexPref))
                    .filter(isSearchedTag(searchedTag))
                    .filter(isSearchedcity(city))
                    .filter(isSearchedAge(ageRange))
                    .filter(isSearchedPopularity(popularityRange))
                    .map(user => <User key={user.id} user={user}/>)
                }
            </React.Fragment>
        )
    }
}

export default UserProfile;