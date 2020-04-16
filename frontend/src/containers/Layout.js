import React from "react";
import axios from 'axios';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  UploadOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

 function logOut(){
   debugger;
    axios.post('http://0.0.0.0:8000/auth/logout/')
  };

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



  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
            <Menu.Item key="1">
                <UnorderedListOutlined />
                <span>Courses</span>
            </Menu.Item>
            <Menu.Item key="2">
              <UserOutlined />
              <span>Login</span>
            </Menu.Item>
            <Menu.Item key="3" onClick={logOut}>
              <UploadOutlined />
              <span>Register</span>
            </Menu.Item>
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

export default CustomLayout;



