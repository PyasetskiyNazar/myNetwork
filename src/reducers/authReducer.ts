import { ResultCodes, sequrityAPI } from './../api/api';
import { authAPI } from './../api/authAPI';
import { BaseThunkType, InferActionsType } from '../redux-store/redux-store';
import { actions } from './../actions/authActions';


type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
export type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
    loginError: string | null   
}

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
    loginError: null
}



export const getAuth = (): ThunkType => async (dispatch) => {
    let responce = await authAPI.apiAuth();    
    if (responce.resultCode === ResultCodes.Success) {
        let { id, email, login } = responce.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => {
    return async (dispatch) => {
        const responce = await authAPI.login(email, password, rememberMe, captcha);
        if (responce && responce.resultCode === ResultCodes.Success) {
            dispatch(getAuth());
        } else {
            if (responce.resultCode === ResultCodes.CaptchaIsRequired) {
                dispatch(actions.setLoginError(responce.messages[0]))
                dispatch(getCapchaUrl())
                dispatch(getAuth());
            }
            dispatch(actions.setLoginError(responce.messages[0]))
        }
    }
}

export const getCapchaUrl = (): ThunkType => {
    return async (dispatch) => {
        const responce = await sequrityAPI.getCaptchaUrl();
        const captchaUrl = responce.url;
        dispatch(actions.setCaptchaUrl(captchaUrl))
    }
}

//has no response from the server
export const logOut = (): ThunkType => {
    return async (dispatch) => {
        await authAPI.logout();
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

// reducer receives only part of the state required only by this current reducer
const authReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'authReducer/SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            };
        case 'authReducer/GET_CAPTCHA_URL':
            return {
                ...state,
                captchaUrl: action.payload.captchaUrl
            };
        case 'authReducer/SET_LOGIN_ERROR':
            return {
                ...state,
                loginError: action.error
            }
        default:
            return state;
    }
}

export default authReducer;