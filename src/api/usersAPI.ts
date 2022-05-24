import { GetItemsType, instance, ResponceType } from './api';

export const usersAPI = {
    apiGetUsers(currentPage = 1, pageSize = 4, term = '', friend: null | boolean) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` 
        + (friend === null ? '' : `&friend=${friend}`))
            .then(responce => (responce.data))
    },
    apiFollow(userId: number) {
        return instance.post<ResponceType>(`follow/${userId}`)
    },
    apiUnfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<ResponceType>
    }
}