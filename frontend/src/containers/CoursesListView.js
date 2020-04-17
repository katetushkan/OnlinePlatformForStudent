import React from "react";
import { connect } from 'react-redux';
import Courses from "../components/Courses";
import axios from 'axios';


class CoursesList extends React.Component{
    //
    // constructor(props) {
    //     super(props);
    // }

    state = {
        courses: []
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token){
            debugger;
            axios.defaults.headers = {
                "Content-type": "application/json",
                Authorization: newProps.token
            }
            axios.get('http://0.0.0.0:8000/api/courses/')
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
        
    }

    render() {
        return(
            <Courses data={this.state.courses}/>
        );
    };

}

const mapStateToProps = state =>{
    return{
        token: state.token
    }
}

export default connect(mapStateToProps)(CoursesList);