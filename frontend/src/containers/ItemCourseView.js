import React from "react";
import { connect } from 'react-redux';
import { Card } from "antd";
import axios from 'axios';


class CoursesDetail extends React.Component{
    constructor(props, context, state) {
        super(props, context);
        this.state = {
            courses: {}
        };

    }



    componentWillReceiveProps(newProps) {
        const coursesID = this.props.match.params.coursesID;
        if (newProps.token){
            debugger;
            axios.defaults.headers = {
                "Content-type": "application/json",
                Authorization: newProps.token
            }
            debugger;
            axios.get(`http://0.0.0.0:8000/api/courses/${coursesID}/`)
            .then(res =>{
                debugger;
                this.setState({
                    courses: res.data
                });
                debugger;
                console.log(res.data);
            })
        }


    }

    render() {
        return(
            <div>
                <Card title={this.state.courses.name}>
                    <p>{this.state.courses.date}</p>
                    <p>{this.state.courses.description}</p>
                </Card>
            </div>    
        );
    };

}


const mapStateToProps = state =>{
    return{
        token: state.token
    }
}

export default connect(mapStateToProps)(CoursesDetail);