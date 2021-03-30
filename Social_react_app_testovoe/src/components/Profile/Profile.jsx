import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = ({isOwner, savePhoto, profile, status, updateStatus, saveProfile}) => {
    return (
        <div>
            <ProfileInfo isOwner={isOwner}
                         savePhoto={savePhoto}
                         profile={profile}
                         status={status}
                         updateStatus={updateStatus}
                         saveProfile={saveProfile} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;