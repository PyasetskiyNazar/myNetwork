import { createStore, combineReducers, applyMiddleware, compose, Action } from 'redux'
import profileReducer from '../reducers/profileReducer';
import dialogsReducer from '../reducers/dialogsReducer';
import sidebarReducer from '../reducers/sidebarReducer';
import usersReducer from '../reducers/usersReducer';
import authReducer from '../reducers/authReducer';
import thunkMiddleware from 'redux-thunk'
import appReducer from './../reducers/appReducer';
import { ThunkAction } from 'redux-thunk'
import chatReducer from './../reducers/chatReduser';


let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsMessages: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  initialize: appReducer,
  chat: chatReducer
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
export type InferActionsType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunkMiddleware)
));

//let store = createStore(reducers, applyMiddleware(thunkMiddleware));
// @ts-ignore
window._store_ = store;

export default store;