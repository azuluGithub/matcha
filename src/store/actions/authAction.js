export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).update({
                loggedIn: true,
                time: new Date(),
            })
        }).then(() => {
            dispatch({ type:'LOGIN_SUCCESS' });
        }).catch((login_error) => {
            dispatch({ type:'LOGIN_ERROR', login_error })
        });
    }
}

export const resetPassword = (emailAddress) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().sendPasswordResetEmail(
            emailAddress.email
        ).then(function() {
            dispatch({ type:'SENT_EMAIL_SUCCESS'});
        }).catch(function(email_error) {
            dispatch({ type:'SENT_EMAIL_FAILURE', email_error});
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        var user = firebase.auth().currentUser;
        firebase.auth().signOut()
        .then(() => {
            firestore.collection('users').doc(user.uid).update({
                loggedIn: false,
                time: new Date(),
            })
        }).then(() => {
            dispatch({ type:'SIGNOUT_SUCCESS'});
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        var matchedCase = [];
        matchedCase.push("[$@$!%*#?&]");
        matchedCase.push("[A-Z]");    
        matchedCase.push("[0-9]"); 
        matchedCase.push("[a-z]");
        // Check the conditions
        var ctr = 0;
        for (var i = 0; i < matchedCase.length; i++) {
            if (new RegExp(matchedCase[i]).test(newUser.password)) {
                ctr++;
            }
        }

        if (newUser.firstname === "" || newUser.lastname === ""  || newUser.email === "" || newUser.username === "" || newUser.password === "" || newUser.cpassword === "") {
            dispatch({ type:'EMPTY_FIELDS' });
        } else if (newUser.password !== newUser.cpassword) {
            dispatch({ type:'PASSWORD_DONT_MATCH' })
        } else if (ctr !== 4) {
            dispatch({ type:'PASSWORD_WEAK' })
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(
                newUser.email,
                newUser.password
            )
            .then((response) => {
                fetch('https://ipapi.co/json')
                .then(res => res.json())
                .then(location => {
                    return firestore.collection('users').doc(response.user.uid).set({
                        firstname: newUser.firstname,
                        lastname: newUser.lastname,
                        username: newUser.username,
                        gender: "",
                        sexPref: "",
                        age: 18,
                        bio: "",
                        lati: location.latitude,
                        long: location.longitude,
                        city: location.city,
                        popularity: 0,
                        address: "",
                        tags: [],
                        loggedIn: "",
                        time: new Date(),
                        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm2hIJK-htqNGFQUUtshHh934Z_J3CDlSe9H7UHLWln9by7CoS",
                    })
                })
            })
            .then(() => {
                var user = firebase.auth().currentUser;
                user.sendEmailVerification().then(function() {
                    dispatch({ type:'SIGNUP_SUCCESS' })
                }).catch(function(error) {
                // An error happened.
                });
            }).catch(signup_error => {
                dispatch({ type:'SIGNUP_ERROR', signup_error })
            });
        }
    }
}
