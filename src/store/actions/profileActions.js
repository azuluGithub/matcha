export const createChat = (chat) => {
    return (dispatch, getState, { getFirebase , getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('chats').add({
            ...chat,
            createdAt: new Date(),
        }).then(() => {
            dispatch({ type: "CREATE_CHAT", chat });
        }).catch((err) => {
            dispatch({ type: "CREATE_CHAT_ERR", err });
        })
    }
}

export const createProfile = (profile) => {
    return (dispatch, getState, { getFirebase , getFirestore }) => {
    
        const firebase = getFirebase();
        const firestore = getFirestore();
        var user = firebase.auth().currentUser;
        
        const arr = profile.tags.join(" ");
        const array = arr.split(" ");

        if (profile.firstname === "" || profile.lastname ==="" || profile.username ==="" || profile.gender === "" || profile.sexPref ==="" || profile.age ==="" || profile.bio ==="" || profile.tags === "") {
            dispatch({ type:'EMPTY_FIELDS' });
        } else {
            firestore.collection('users').doc(user.uid).update({
                firstname: profile.firstname,
                lastname: profile.lastname,
                username: profile.username,
                gender: profile.gender,
                sexPref: profile.sexPref,
                age: profile.age,
                bio: profile.bio,
                tags: array,
            })
            .then(function() {
                dispatch({ type: "INFO_UPDATE_SUCCESS"});
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                dispatch({ type: "INFO_UPDATE_ERROR", error });
            });
        }
    }
}


export const updateUserEmail = (e_mail) => {
    return (dispatch, getState, { getFirebase }) => {
    
        const firebase = getFirebase();
        var user = firebase.auth().currentUser;

        user.updateEmail(e_mail.email)
        .then(function() {
            dispatch({ type: "EMAIL_UPDATE_SUCCESS"});
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            dispatch({ type: "EMAIL_UPDATE_ERROR", error });
        });
    }
}

export const updateUserPassword = (pass) => {
    return (dispatch, getState, { getFirebase }) => {
    
        const firebase = getFirebase();
        var user = firebase.auth().currentUser;

        var matchedCase = [];
        matchedCase.push("[$@$!%*#?&]");
        matchedCase.push("[A-Z]");    
        matchedCase.push("[0-9]"); 
        matchedCase.push("[a-z]");
        // Check the conditions
        var ctr = 0;
        for (var i = 0; i < matchedCase.length; i++) {
            if (new RegExp(matchedCase[i]).test(pass.password)) {
                ctr++;
            }
        }

        if (pass.password === "") {
            dispatch({ type:'EMPTY_PASSWORD' });
        } else if (ctr !== 4) {
            dispatch({ type:'PASSWORD_WEAK' })
        }
        else {
            user.updatePassword(pass.password)
            .then(function() {
                dispatch({ type: "PASSWORD_UPDATE_SUCCESS"});
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                dispatch({ type: "PASSWORD_UPDATE_ERROR", error });
            });
        }
    }
}

export const viewUser = (viewer_id, viewer_name, viewer_url, viewed_id, viewed_name, viewed_url) => {
    return (dispatch, getState, { getFirebase , getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('views').add({
            viewer_id: viewer_id,
            viewer_name: viewer_name,
            viewer_url: viewer_url,
            viewed_id: viewed_id,
            viewed_name: viewed_name,
            viewed_url: viewed_url,
            createdAt: new Date(),
        }).then(() => {
            dispatch({ type: "VIEW_SUCCESS"});
        }).catch((error) => {
            dispatch({ type: "VIEW_ERROR" });
        })
    }
}

export const likeUser = (liker_id, liker_name, liker_url, liked_id, liked_name, liked_url) => {
    return (dispatch, getState, { getFirebase , getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('likes').add({
            liker_id: liker_id,
            liker_name: liker_name,
            liker_url: liker_url,
            liked_id: liked_id,
            liked_name: liked_name,
            liked_url: liked_url,
            createdAt: new Date(),
        }).then(() => {
            dispatch({ type: "LIKED_SUCCESS"});
        }).catch((error) => {
            dispatch({ type: "LIKED_ERROR" });
        })
    }
}