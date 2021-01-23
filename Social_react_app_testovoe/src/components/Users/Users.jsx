import React from 'react';
import Paginator from "../common/Paginator/paginator";
import User from "./User";
//<Paginator/> отрисовка нумерации юзеров, с.к.
//<User/> отрисовка одного юзера(пользователя, с.к.

let Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {
    return <div>
        <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize}
                   currentPage={currentPage} onPageChanged={onPageChanged}/>
        <div>
            {
                users.map(u => <User users={u}
                                     followingInProgress={props.followingInProgress}
                                     key={u.id}
                                     follow={props.follow}
                                     unfollow={props.unfollow}
                    />
                )
            }
        </div>
    </div>
}

export default Users;