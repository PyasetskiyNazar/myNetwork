import { PhotosType, ProfileType } from '../components/common/Types';
import { BaseThunkType, InferActionsType } from '../redux-store/redux-store';
import { profileAPI } from './../api/profileAPI';
import { actions } from './../actions/profileActions';


export type PostsProfileType = {
    id: number
    message: string
    likesCount: number
}
type InitialStateType = typeof initialState
export type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const initialState = {
    posts: [
        { id: 1, message: "Hello Peater", likesCount: 1 },
        { id: 2, message: "Hello Tom", likesCount: 10 },
        { id: 3, message: "How are you?", likesCount: 20 },
        { id: 4, message: "I am fine", likesCount: 8 }
    ] as Array<PostsProfileType>,
    newPostText: "",
    profile: null as ProfileType | null,
    status: "",
    updateProfileError: ""
}

// getUserProfile is ThunkCreator function
export const getUserProfile = (userId: number): ThunkType => {
    return async (dispatch) => {
        const responce = await profileAPI.apiGetUserProfile(userId)
        dispatch(actions.setUserProfile(responce));
    }
}
//is ThunkCreator function
export const getUserStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        const responce = await profileAPI.apiGetStatus(userId)
        dispatch(actions.setUserStatus(responce))
    }
}
//is ThunkCreator function
export const updateUserStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        const responce = await profileAPI.apiUpdateStatus(status)
        if (responce.resultCode === 0) {
            dispatch(actions.setUserStatus(status))
        }
    }
}
export const updateUserPhoto = (photos: PhotosType): ThunkType => {
    return async (dispatch) => {
        const responce = await profileAPI.apiUpdatePhoto(photos)
        if (responce.resultCode === 0) {
            dispatch(actions.setUserPhoto(responce.data.photos))
        }
    }
}
export const updateUserProfile = (profile: ProfileType): ThunkType => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        const responce = await profileAPI.apiUpdateProfile(profile)
        if (responce.resultCode === 0) {
            if(userId !== null){
                dispatch(getUserProfile(userId));
            } else {
                throw new Error("User id can't be null")
            }            
        } else {
            let message = responce.messages[0]
            dispatch(actions.setUpdateProfileError(message))
            return Promise.reject(responce.messages[0])
        }
    }
}

// reducer receives only part of the state required only by this current reducer
const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'profileReducer/ADD-POST':
            const postId = state.posts.length + 1;
            return {
                ...state,
                posts: [...state.posts, { id: postId, message: action.postBody, likesCount: 0 }]
            }
        case 'profileReducer/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'profileReducer/SET_USER_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'profileReducer/SET_USER_PHOTO':
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        case 'profileReducer/SET_UPDATE_PROFILE_ERROR':
            return {
                ...state,
                updateProfileError: action.error
            }
        default:
            return state;
    }
}

export default profileReducer;