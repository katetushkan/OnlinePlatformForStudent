import React from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import ChatListItem from "../components/ChatList";


class ChatList extends React.Component{

    state = {
        courses: []
    }
    
  
      componentDidMount() {
        axios.get('http://0.0.0.0:8000/api/courses/subscribe/',{
            headers: {
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            "Authorization": "Token " + localStorage.getItem("token")
          }
        })
            .then(res =>{
                debugger;
                this.setState({

                    courses: res.data
                });
                debugger;
                console.log(res.data);
                debugger;
            })
    }
    

    render() {
        return(

            <ChatListItem data={this.state.courses}/>

        );
    };

}

const mapStateToProps = state =>{
    return{
        token: state.token
    }
}

export default connect(mapStateToProps)(ChatList);