const initState =  {
    auth_update_email_err: null,
    auth_update_password_err: null,
    auth_update_profile_err: null,
}

const profileReducer = (state = initState, action) => {
    switch(action.type) {

        case 'VIEW_SUCCESS':
            console.log('viewed successfully');
            return state;

        case 'VIEW_ERROR':
            console.log('view failed');
            return state;

        case 'LIKED_SUCCESS':
            console.log('liked successfully');
            return state;
    
        case 'LIKED_ERROR':
            console.log('like failed');
            return state;

        case 'INFO_UPDATE_SUCCESS':
            console.log('user info updated successfully');
            return {
                ...state,
                auth_update_profile_err: "info update successful"
            }

        case 'AGE_INVALID':
            console.log('Age must be a number');
            return {
                ...state,
                auth_update_profile_err: 'Age must be a number'
            }

        case 'EMPTY_FIELDS':
            console.log("Cannot update empty fields");
            return {
                ...state,
                auth_update_profile_err: "Cannot update empty fields"
            }

        case 'INFO_UPDATE_ERROR':
            console.log('error encountered while updating info', action.error);
            return state;

        case 'EMAIL_UPDATE_SUCCESS':
            console.log('email updated successfully');
            return {
                ...state,
                auth_update_email_err: "email update successful"
            }

        case 'EMAIL_UPDATE_ERROR':
            console.log('error encountered while updating email', action.error);
            return {
                ...state,
                auth_update_email_err: action.error.message
            }

        case 'PASSWORD_WEAK':
            console.log("Password must have: [A-Z], [0-9], [a-z] and [$@$!%*#?&]");
            return {
                ...state,
                auth_update_password_err: "Password must have: [A-Z], [0-9], [a-z] and [$@$!%*#?&]"
            }
                
        case 'EMPTY_PASSWORD':
            console.log("Password field must not be empty");
            return {
                ...state,
                auth_update_password_err: "Password field must not be empty"
            }

        case 'PASSWORD_UPDATE_SUCCESS':
            console.log('password updated successfully');
            return {
                ...state,
                auth_update_password_err: "password update successful"
            }
    
        case 'PASSWORD_UPDATE_ERROR':
            console.log('error encountered while updating password', action.error);
            return {
                ...state,
                auth_update_password_err: action.error.message
            }

        case 'CREATE_CHAT':
            console.log('chat created', action.chat);
            return state;

        case 'CREATE_CHAT_ERR':
            console.log('chat create error', action.err);
            return state;
        default:
            return state;
    }
}

export default profileReducer;