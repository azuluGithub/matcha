import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import UserProfile from './UserProfile';
import '../sidebar/sidebar.css';
import { connect } from 'react-redux';
import { createProfile } from "../../store/actions/profileActions";
import { updateUserEmail } from "../../store/actions/profileActions";
import { updateUserPassword } from "../../store/actions/profileActions";
import { firestoreConnect } from 'react-redux-firebase';
import { storage } from '../../config/fbConfig';
import  firebase from '../../config/fbConfig';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import Navbar from '../fragements/Navbar';
import Footer from '../fragements/Footer';
import ImageUpLoad from './ImageUpLoad';
import UpdateSummary from '../profile/editSidebar/UpdateSummary';

const isSearchSexPref = (sexPref) => (user) => {
    return !sexPref || user.gender.toLowerCase() === sexPref.toLowerCase();
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
    return /*!popularityRange ||*/ user.popularity >= popularityRange;
}

class DashBoard extends React.Component {

    state = {
        users: [],
        searchedTag: "",
        ageRange: "",
        popularityRange: "",
        sexPref: "",
        city: "",
        invalid_input: "",
        url : this.props.profile.url,
        url1 : this.props.profile.url1,
        url2 : this.props.profile.url2,
        url3 : this.props.profile.url3,
        url4 : this.props.profile.url4,
        tags: this.props.profile.tags,
        firstname : this.props.profile.firstname,
        lastname : this.props.profile.lastname,
        username : this.props.profile.username,
        bio: this.props.profile.bio,
        age: this.props.profile.age,
        gender: this.props.profile.gender,
        //sexPref: this.props.profile.sexPref,
        email: this.props.auth.email,
    }

    UNSAFE_componentWillReceiveProps(props) {
        const my_pref = props.profile.sexPref;
        this.setState({
            users: props.users,
            sexPref: my_pref,
            url : props.profile.url,
            url1 : props.profile.url1,
            url2 : props.profile.url2,
            url3 : props.profile.url3,
            url4 : props.profile.url4,
            tags: props.profile.tags,
            city: props.profile.city,
            firstname : props.profile.firstname,
            lastname : props.profile.lastname,
            username : props.profile.username,
            bio: props.profile.bio,
            age: props.profile.age,
            gender: props.profile.gender,
            //sexPref: props.profile.sexPref,
            email: props.auth.email
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [ name ] : value,
        })
    }

    onKeyUp = (e) => {
        if (e.which === 32) {
            let input = e.target.value.trim().split(" ");
                if (input.length === 0 || input[0] === "") return;
                    if (input[0].toLowerCase() !== "gym" && input[0].toLowerCase() !== "art" && input[0].toLowerCase() !== "music" && input[0].toLowerCase() !== "photography" && input[0].toLowerCase() !== "coding"){
                        this.setState({
                            invalid_input: "YOU ENTERED AN INVALID TAG!",
                        });
                        return;
                    }
    
                this.setState({
                    tags: [ ...this.state.tags, input ]
                });
                this.setState({ 
                    invalid_input: ""
                });
            e.target.value = "";
        }
    }

    handleChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [ name ] : value })
    }

    handleSubmit = (event) => {
      event.preventDefault();
      this.props.createProfile(this.state);
    }

    handleEmailSubmit = (event) => {
      event.preventDefault();
      this.props.updateUserEmail(this.state);
    }

    handlePasswordSubmit = (event) => {
      event.preventDefault();
      this.props.updateUserPassword(this.state);
    }

    onDeleteTag = (tag) => {
      var tags = this.state.tags.filter((t) => {
        return (t !== tag);
      });
      this.setState({
        tags: tags
      });
    }

    handleImageUpload = (e) => {
      if (e.target.files[0]) {
          const image = (e.target.files[0]);
          const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on('state_changed',
              (snapshot) => {
                console.log(snapshot);
              }, (error) => {
                console.log(error);
              }, () => {
                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                  this.setState({ url });
                  var user = firebase.auth().currentUser;
                  var prof_img = firebase.firestore().collection('users').doc(user.uid);
                  prof_img.update({
                    url: url,
                  })
                })
            })
      }
    }

    handleImageUpload1 = (e) => {
        if (e.target.files[0]) {
          const image = (e.target.files[0]);
          const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on('state_changed',
              (snapshot) => {
                console.log(snapshot);
              }, (error) => {
                console.log(error);
              }, () => {
                storage.ref('images').child(image.name).getDownloadURL().then(url1 => {
                  this.setState({ url1 });
                  var user = firebase.auth().currentUser;
                  var img1 = firebase.firestore().collection('users').doc(user.uid);
                  img1.update({
                    url1: url1,
                  })
                })
            })
        }
    }

    handleImageUpload2 = (e) => {
        if (e.target.files[0]) {
          const image = (e.target.files[0]);
          const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on('state_changed',
              (snapshot) => {
                console.log(snapshot);
              }, (error) => {
                console.log(error);
              }, () => {
                storage.ref('images').child(image.name).getDownloadURL().then(url2 => {
                  this.setState({ url2 });
                  var user = firebase.auth().currentUser;
                  var img2 = firebase.firestore().collection('users').doc(user.uid);
                  img2.update({
                    url2: url2,
                  })
                })
            })
        }
    }

    handleImageUpload3 = (e) => {
        if (e.target.files[0]) {
          const image = (e.target.files[0]);
          const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on('state_changed',
              (snapshot) => {
                console.log(snapshot);
              }, (error) => {
                console.log(error);
              }, () => {
                storage.ref('images').child(image.name).getDownloadURL().then(url3 => {
                  this.setState({ url3 });
                  var user = firebase.auth().currentUser;
                  var img3 = firebase.firestore().collection('users').doc(user.uid);
                  img3.update({
                    url3: url3,
                  })
                })
            })
        }
    }

    handleImageUpload4 = (e) => {
        if (e.target.files[0]) {
          const image = (e.target.files[0]);
          const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on('state_changed',
              (snapshot) => {
                console.log(snapshot);
              }, (error) => {
                console.log(error);
              }, () => {
                storage.ref('images').child(image.name).getDownloadURL().then(url4 => {
                  this.setState({ url4 });
                  var user = firebase.auth().currentUser;
                  var img4 = firebase.firestore().collection('users').doc(user.uid);
                  img4.update({
                    url4: url4,
                  })
                })
            })
        }
    }

    render() {
        const { tags, invalid_input } = this.state;
        const { auth, update_email_err, update_password_err, update_profile_err } = this.props;
        const { handleEmailSubmit, onKeyUp, handleChange, handleSubmit, handlePasswordSubmit, onDeleteTag } = this;
        if (!auth.uid) {
            return <Redirect to="/signin"/>
        } else {
            const { sexPref, users, searchedTag, /*gender,*/ ageRange, popularityRange, city } = this.state;
            if (this.props.profile.sexPref === "" || this.props.profile.gender === "") {
                return <div>
                        <Navbar/>
                        <div className="dashboard-page">
                            <div className="dashboard-upload">
                                <ImageUpLoad
                                    handleImageUpload={this.handleImageUpload}
                                    handleImageUpload1={this.handleImageUpload1}
                                    handleImageUpload2={this.handleImageUpload2}
                                    handleImageUpload3={this.handleImageUpload3}
                                    handleImageUpload4={this.handleImageUpload4}
                                />
                            </div>
                            <UpdateSummary
                                tags={tags}
                                onDeleteTag={onDeleteTag}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                handlePasswordSubmit={handlePasswordSubmit}
                                handleEmailSubmit={handleEmailSubmit}
                                onKeyUp={onKeyUp}
                                invalid_input={invalid_input}
                                update_email_err = {update_email_err}
                                update_password_err = {update_password_err}
                                update_profile_err = {update_profile_err}
                            />
                        </div>
                    <Footer/>
                </div>
            } else {
                return <div>
                    <Navbar/>
                    <div className="dash-box">
                        <Sidebar
                            handleChange={handleChange}
                            searchedTag={searchedTag}
                            ageRange={ageRange}
                            popularityRange={popularityRange}
                            sexPref={sexPref}
                        />
                        <UserProfile
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
                            sexPref={sexPref}
                        />
                    </div>
                    <Footer/>
                </div>
            }
        }
    }
}

const mapStateToProps = (state) => {
    const auth = state.firebase.auth;
    const profile = state.firebase.profile;
    const auth_update_email_err = state.profile.auth_update_email_err;
    const auth_update_password_err = state.profile.auth_update_password_err;
    const auth_update_profile_err = state.profile.auth_update_profile_err;
    const all_users = state.firestore.ordered.users;
    const me_id = state.firebase.auth.uid;
    const f_users =  all_users && all_users.filter(user => {
        return user.id !== me_id
    })
    return {
        users: f_users,
        profile: profile,
        auth: auth,
        update_email_err: auth_update_email_err,
        update_password_err: auth_update_password_err,
        update_profile_err: auth_update_profile_err,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserPassword: (pass) => dispatch(updateUserPassword(pass)),
        createProfile: (profile) => dispatch(createProfile(profile)),
        updateUserEmail: (e_mail) => dispatch(updateUserEmail(e_mail))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: "users"},
    ])
)(DashBoard);