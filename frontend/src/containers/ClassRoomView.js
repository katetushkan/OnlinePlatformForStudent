import React from "react";
import { connect } from 'react-redux';
import SubscribedCourses from "../components/SubscribedCourse";
import axios from 'axios';


class ClassRoomList extends React.Component{

    state = {
        courses: [],
    };
    
  
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

            <SubscribedCourses data={this.state.courses}/>

        );
    };

}

const mapStateToProps = state =>{
    return{
        token: state.token
    }
}

export default connect(mapStateToProps)(ClassRoomList);
