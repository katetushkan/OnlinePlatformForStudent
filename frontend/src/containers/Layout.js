import React from "react";
import { Link, withRouter  } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import * as actions from "../store/actions/auth";
import {connect} from "react-redux";

const { Header, Sider, Content, Footer } = Layout;


class CustomLayout extends React.Component {

  // constructor(props) {
  //   super(props);
  //
  // }
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

   onFinish = () => {
      if (!this.props.error){
          debugger;
            this.props.logout();
          debugger;

      }

  };



  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
            <Menu.Item key="1">
                <UnorderedListOutlined />
                <span ><Link style={{color: "white"}} to="/">Courses</Link></span>
            </Menu.Item>
            {
                this.props.isAuthenticated ?
                    <Menu.Item key="3" onClick={this.onFinish}>
                        <UserOutlined />
                        <span><Link style={{color: "white"}} to="/">Logout</Link></span>
                    </Menu.Item>
                    :
                      <Menu.Item key="3">
                          <UserOutlined />
                          <span><Link style={{color: "white"}} to="/login">Login</Link></span>
                      </Menu.Item>
              }
          </Menu>
        </Sider>
        <Layout className="site-layout" >
          <Header className="site-layout-background" style={{ padding: 0}}>
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
            {this.props.children}
          </Content>
            <Footer style={{textAlign: "center"}}>
                @2020 Created by <a href="https://github.com/katetushkan" >Katarina Tushkan</a>
          </Footer>
        </Layout>

      </Layout>
    );
  };
};



const mapDispatchToProps = dispatch => {

    return{
        logout: () => dispatch(actions.logout())

    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));




