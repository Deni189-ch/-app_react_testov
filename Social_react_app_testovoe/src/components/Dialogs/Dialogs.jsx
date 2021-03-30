import React from 'react';
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";

import {MaxLengthCreator, required} from "../../utils/validator/Validarors";
import {Textarea} from "../common/FormsControls/FormsControls";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

import css from './Dialogs.module.css';


const maxLength = MaxLengthCreator(30)
const AddMessageForm = ({handleSubmit}) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder='Enter your message'
                       component={Textarea}
                       validate={[required, maxLength]}
                       name='newMessageBody'>
                </Field>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
};

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);


const Dialogs = ({dialogsPage, isAuth, sendMessage}) => {

    let state = dialogsPage;

    let dialogsElements = state.dialogs.map(({id, name}) => <DialogItem name={name} key={id} id={id}/>);
    let messagesElements = state.messages.map(({id, message}) => <Message message={message} key={id}/>);

    if (!isAuth) return <Redirect to={"/login"}/>;

    const onSendMessage = (formData) => {
        sendMessage(formData.newMessageBody);
    }

    return (
        <div className={css.dialogs}>
            <div className={css.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={css.messages}>
                <div>{messagesElements}</div>

                <AddMessageFormRedux  onSubmit={onSendMessage} />
            </div>
        </div>
    )
}

export default Dialogs;
























