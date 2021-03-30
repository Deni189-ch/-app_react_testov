import React from 'react';
import css from './../Dialogs.module.css';


const Message = ({message}) =>  <div className={css.dialog}>{message}</div>

export default Message;