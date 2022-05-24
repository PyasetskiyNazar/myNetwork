import { UserType } from "../components/common/Types";
import { FilterType } from "../reducers/usersReducer";

export const actions = {
    followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
    setCurrentUsersPage: (page: number) => ({ type: 'SET_CURRENT_PAGE', page } as const),
    setFilter: (filter: FilterType) => ({ type: 'SET_FILTER', payload: filter } as const),
    getTotalUsersCount: (usersCount: number) => ({ type: 'GET_USERS_TOTAL_COUNT', usersCount } as const),
    setToggleFetching: (isFetching: boolean) => ({ type: 'TOGGLE_FETCHING', isFetching } as const),
    toggleFollowingInProgress: (inProgress: boolean, userId: number) =>
        ({ type: 'TOGGLE_FOLLOWING_IN_PROGRESS', inProgress, userId } as const),
    noMatchFindUsersError: () => ({ type: 'NO_MATCH_FIND_ERROR', error : 'No match find any users by this query' } as const)    
}