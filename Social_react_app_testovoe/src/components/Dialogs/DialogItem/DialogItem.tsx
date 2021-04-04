import React from 'react';
import {NavLink} from "react-router-dom";

import css from './../Dialogs.module.css';

type DialogItemType = {
    id: number
    name: string
}

const DialogItem: React.FC<DialogItemType> = ({id, name}) => {
    let path = "/dialogs/" + id;

    return <div className={css.dialog + ' ' + css.active}>
        <NavLink to={path}>{name}</NavLink>
    </div>
}

export default DialogItem;