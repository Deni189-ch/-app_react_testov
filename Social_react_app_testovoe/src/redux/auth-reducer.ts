import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_CAPTCHA_DATA = 'me/auth/SET_CAPTCHA_DATA';


let initialState = {
    userId: null as  number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
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
type SetAuthUserDataDataType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataType = {
    type: typeof SET_USER_DATA,
    data: SetAuthUserDataDataType
}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataType => ({
    type: SET_USER_DATA, data: {userId, email, login, isAuth}
})
type SetAuthCaptchaDataType = {
    type: typeof SET_CAPTCHA_DATA,
    captchaUrl: string
}
export const setAuthCaptchaData = (captchaUrl: string): SetAuthCaptchaDataType => ({type: SET_CAPTCHA_DATA, captchaUrl})


export const getAuthUserData = () => async (dispatch: any) => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        const {id, password, email} = response.data.data;
        dispatch(setAuthUserData(id, email, password, true))
    }
};
//thunk Captcha
export const getAuthCaptchaData = () => async (dispatch: any) => {
    const response = await authAPI.captcha()
    const captchaUrl = response.data.url;
        dispatch(setAuthCaptchaData(captchaUrl))
};
//Данные из формы логина, вход в акаунт
//Если ответ = 10, запускаем санку на запрос каптчи
export const loginAuthUserData = (email: string, password: string, rememberMe: boolean, captcha=null) => async (dispatch: any) => {
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
export const logOut = () => async (dispatch: any) => {
    debugger
    const response = await authAPI.logOut()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;