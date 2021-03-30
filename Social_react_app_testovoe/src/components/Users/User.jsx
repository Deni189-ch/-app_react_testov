import React from "react";
import { NavLink } from "react-router-dom";
import userPhoto from "../../assets/images/user.png";

import { Button } from "antd";
import styles from "./users.module.css";
// отдельный юзер (пользователь)

let User = ({ users, followingInProgress, unfollow, follow }) => {
  return (
    <div>
      <span>
        <div>
          <NavLink to={"/profile/" + users.id}>
            <img
              alt={"...loading img"}
              src={users.photos.small != null ? users.photos.small : userPhoto}
              className={styles.userPhoto}
            />
          </NavLink>
        </div>
        <div>
          {users.followed ? (
            <Button
              type="primary"
              disabled={followingInProgress.some((id) => id === users.id)}
              onClick={() => {
                unfollow(users.id);
              }}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              type="primary"
              disabled={followingInProgress.some((id) => id === users.id)}
              onClick={() => {
                follow(users.id);
              }}
            >
              Follow
            </Button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{users.name}</div>
          <div>{users.status}</div>
        </span>
      </span>
    </div>
  );
};

export default User;
