import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {loginAuthUserData} from "../../redux/auth-reducer";

import { Form, Input, Button, Checkbox } from 'antd';
import css from './Login.module.css'

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

const Login = ({isAuth, loginAuthUserData, captchaUrl }) => {

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    const onFinish = (values) => {
        loginAuthUserData(values.email, values.password, values.rememberMe, values.captcha);
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

            {captchaUrl &&
            <Form.Item  {...tailLayout} >
                <img alt='...loading captcha' src={captchaUrl} className={css.img} />
            </Form.Item>
            }

            {captchaUrl &&
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
