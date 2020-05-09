import React from "react";
import { Link, withRouter  } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  UnorderedListOutlined,
  BankOutlined, 
  WechatOutlined,
    SmileOutlined
} from '@ant-design/icons';
import * as actions from "../store/actions/auth";
import {connect} from "react-redux";
import axios from "axios";

const { Header, Sider, Content, Footer } = Layout;


class CustomLayout extends React.Component {
  //
  // constructor(props) {
  //   super(props)
  // }
  state = {
    collapsed: false,
      username: [],
      role: ''
      };

  componentDidMount() {
      if(localStorage.getItem('token')){
          debugger
        axios.get(`http://0.0.0.0:8000/auth/user/`,{
            headers:{
                "Authorization": "Token " + localStorage.getItem("token")
            }
        })
            .then(res=>{
                this.setState({
                    username: res.data
                })
               console.log(res.data);
                if(this.state.username.groups[0]===3){
                    this.setState({
                        role: 'Student'
                    })
                }
                if(this.state.username.groups[0]===4){
                    this.setState({
                        role: 'Teacher'
                    })
                }
            });

      }
  }

    toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

   onFinish = () => {
      if (!this.props.error){
          this.props.logout();
          const { history } = this.props;
          history.push("/");


      }

  };


  render() {
    let username = '';
    if (localStorage.getItem('token')){



    }
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>

          <Menu theme="dark" mode="inline"  >
              {
                  this.props.isAuthenticated ?
                        <Menu.Item key="6">
                            <SmileOutlined />
                            <span ><Link style={{color: "white"}}>Hello, {this.state.username.username}</Link></span>
                        </Menu.Item>
                      : <div >
                          <p style={{color: 'white'}} style={{margin: 30}} ></p>
                        </div>
              }
              {
                  this.props.isAuthenticated ?
                        <Menu.Item key="7">
                            <SmileOutlined rotate={180} />
                            <span ><Link style={{color: "white"}}>{this.state.role}</Link></span>
                        </Menu.Item>
                      : <div >
                          <p style={{color: 'white'}} style={{margin: 30}} ></p>
                        </div>
              }

            <Menu.Item key="1">
                <UnorderedListOutlined />
                <span ><Link style={{color: "white"}} to="/">Courses</Link></span>
            </Menu.Item>
             {
                this.props.isAuthenticated ?
                    <Menu.Item key="2">
                        <BankOutlined />
                        <span><Link style={{color: "white"}} to="/classroom">Classroom</Link></span>
                    </Menu.Item>
                    : this.props.isAuthenticated

            }
            {
                this.props.isAuthenticated ?
                    <Menu.Item key="3">
                        <WechatOutlined />
                        <span><Link style={{color: "white"}} to="/chat">Chat</Link></span>
                    </Menu.Item>
                    : this.props.isAuthenticated

            }
            {
                this.props.isAuthenticated ?
                    <Menu.Item key="4" onClick={this.onFinish}>
                        <UserOutlined />
                        <span><Link style={{color: "white"}} to="/">Logout</Link></span>
                    </Menu.Item>
                    :
                      <Menu.Item key="5">
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

              {console.log(username)}
            {this.props.children}
          </Content>
            <Footer style={{textAlign: "center"}}>
                <p>@2020 Created by <a href="https://github.com/katetushkan" >Katarina Tushkan</a></p>
                Write <a href="https://vk.com/levelup_bsuir" >us</a> to get some help!
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




