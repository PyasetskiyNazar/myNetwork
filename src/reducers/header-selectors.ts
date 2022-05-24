import { AppStateType } from "../redux-store/redux-store"


//simple selectors


export const selectIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}

export const selectLogin = (state: AppStateType) => {
  return state.auth.login
}

export const selectEmail = (state: AppStateType) => {
  return state.auth.email
}

