import React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Form,
    Input,
} from 'antd';
import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons';
import * as actions from "../store/actions/auth";

class RegistrationForm extends React.Component{


    onFinish = values => {
     if (!this.props.error) {
         const { history } = this.props;
         this.props.onAuth(values.username, values.email, values.password, values.confirm);
         history.push("/login");
     }


  };


  render() {
      return (
            <Form
              // form={Form.useForm()}
              name="register"
              onFinish={this.onFinish}
              scrollToFirstError
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                </Form.Item>


                <Form.Item

                    name="email"
                    rules={[
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!',
                      },
                    ]}
                 >
                    <Input prefix={<MailOutlined className="site-form-item-icon"/>} placeholder="email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                    hasFeedback
                 >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="password1"/>
                </Form.Item>

              <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject('The two passwords that you entered do not match!');
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="password2"/>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{marginRight: 10}}>
                    Sign Up
                </Button>
                  or
                  <a href="/login/" style={{marginLeft: 10}}>
                    Log In
                  </a>
               </Form.Item>

            </Form>
          );
  }

};

const mapStateToProps = (state) => {
    return{
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (username, email,  password1, password2) => dispatch(actions.authSignUp(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);