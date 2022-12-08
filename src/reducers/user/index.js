import {
    USER_LOGIN,
    USER_LOGIN_GOOGLE,
    USER_REGISTER,
    USER_LOGOUT,
    CURRENT_USER
} from "../../actions/UserAction";

export const initialState = {
    userLoginResult: false,
    userLoginError: false,
    userLoginLoading: false,
    userRegisterResult: false,
    userRegisterError: false,
    userRegisterLoading: false,
    currentUserData: false,
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                userLoginResult: action.payload.data,
                userLoginError: action.payload.errorMessage,
                userLoginLoading: action.payload.loading
            }
        case USER_LOGIN_GOOGLE:
            return {
                ...state,
                userLoginResult: action.payload.data,
                userLoginError: action.payload.errorMessage,
                userLoginLoading: action.payload.loading
            }
        case USER_REGISTER:
            return {
                ...state,
                userRegisterResult: action.payload.data,
                userRegisterError: action.payload.errorMessage,
                userRegisterLoading: action.payload.loading
            }
        case USER_LOGOUT:
            return initialState
        case CURRENT_USER:
            return {
                ...state,
                currentUserData: action.payload.data,
                userLoginError: action.payload.errorMessage,
                userLoginLoading: action.payload.loading
            }
        default:
            return state
    }
}

export default user