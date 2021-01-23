import React, {useState} from 'react';
import css from './ProfileInfo.module.css';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import logo from '../../../assets/images/user.png'
import {Image} from 'antd';
import 'antd/dist/antd.css';
import {Radio} from 'antd';
import { Spin } from 'antd';
import 'antd/dist/antd.css';

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Spin />
    }

    if (!profile.photos.large) {
        profile.photos.large = logo
    }

    const onMainPhotoSelectid = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );
    }

    return (
        <div>
            <div className={css.descriptionBlock}>
                <Image
                    width={200}
                    src={profile.photos.large}
                />
                {isOwner && <div><input type={"file"} onChange={onMainPhotoSelectid}/></div>}

                {editMode
                    ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => {
                        setEditMode(true)
                    }} profile={profile} isOwner={isOwner}/>}

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}

export const Contact = ({contactTitle, contactValue}) => {
    return <div className={css.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

//Форма редактирования, заполнение инф-и профиля.
const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner &&
        <div>
            <Radio.Button value="small" onClick={goToEditMode}>edit</Radio.Button>
        </div>
        }

        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAjob ? "yes" : "no"}
        </div>
        {profile.lookingForAjob &&
        <div>
            <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>about me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
    </div>
};

export default ProfileInfo;




