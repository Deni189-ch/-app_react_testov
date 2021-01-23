import {getAuthUserData} from "./auth-reducer";
const SET_INITIALIZATION = 'SET_INITIALIZATION';

let initialState = {
    initialization: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZATION:
            return {
                ...state,
                initialization: true
            }
        default:
            return state;
    }
}

export const initializAppSuccess = () => ({ type: SET_INITIALIZATION })

export const initializApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData())

    Promise.all([promise])
        .then(() => {
                dispatch(initializAppSuccess());
        });
};

export default appReducer;