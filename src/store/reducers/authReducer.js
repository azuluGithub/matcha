const initState = {
    auth_signup_error: null,
    auth_login_error: null,
    auth_reset_email_error: null
}

const authReducer = (state = initState, action) => {

    switch(action.type){

        case 'SENT_EMAIL_SUCCESS':
            console.log("password reset email sent successfully");
            return {
                ...state,
                auth_reset_email_error: "password reset email sent successfully"
            }

        case 'SENT_EMAIL_FAILURE':
            console.log("reset password email failure");
            return {
                ...state,
                auth_reset_email_error: action.email_error.message
            }

        case 'PASSWORD_DONT_MATCH':
            console.log("password must be greater than 6 characters");
            return {
                ...state,
                auth_signup_error: "passwords don't match"
            }

        case 'PASSWORD_WEAK':
            console.log("Password must have: [A-Z], [0-9], [a-z] and [$@$!%*#?&]");
            return {
                ...state,
                auth_signup_error: "Password must have: [A-Z], [0-9], [a-z] and [$@$!%*#?&]"
            }
            
        case 'EMPTY_FIELDS':
            console.log("fill in all fields");
            return {
                ...state,
                auth_signup_error: "fill in all fields"
            }

        case 'SIGNUP_SUCCESS':
            console.log('signup success');
            return {
                ...state,
                auth_signup_error: "verify your email inorder to log in"
            } 

        case 'SIGNUP_ERROR':
            console.log('signup error');
            return {
                ...state,
                auth_signup_error: action.signup_error.message,
            }

        case 'LOGIN_ERROR':
            console.log('login error');
            return {
                ...state,
                auth_login_error: action.login_error.message //"login error, enter valid email and password"
            }

        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {
                    ...state,
                    auth_login_error: "if you cant log in, please check if your email is verified"
            }
    
        case 'SIGNOUT_SUCCESS':
            console.log('signout success');
            return state;
    
        default:
            return state;
    }
}

export default authReducer;