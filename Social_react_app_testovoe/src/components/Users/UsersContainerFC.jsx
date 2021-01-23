import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {
    follow,
    setCurrentPage,
    unfollow, toggleFollowingProgress, getUsers
} from '../../redux/users-reducer';
import Users from './Users';
import {compose} from "redux";
import {
    getUsersPage,
    getCurrentPage,
    getPageSize,
    getTotalUsersCount,
    getFollowingInProgress,
    getIsFetching
} from "../../redux/users-selectors";
import {Spin} from "antd";
import { Spin } from 'antd';
import 'antd/dist/antd.css';

const UsersContainerFC = (props) => {
    useEffect(() => {
        const {currentPage, pageSize} = props;
        props.getUsers(currentPage, pageSize);
    }, [])
    const onPageChanged = (pageNumber) => {
        const {pageSize} = props;
        props.getUsers(pageNumber, pageSize);
    }
    return (
        <>
            {this.props.isFetching ? <Spin /> : null}
            <Users totalUsersCount={props.totalUsersCount}
                   pageSize={props.pageSize}
                   currentPage={props.currentPage}
                   onPageChanged={onPageChanged}
                   users={props.users}
                   follow={props.follow}
                   unfollow={props.unfollow}
                   followingInProgress={props.followingInProgress}
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
)(UsersContainerFC)