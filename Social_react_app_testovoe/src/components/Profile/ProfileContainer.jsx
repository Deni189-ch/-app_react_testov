import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import Profile from "./Profile";


class ProfileContainer extends React.Component {

    reFreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId
            if(!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId)
    };

    componentDidMount() {
        this.reFreshProfile()
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.match.params.userId !== prevProps.match.params.userId)
        this.reFreshProfile()
    }

    render() {
        return (
            <Profile {...this.props}
                    isOwner={!this.props.match.params.userId}
                     updateStatus={this.props.updateStatus}
                     status={this.props.status}
                     savePhoto={this.props.savePhoto} />
        )
    }
}

let mapStateToProps = (state) => {
    return ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    savePhoto: state.profilePage.savePhoto,
    })
};

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter
)(ProfileContainer);




