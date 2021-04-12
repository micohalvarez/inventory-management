import * as actionTypes from '../actions/AuthActions/actionTypes'

const initialState = {
    signedIn: false,
    authToken: null,
    tokenExpiry: null,
    user: null,
    loggingIn: false,
    error: []
}

const data = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_START:
            return {
                ...state,
                loggingIn: true,
                errors: null
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                errors: null
            }
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                loggingIn: false,
                errors: null
            }
        case actionTypes.UPDATE_AUTH_STATE:
            return {
                ...state,
                signedIn: action.payload.signedIn,
                authToken: action.payload.authToken,
                user: action.payload.user
            }
        case actionTypes.UPDATE_USER:
            return {
                ...state,
                user: action.payload.user
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                signedIn: false,
                signInType: null,
                authToken: null,
                tokenExpiry: null,
                user: null
            }

        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            }

        default:
            return state
    }
}

export default data
