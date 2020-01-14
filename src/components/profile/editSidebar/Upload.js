import React from 'react';
import UploadSummary from './UploadSummary';
import { connect } from 'react-redux';
import { storage } from '../../../config/fbConfig';
import  firebase from '../../../config/fbConfig';
import Navbar from '../../fragements/Navbar';
import Footer from '../../fragements/Footer';

class Upload extends React.Component {

    state = {
        url1 : this.props.profile.url1,
        url2 : this.props.profile.url2,
        url3 : this.props.profile.url3,
        url4 : this.props.profile.url4
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({
            url1 : props.profile.url1,
            url2 : props.profile.url2,
            url3 : props.profile.url3,
            url4 : props.profile.url4
        })
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
        return <div>
                    <Navbar/>
                    <div className="dashboard-page">
                        <div className="dashboard-upload">
                            <UploadSummary
                                handleImageUpload1={this.handleImageUpload1}
                                handleImageUpload2={this.handleImageUpload2}
                                handleImageUpload3={this.handleImageUpload3}
                                handleImageUpload4={this.handleImageUpload4}
                            />
                        </div>
                    </div>
                    <Footer/>
                </div>
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Upload);