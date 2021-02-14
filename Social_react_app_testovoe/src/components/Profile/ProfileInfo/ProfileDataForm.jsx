import React from 'react';
import {CreateField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import css from "../../common/FormsControls/FormsControls.module.css";
//CreateField возвращает Field с.к.

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        form
        <div><button>save</button></div>
        {error && <div className={css.formCommonError}>
            {error}
        </div>
        }
        <div>
            <b>Full name</b>: {CreateField("Full name", "fullName", [], Input)}
        </div>
        <div>
            <b>Looking for a job</b>: {CreateField("", "lookingForAjob", [], Input, {type: "checkbox"})}
        </div>

        <div>
            <b>My professional skills</b>:
            {CreateField("My professional skills", "lookingForAjobDescription", [], Textarea )}
        </div>
        
        <div>
            <b>About me</b>:
            {CreateField("AboutMe", "aboutMe", [], Textarea )}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return  <div key={key}>
                <b>{key}: {CreateField(key, "contacts." + key, [], Input)}</b>
            </div>
        })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;