import React, { Component } from 'react';
import './editSidebar/editSidebar.css';
import { storage } from '../../config/fbConfig';
import  firebase from '../../config/fbConfig';
import { connect } from 'react-redux';
import { createProfile } from "../../store/actions/profileActions";
import { updateUserEmail } from "../../store/actions/profileActions";
import { updateUserPassword } from "../../store/actions/profileActions";
import EditContent from './editSidebar/EditContent';
import { Redirect } from 'react-router-dom';
import Footer from '../fragements/Footer';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Navbar from '../fragements/Navbar';

class Profile extends Component {
  
  state = {
    firstname: this.props.profile.firstname,
    lastname: this.props.profile.lastname,
    username: this.props.profile.username,
    tags: this.props.profile.tags,
    bio: this.props.profile.bio,
    age: this.props.profile.age,
    url: this.props.profile.url,
    url1: this.props.profile.url1,
    url2: this.props.profile.url2,
    url3: this.props.profile.url3,
    url4: this.props.profile.url4,
    gender: this.props.profile.gender,
    sexPref: this.props.profile.sexPref,
    email: this.props.auth.email,
    lati: this.props.profile.lati,
    long: this.props.profile.long,
}
  
UNSAFE_componentWillReceiveProps = (props) => {
    this.setState({
      firstname: props.profile.firstname,
      lastname: props.profile.lastname,
      username: props.profile.username,
      tags: props.profile.tags,
      bio: props.profile.bio,
      age: props.profile.age,
      url: props.profile.url,
      url1: props.profile.url1,
      url2: props.profile.url2,
      url3: props.profile.url3,
      url4: props.profile.url4,
      gender: props.profile.gender,
      sexPref: props.profile.sexPref,
      email: props.auth.email,
      lati: props.profile.lati,
      long: props.profile.long,
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

  //profile submit
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createProfile(this.state);
  }

  //email submit
  handleEmailSubmit = (event) => {
    event.preventDefault();
    this.props.updateUserEmail(this.state);
  }

  //password submit
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

  render() {
    const { views, users, auth, likes, blocks, matches } = this.props;
    if (!auth.uid) {
        return <Redirect to="/signin"/>
    } else {
      if (likes && users && views && matches && blocks) {
        const { lati, long, firstname, lastname, username, email, gender, sexPref, age, bio, tags, url, url1, url2, url3, url4 } = this.state;
        return (
                  <div>
                    <Navbar/>
                          <EditContent
                            firstname={firstname}
                            lastname={lastname}
                            username={username}
                            email={email}
                            gender={gender}
                            sexPref={sexPref}
                            age={age}
                            bio={bio}
                            tags={tags}
                            url={url}
                            url1={url1}
                            url2={url2}
                            url3={url3}
                            url4={url4}
                            handleImageUpload={this.handleImageUpload}
                            lati={lati}
                            long={long}
                            auth={auth}
                            views={views}
                            likes={likes}
                            users={users}
                            matches={matches}
                            blocks={blocks}
                          />
                      <Footer/>   
                  </div>
                )
              } else {
                return (
                    <div id="dot-loader">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                );
            }
        }
    }
}

const mapStateToProps = (state) => {
  const auth = state.firebase.auth
  const views = state.firestore.ordered.views;
  const likes = state.firestore.ordered.likes;
  const matches = state.firestore.ordered.matches;
  const users = state.firestore.ordered.users;
  const profile = state.firebase.profile;
  const blocks = state.firestore.ordered.blocks;
  const auth_update_email_err = state.profile.auth_update_email_err;
  const auth_update_password_err = state.profile.auth_update_password_err;
  const auth_update_profile_err = state.profile.auth_update_profile_err;
  return {
      auth: auth,
      blocks: blocks,
      views: views,
      likes: likes,
      matches: matches,
      users: users,
      profile: profile,
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
    { collection: "users" },
    { collection: "blocks"},
    { collection: "likes", orderBy: ["createdAt", "desc"] },
    { collection: "views", orderBy: ["createdAt", "desc"] },
    { collection: "matches", orderBy: ["createdAt", "desc"] },
  ])
) (Profile);

