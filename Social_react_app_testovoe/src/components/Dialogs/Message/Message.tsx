import React from 'react';
import css from './../Dialogs.module.css';

type MessageType = {
  message: string
}
const Message: React.FC<MessageType> = ({message}) =>  <div className={css.dialog}>{message}</div>

export default Message;