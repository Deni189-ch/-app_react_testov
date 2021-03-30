import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import {
    follow,
    setCurrentPage,
    unfollow, toggleFollowingProgress, getUsers
} from '../../redux/users-reducer';
import {
    getUsersPage,
    getCurrentPage,
    getPageSize,
    getTotalUsersCount,
    getFollowingInProgress,
    getIsFetching
} from "../../redux/users-selectors";

import Users from './Users';
import {Spin} from "antd";


const UsersContainerFC = ({getUsers, currentPage, pageSize, totalUsersCount, users, followingInProgress }) => {
    useEffect(() => {
       getUsers(currentPage, pageSize);
    }, [])
    const onPageChanged = (pageNumber) => {
        getUsers(pageNumber, pageSize);
    }
    return (
        <>
            {this.props.isFetching ? <Spin /> : null}
            <Users totalUsersCount={totalUsersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   onPageChanged={onPageChanged}
                   users={users}
                   follow={follow}
                   unfollow={unfollow}
                   followingInProgress={followingInProgress}
            />
        </>
    )
}

let mapStateToProps = (state) => {
    return {
        users: getUsersPage(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers})
)(UsersContainerFC);