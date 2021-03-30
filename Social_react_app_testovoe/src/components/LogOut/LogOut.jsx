import React from 'react';
import {NavLink} from "react-router-dom";

import {Button} from "antd";
import css from './LogOut.module.css';

const LogOut = ({isAuth, login, logOut}) => {

    return <header className={css.header}>
        <img alt='...loading logo' src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' />

        <div className={css.loginBlock}>
            { isAuth
            ? <div> {login} <Button type="link" onClick={logOut}>Log out</Button> </div>
            : <NavLink to={'/login'}>Login</NavLink> }
        </div>
    </header>
}

export default LogOut;

