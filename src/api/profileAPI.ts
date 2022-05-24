
import { PhotosType, ProfileType } from '../components/common/Types';
import { instance, ResponceType } from './api';

type UpdatePhotosType = {
   photos: PhotosType
}

export const profileAPI = {
   apiGetUserProfile(userId: number) {
      return instance.get<ProfileType>(`profile/` + userId).then(res => res.data)
   },
   apiGetStatus(userId: number) {
      return instance.get<string>(`profile/status/` + userId).then(res => res.data)
   },
   apiUpdateStatus(status: string) {
      return instance.put<ResponceType>(`profile/status`, { status: status }).then(res => res.data)
   },
   apiUpdatePhoto(file: any) {
      const formData = new FormData();
      formData.append("image", file)
      return instance.put<ResponceType<UpdatePhotosType>>(`profile/photo`, formData,
         { headers: { 'content-type': 'multipart/form-data' } })
         .then(res => res.data)
   },
   apiUpdateProfile(profile: ProfileType) {      
      return instance.put<ResponceType>(`profile`, profile).then(res => res.data)
   }
}