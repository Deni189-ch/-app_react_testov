import {getAuthUserData} from "./auth-reducer";
const SET_INITIALIZATION = 'SET_INITIALIZATION';

export type InitialStateType = {
    initialization: boolean
}

let initialState: InitialStateType = {
    initialization: false
};

const appReducer = (state = initialState, action: any): InitialStateType => {
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

type InitializAppSuccessActionType = {
    type: typeof SET_INITIALIZATION;
}
export const initializAppSuccess = (): InitializAppSuccessActionType => ({ type: SET_INITIALIZATION })

export const initializApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())

    Promise.all([promise])
        .then(() => {
                dispatch(initializAppSuccess());
        });
};

export default appReducer;