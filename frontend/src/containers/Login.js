import React from "react";
import { connect } from 'react-redux';
import {Form, Input, Button, Spin } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import * as actions from '../store/actions/auth'



const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


class NormalLoginForm extends React.Component{


    constructor(props, context, onFinish) {
        super(props, context);
        this.success = 0;
    }

    onFinish = values => {
        this.props.onAuth(values.username, values.password);
        
    };
  
  render() {
      let errorMessage = null;
      if (this.props.error){
          errorMessage = (
              <p>Please, check your username and password</p>
          )
         
      }
      return (
          <div>
              {errorMessage}
              {
                  this.props.loading ?

                  <Spin indicator={antIcon} />

                  :

                      <Form
                          name="normal_login"
                          className="login-form"
                          initialValues={{
                              remember: true,
                          }}
                          onFinish={this.onFinish}
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
                              name="password"
                              rules={[
                                  {
                                      required: true,
                                      message: 'Please input your Password!',
                                  },
                              ]}
                          >
                              <Input
                                  prefix={<LockOutlined className="site-form-item-icon"/>}
                                  type="password"
                                  placeholder="Password"
                              />
                          </Form.Item>

                          <Form.Item>
                              <Button type="primary" htmlType="submit" className="login-form-button" style={{marginRight: 10}}>
                                  Log in
                              </Button>
                               Or
                              <a href="/signup/" style={{marginLeft: 10}}>
                                 Sign Up
                              </a>
                          </Form.Item>
                      </Form>
              }
          </div>
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
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);