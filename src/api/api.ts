import axios from "axios";
import { UserType } from "../components/common/Types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: { 'API-KEY': '517a38fc-8456-43d9-8af2-06742bd16c08' }

})
export type ResponceType<D = {}, RC = ResultCodes> = {
    data: D
    resultCode: RC
    messages: Array<string>
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export enum ResultCodes {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}
type CaptchaUrlType = {
    url: string
}

export const sequrityAPI = {
    getCaptchaUrl() {
        return instance.get<CaptchaUrlType>(`security/get-captcha-url`)
        .then(res => res.data)
    }
}


