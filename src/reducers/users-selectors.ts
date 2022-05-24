import { AppStateType } from "../redux-store/redux-store"
import { createSelector } from '@reduxjs/toolkit'

//simple selectors
const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}
export const getUsers = createSelector(getUsersSelector,
    (users) => {
        return users.filter(u=> true)
    }
)

export const ifNoMatchFindUsers = (state: AppStateType) => {
    return state.usersPage.error
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}


