import React, { Component} from 'react';
import Content from '../sidebar/Content';
import Navbar from '../fragements/Navbar';

class UserProfile extends Component {

    render() {
        const { gender, searchedTag, ageRange, popularityRange, users, city, isSearchedcity, isSearchedAge, isSearchgender, isSearchedPopularity, isSearchedTag } = this.props;
        return (
            <div className="main-content-container">
                <Navbar/>
                    <div className="content-container">
                    { 
                    users && users.filter(isSearchgender(gender))
                        .filter(isSearchedTag(searchedTag))
                        .filter(isSearchedcity(city))
                        .filter(isSearchedAge(ageRange))
                        .filter(isSearchedPopularity(popularityRange))
                        .map(user => <Content key={user.id} user={user}/>)
                    }
                    </div>
            </div>
        )
    }
}

export default UserProfile;