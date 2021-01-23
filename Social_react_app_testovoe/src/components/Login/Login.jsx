import React from 'react';
import css from './Login.module.css'
import {connect} from "react-redux";
import {loginAuthUserData} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';

//разметка полей login and email
const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 8,
    },
};
//разметка поле remember and button
const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 6,
    },
};

const Login = (props) => {

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    const onFinish = (values) => {
        props.loginAuthUserData(values.email, values.password, values.rememberMe, values.captcha);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed/login:', errorInfo);
    };

    return <div>
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            { props.captchaUrl &&
            <Form.Item  {...tailLayout} >
                <img alt='...loading captcha' src={props.captchaUrl} className={css.img} />
            </Form.Item>
            }

            { props.captchaUrl &&
            <Form.Item  {...tailLayout} name="captcha">
                <Input/>
            </Form.Item>
            }

            <Form.Item {...tailLayout} name="rememberMe" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    login
                </Button>
            </Form.Item>
        </Form>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl

});

export default connect(mapStateToProps, {loginAuthUserData})(Login)
