import React from 'react';
import './App.css';
import {BrowserRouter, Route, withRouter, Redirect, Switch, NavLink} from "react-router-dom";
import LogOutContainer from "./components/LogOut/LogOutContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializApp} from "./redux/app-reducer";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
import UsersContainer from "./components/Users/UsersContainer";
//Ant Design
import { Spin } from 'antd';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
const { Header, Sider, Content } = Layout;


//<Route path='/profile/:userId?' userId- номер id пользователя.

//import DialogsContainer from "./components/Dialogs/DialogsContainer";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
//import ProfileContainer from "./components/Profile/ProfileContainer";
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


class App extends React.Component {

    // Можно открыть перехватчик ошибок---------
    // catchAllUnhandledErrors = (props) => {
    //     alert("Some error occured")
    //     //console.error(promiseRejectionEvent)
    // }
    //-------------------------------------------

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    componentDidMount() {
        this.props.initializApp();
        //перехватываем ошибки promis.
        // window.addEventListener('unhandledRejection', this.catchAllUnhandledErrors);
        window.addEventListener("unhandledrejection", event => {
            alert(`error: ${event.reason}`)
            console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
        });
    }
    componentWillUnmount() {
        window.removeEventListener('unhandledRejection', this.catchAllUnhandledErrors);

    }

    render() {
        if (!this.props.initialization) {
            return <Spin/>
        }
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                                <NavLink to="/profile" >Profile</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                            <NavLink to="/dialogs" >Messages</NavLink>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined />}>
                            <NavLink to="/users" >Users</NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        <LogOutContainer />
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}

                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Switch>
                            <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>

                            <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>

                            <Route path='/users'
                                   render={() => <UsersContainer />}/>

                            <Route path='/login'
                                   render={() => <LoginPage/>}/>

                            <Route exact path='/'
                                   render={() => <Redirect from='/' to='/profile'/>}/>
                            <Route path='*'
                                   render={() => <div>404 NOT FOUND</div>}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => ({
    initialization: state.app.initialization
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializApp}))(App);

const MainApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
};

export default MainApp;
