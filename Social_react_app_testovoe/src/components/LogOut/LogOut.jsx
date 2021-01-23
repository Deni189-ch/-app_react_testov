import React from 'react';
import s from './LogOut.module.css';
import {NavLink} from "react-router-dom";
import {Button} from "antd";
import 'antd/dist/antd.css';

const LogOut = (props) => {

    return <header className={s.header}>
        <img alt='...loading logo' src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' />

        <div className={s.loginBlock}>
            { props.isAuth
            ? <div> {props.login} <Button type="link" onClick={props.logOut}>Log out</Button> </div>
            : <NavLink to={'/login'}>Login</NavLink> }
        </div>
    </header>
}

export default LogOut;

