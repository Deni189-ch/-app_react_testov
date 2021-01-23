import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_CAPTCHA_DATA = 'me/auth/SET_CAPTCHA_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
        case SET_CAPTCHA_DATA:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state;
    }
}
export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA, data: {userId, email, login, isAuth}
})
export const setAuthCaptchaData = (captchaUrl) => ({type: SET_CAPTCHA_DATA, captchaUrl})

export const getAuthUserData = () => async (dispatch) => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        const {id, password, email} = response.data.data;
        dispatch(setAuthUserData(id, email, password, true))
    }
};
//thunk Captcha
export const getAuthCaptchaData = () => async (dispatch) => {
    const response = await authAPI.captcha()
    const captchaUrl = response.data.url;
        dispatch(setAuthCaptchaData(captchaUrl))
};
//Данные из формы логина, вход в акаунт
//Если ответ = 10, запускаем санку на запрос каптчи
export const loginAuthUserData = (email, password, rememberMe, captcha=null) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if(response.data.resultCode === 10) {
            dispatch(getAuthCaptchaData());
        }
        const messages = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: messages}))
    }
};
//Выход из акаунта
export const logOut = () => async (dispatch) => {
    debugger
    const response = await authAPI.logOut()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;