import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProfile } from "../../../store/actions/profileActions";
import { updateUserEmail } from "../../../store/actions/profileActions";
import { updateUserPassword } from "../../../store/actions/profileActions";
import Navbar from '../../fragements/Navbar';
import Footer from '../../fragements/Footer';
import { Redirect } from 'react-router-dom';
import UpdateSummary from './UpdateSummary';
import { storage } from '../../../config/fbConfig';
import  firebase from '../../../config/fbConfig';

class Update extends Component {

    state = {
        tags: ""
    }

    componentWillReceiveProps = (props) => {
        this.setState({
            tags: props.profile.tags,
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

    render() {
        const { tags, auth, update_email_err, update_password_err, update_profile_err } = this.props;
        const { handleEmailSubmit, onKeyUp, invalid_input, handleChange, handleSubmit, handlePasswordSubmit, onDeleteTag } = this;
        if (!auth.uid) {
            return (<Redirect to="/signin"/>)
        } else {
            return <div>
                    <Navbar/>
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
                    <Footer/>
                </div>
        }
    }
}

const mapStateToProps = (state) => {
    const auth = state.firebase.auth
    const auth_update_email_err = state.profile.auth_update_email_err;
    const auth_update_password_err = state.profile.auth_update_password_err;
    const auth_update_profile_err = state.profile.auth_update_profile_err;
    return {
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

export default connect(mapStateToProps, mapDispatchToProps) (Update);