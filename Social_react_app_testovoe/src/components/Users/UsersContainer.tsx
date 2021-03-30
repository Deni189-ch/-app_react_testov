import React from 'react';
import {compose} from "redux";
import {connect} from 'react-redux';
import {follow,unfollow, getUsers} from '../../redux/users-reducer';
import Users from './Users';
import {
    getUsersPage,
    getCurrentPage,
    getPageSize,
    getTotalUsersCount,
    getFollowingInProgress,
    getIsFetching
} from "../../redux/users-selectors";

import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';
import { Spin } from 'antd';


type MapStatePropsType = {
    pageSize: number
    currentPage: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>    
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void   
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Spin /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
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
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {follow, unfollow, getUsers})
)(UsersContainer)