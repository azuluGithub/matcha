export const createChat = (sender_message, sender_Id, receiver_Id) => {
    return (dispatch, getState, { getFirebase , getFirestore }) => {
        const firestore = getFirestore();
        if (sender_Id === "" || receiver_Id === "") {
            dispatch({ type:'INVALID_SENDER_OR_RECIPIENT' });
        } else {
            firestore.collection('chats').add({
                sender_message: sender_message,
                sender_Id: sender_Id,
                receiver_Id: receiver_Id,
                chat_status: "unread",
                createdAt: new Date(),
            }).then(() => {
                dispatch({ type: "CREATE_CHAT" });
            }).catch((err) => {
                dispatch({ type: "CREATE_CHAT_ERR", err });
            })
        }
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
        } else if (!(Number(profile.age))) {
            dispatch({ type:'AGE_INVALID' });
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

export const viewUser = (viewer_id, viewed_id, view_status) => {
    return (dispatch, getState, { getFirebase , getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('views').add({
            viewer_id: viewer_id,
            viewed_id: viewed_id,
            view_status: view_status,
            createdAt: new Date(),
        }).then(() => {
            dispatch({ type: "VIEW_SUCCESS"});
        }).catch((error) => {
            dispatch({ type: "VIEW_ERROR" });
        })
    }
}

export const updateViewUser = (views_id, view_status) => {
    return (dispatch, getState, { getFirebase , getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('views').doc(views_id).update({
            view_status: view_status,
            createdAt: new Date(),
        }).then(() => {
            dispatch({ type: "VIEW_SUCCESS"});
        }).catch((error) => {
            dispatch({ type: "VIEW_ERROR" });
        })
    }
}

export const updateLikeUser = (likes_id, like_status) => {
    return (dispatch, getState, { getFirebase , getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('likes').doc(likes_id).update({
            like_status: like_status,
            createdAt: new Date(),
        }).then(() => {
            dispatch({ type: "LIKES_SUCCESS"});
        }).catch((error) => {
            dispatch({ type: "LIKES_ERROR" });
        })
    }
}

export const likeUser = (liker_id, liked_id, new_popularity, delete_unlike_id) => {
    return (dispatch, getState, { getFirebase , getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('likes').add({
            liker_id: liker_id,
            liked_id: liked_id,
            like_status: "unread",
            createdAt: new Date(),
        }).then(() => {
            firestore.collection('users').doc(liked_id).update({
                popularity: new_popularity,
            })
        }).then(() => {
            firestore.collection("unLikes").doc(delete_unlike_id).delete()
        }).then(() => {
            dispatch({ type: "LIKED_SUCCESS"});
        }).catch((error) => {
            dispatch({ type: "LIKED_ERROR" });
        })
    }
}

export const unLikeUser = (unLiker_id, unLiked_id, delete_id, delete_match_id) => {
    return (dispatch, getState, { getFirebase , getFirestore }) => {
        const firestore = getFirestore();
        return firestore.collection('unLikes').add({
            unLiker_id: unLiker_id,
            unLiked_id: unLiked_id,
            unlike_status: "unread",
            createdAt: new Date(),
        }).then(() => {
            firestore.collection("likes").doc(delete_id).delete()
        }).then(() => {
            firestore.collection("matches").doc(delete_match_id).delete()
        }).then(() => {
            dispatch({ type: "UNLIKED_SUCCESS"});
        }).catch((error) => {
            dispatch({ type: "UNLIKED_ERROR" });
        })
    }
}

export const matchUser = (liker_id, liked_id) => {
    return (dispatch, getState, { getFirebase , getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('matches').add({
            liker_id: liker_id,
            liked_id: liked_id,
            match_status: "unread",
            createdAt: new Date(),
        }).then(() => {
            dispatch({ type: "MATCHED_SUCCESS"});
        }).catch((error) => {
            dispatch({ type: "MATCHED_ERROR" });
        })
    }
}

export const blockUser = (blocker_id, blocked_id) => {
    return (dispatch, getState, { getFirebase , getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('blocks').add({
            blocker_id: blocker_id,
            blocked_id: blocked_id,
            createdAt: new Date(),
        }).then(() => {
            dispatch({ type: "BLOCKED_SUCCESS"});
        }).catch((error) => {
            dispatch({ type: "BLOCKED_ERROR" });
        })
    }
}