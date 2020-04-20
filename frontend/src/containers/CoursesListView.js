import React from "react";
import { connect } from 'react-redux';
import Courses from "../components/Courses";
import axios from 'axios';
import {Menu} from "antd";
import {UnorderedListOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";


class CoursesList extends React.Component{
    //
    // constructor(props) {
    //     super(props);
    // }

    state = {
        courses: []
    }

    componentDidMount() {
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