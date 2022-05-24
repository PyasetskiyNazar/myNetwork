import React from 'react';
import Users from '../components/Users/Users';
import { useSelector } from 'react-redux';
import { getIsFetching } from './../reducers/users-selectors';
import Preloader from '../components/common/Preloader/Preloader';

const UsersPage: React.FC = () => {
    const isFetching = useSelector(getIsFetching)

    return (
        <>
            {isFetching ? <Preloader /> : null}            
            <Users />
        </>
    )
}

export default UsersPage;
