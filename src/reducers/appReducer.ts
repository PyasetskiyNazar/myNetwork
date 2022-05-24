import { BaseThunkType, InferActionsType } from '../redux-store/redux-store';
import { getAuth } from './authReducer';
import { actions } from './../actions/appActions';

type ActionsType = InferActionsType<typeof actions>
export type InitialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionsType>

let initialState = {
    initialisation: false
}

export const initializationSuccess = () => async (dispatch: any) => {
    let promise = await dispatch(getAuth());
    Promise.all([promise])
        .then(() => {
            dispatch(actions.setInitialization())
        })
}

// reducer receives only part of the state required only by this current reducer
const appReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'APP/SET_INITIALIZATION':
            return {
                ...state,
                initialisation: true
            };
        default:
            return state;
    }
}

export default appReducer;