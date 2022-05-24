import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalUsersCount, getUsers, getCurrentPage, ifNoMatchFindUsers, getPageSize, getFollowingInProgress } from '../../reducers/users-selectors';
import { FilterType, unfollow } from '../../reducers/usersReducer';
import Paginator from './../common/Paginator/Paginator';
import User from './User/User';
import { UserSearchForm } from './UserSearchForm';
import { requestUsers, follow } from './../../reducers/usersReducer';
import { getUsersFilter } from './../../reducers/users-selectors';
import { useLocation, useNavigate } from 'react-router-dom';
import * as queryString from 'querystring'


type QueryUsersType = {
    page?: string
    term?: string
    friend?: string
}


const Users: React.FC = () => {

    //hooks with using selectors
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const users = useSelector(getUsers)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)
    const emptyUsers = useSelector(ifNoMatchFindUsers)

    const dispatch = useDispatch()
    const history = useNavigate()
    const location = useLocation()


    useEffect(() => {       
        const parsed = queryString.parse(location.search.substr(1)) as QueryUsersType
        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) {
            actualPage = +parsed.page  // convert to number
        }
        if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }

        switch (parsed.friend) {
            case "null":
                actualFilter = { ...actualFilter, friend: null }
                break;
            case "true":
                actualFilter = { ...actualFilter, friend: true }
                break;
            case "false":
                actualFilter = { ...actualFilter, friend: false }
                break;
            default:
                break;
        }
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
        //if(!!parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === 'null'? null: parsed.friend === 'true' ? true : false}
    }, [])

    useEffect(() => {       
        const query: QueryUsersType = {}

        if(!!filter.term) query.term = filter.term
        if(filter.friend !== null) query.friend = String(filter.friend)
        if(currentPage !== 1) query.page = String(currentPage)

        history({ 
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])


    // useEffect(() => {
    //     debugger
    //     if (users.length === 0) {
    //         dispatch(requestUsers(currentPage, pageSize, filter))
    //     }
    // }, [])

    const onPageChanged = (page: number) => {
        dispatch(requestUsers(page, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const following = (userId: number | null) => {
        dispatch(follow(userId))
    }

    const unfollowing = (userId: number | null) => {
        dispatch(unfollow(userId))
    }

    return (
        <div>
            <UserSearchForm
                onFilterChanged={onFilterChanged}
            />
            <Paginator
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
            />
            {users.length ? users.map(user => <User
                key={user.id}
                user={user}
                followingInProgress={followingInProgress}
                unfollow={unfollowing}
                follow={following}
            />) : <h3>{emptyUsers}</h3>}
        </div>
    )
}

export default Users;