import { instance, ResponceType } from './api';

type AuthResponceDataType = {
   id: number
   email: string
   login: string
}

type LoginResponceType = {
   userId: number
}

export const authAPI = {
   apiAuth() {
      return instance.get<ResponceType<AuthResponceDataType>>(`auth/me`).then(responce => responce.data)
   },
   login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
      return instance.post<ResponceType<LoginResponceType>>(`auth/login`, { email, password, rememberMe, captcha })
         .then(res => res.data)
   },
   logout() {
      return instance.delete(`auth/login`)
   }
}