
import { usersAPI } from '../api/usersAPI'
import { UserType } from '../components/common/Types';
import { BaseThunkType, InferActionsType } from '../redux-store/redux-store';
import { actions } from './../actions/usersActions';


type ActionsType = InferActionsType<typeof actions>
export type InitialState = typeof initialState
export type FilterType = typeof initialState.filter
type ThunkType = BaseThunkType<ActionsType>

let initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 4,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // as array user id
    filter: {
        term: '',
        friend: null as null | boolean
    },
    error: ''
}


// getUsers is ThunkCreator function
export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setToggleFetching(true));
        let responce = await usersAPI.apiGetUsers(currentPage, pageSize, filter.term, filter.friend)
        if (responce.totalCount === 0) {
            dispatch(actions.setFilter(filter))
            dispatch(actions.setUsers(responce.items))
            dispatch(actions.getTotalUsersCount(responce.totalCount))
            dispatch(actions.setToggleFetching(false))
            dispatch(actions.noMatchFindUsersError())
        } else {
            dispatch(actions.setToggleFetching(false))
            dispatch(actions.setUsers(responce.items))
            dispatch(actions.getTotalUsersCount(responce.totalCount))
            dispatch(actions.setCurrentUsersPage(currentPage))
            dispatch(actions.setFilter(filter))
        }



    }
}
// unfollow is ThunkCreator function
export const unfollow = (userId: number | null): ThunkType => {
    return async (dispatch) => {
        if (userId) {
            dispatch(actions.toggleFollowingInProgress(true, userId));
            let responce = await usersAPI.apiUnfollow(userId)
            if (responce.resultCode === 0) {
                dispatch(actions.unfollowSuccess(userId))
            }
            dispatch(actions.toggleFollowingInProgress(false, userId));
        }
    }
}
export const follow = (userId: number | null): ThunkType => {
    return async (dispatch) => {
        if (userId) {
            dispatch(actions.toggleFollowingInProgress(true, userId));
            let responce = await usersAPI.apiFollow(userId)
            if (responce.data.resultCode === 0) {
                dispatch(actions.followSuccess(userId))
            }
            dispatch(actions.toggleFollowingInProgress(false, userId));
        }

    }
}

// reducer receives only part of the state required only by this current reducer
const usersReducer = (state = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return { ...user, followed: true }
                    }
                    return user;
                })
            };
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return { ...user, followed: false }
                    }
                    return user;
                })
            };
        case 'SET_USERS':
            return {
                ...state,
                users: [...action.users]
            };
        case 'NO_MATCH_FIND_ERROR':
            return {
                ...state,
                error: action.error
            };
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload
            };
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.page
            }
        case 'GET_USERS_TOTAL_COUNT':
            return {
                ...state,
                totalUsersCount: action.usersCount
            }
        case 'TOGGLE_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'TOGGLE_FOLLOWING_IN_PROGRESS':
            return {
                ...state,
                followingInProgress: action.inProgress ?
                    [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id === action.userId)
            }

        default:
            return state;
    }
}

export default usersReducer;