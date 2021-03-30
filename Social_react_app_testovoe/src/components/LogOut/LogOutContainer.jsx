import React from 'react';
import {connect} from "react-redux";

import LogOut from "./LogOut";
import {logOut} from "../../redux/auth-reducer";

class LogOutContainer extends React.Component {

    render() {
        return <LogOut {...this.props} />
    }
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, {logOut})(LogOutContainer);

// HeaderContainer