import React from 'react';
import {NavLink} from "react-router-dom";

import css from './../Dialogs.module.css';


const DialogItem = ({id, name}) => {
    let path = "/dialogs/" + id;

    return <div className={css.dialog + ' ' + css.active}>
        <NavLink to={path}>{name}</NavLink>
    </div>
}

export default DialogItem;