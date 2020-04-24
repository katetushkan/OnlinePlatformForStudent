import React from "react";
import { connect } from 'react-redux';
import Courses from "../components/Courses";
import axios from 'axios';


class CoursesList extends React.Component{

    state = {
        courses: []
    }

    componentDidMount() {
        axios.get('http://0.0.0.0:8000/api/courses/')
            .then(res =>{
                this.setState({

                    courses: res.data
                });
                console.log(res.data);
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