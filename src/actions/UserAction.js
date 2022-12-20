import axios from "axios"

export const USER_LOGIN = "USER_LOGIN"
export const USER_LOGIN_GOOGLE = "USER_LOGIN_GOOGLE"
export const USER_LOGOUT = "USER_LOGOUT"
export const CURRENT_USER = "CURRENT_USER"
export const USER_REGISTER = "USER_REGISTER"

export const actionUserRegister = (body) => {
    return (dispatch) => {
        dispatch({
            type: USER_REGISTER,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        axios({
            method: 'POST',
            url: 'https://api-ticket.up.railway.app/v2/user/register',
            timeout: 120000,
            data: body
        })
            .then((response) => {
                dispatch({
                    type: USER_REGISTER,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false
                    }
                })
            })
            .catch((err) => {
                dispatch({
                    type: USER_REGISTER,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: err.response.data.message
                    }
                })
            })
    }
}

export const actionUserLogin = (body) => {
    return (dispatch) => {
        dispatch({
            type: USER_LOGIN,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        axios({
            method: 'POST',
            url: 'http://localhost:8010/v2/user/login',
            timeout: 120000,
            data: body
        })
            .then((response) => {
                localStorage.setItem("token", response.data.token)
                dispatch({
                    type: USER_LOGIN,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false
                    }
                })
            })
            .catch((err) => {
                dispatch({
                    type: USER_LOGIN,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: err.response.data.message
                    }
                })
            })
    }
}

export const actionUserLoginWithGoogle = (token) => {
    return (dispatch) => {
        dispatch({
            type: USER_LOGIN_GOOGLE,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        axios({
            method: 'POST',
            url: 'https://api-ticket.up.railway.app/v2/user/login-google',
            timeout: 120000,
            data: token
        })
            .then((response) => {
                localStorage.setItem("token", response.data.token)
                
                dispatch({
                    type: USER_LOGIN_GOOGLE,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false
                    }
                })
            })
            .catch((err) => {
                dispatch({
                    type: USER_LOGIN_GOOGLE,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: err.response.data.message
                    }
                })
            })
    }
}

export const actionUserLogout = () => {
    return (dispatch) => {
        localStorage.removeItem("token")
        dispatch({
            type: USER_LOGOUT,
            payload: {
                loading: false,
                data: false,
                errorMessage: false
            }
        })
    }
}

export const actionCurrentUser = (token) => {
    return (dispatch) => {
        dispatch({
            type: CURRENT_USER,
            payload: {
                loading: false,
                data: false,
                errorMessage: false
            }
        })

        axios({
            method: 'GET',
            url: 'http://localhost:8010/v1/user/current',
            timeout: 120000,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                dispatch({
                    type: CURRENT_USER,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false
                    }
                })
            })
            .catch((err) => {
                dispatch({
                    type: CURRENT_USER,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: err.message
                    }
                })
            })
    }
}