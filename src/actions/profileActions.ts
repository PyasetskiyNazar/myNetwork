import { PhotosType, ProfileType } from "../components/common/Types";


export const actions = {
   actionAddPost: (postBody: string) => ({ type: 'profileReducer/ADD-POST', postBody } as const),
   setUserProfile: (profile: ProfileType) => ({ type: 'profileReducer/SET_USER_PROFILE', profile } as const),
   setUserStatus: (status: string) => ({ type: 'profileReducer/SET_USER_STATUS', status } as const),
   setUserPhoto: (photos: PhotosType) => ({ type: 'profileReducer/SET_USER_PHOTO', photos } as const),
   setUpdateProfileError: (error: string) => ({ type: 'profileReducer/SET_UPDATE_PROFILE_ERROR', error } as const)
}