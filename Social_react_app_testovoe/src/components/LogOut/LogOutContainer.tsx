import React from 'react';
import {connect} from "react-redux";

import LogOut from "./LogOut";
import {logOut} from "../../redux/auth-reducer";

class LogOutContainer extends React.Component {

    render() {
        return <LogOut {...this.props} /> //login={this.props.login} isAuth={this.props.isAuth} logOut={logOut}
    }
}
const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, {logOut})(LogOutContainer);

// HeaderContainer