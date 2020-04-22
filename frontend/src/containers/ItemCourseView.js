import React from "react";
import { connect } from 'react-redux';
import {Button, Card} from "antd";
import axios from 'axios';


class CoursesDetail extends React.Component{
    constructor(props, context, state) {
        super(props, context);
        this.state = {
            courses: {}
        };

    }

    componentDidMount() {
        debugger
         const coursesID = this.props.match.params.coursesID;
        debugger
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

    handelSubscribe = (event) =>{
        debugger
        const coursesID = this.props.match.params.coursesID;
        const token = "Token " + localStorage.getItem("token")
        event.preventDefault();
        debugger;
        fetch('http://0.0.0.0:8000/api/courses/subscribe/', {
          method: 'POST',
          headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Token " + localStorage.getItem("token")
          },
          body: JSON.stringify({
            course: coursesID,
          })
        }).then(res =>{
              console.log(res);
          })


    };

    render() {
        return(
            <div>
                <Card title={this.state.courses.name}>
                    <p>{this.state.courses.date}</p>
                    <p>{this.state.courses.description}</p>
                </Card>
                <form>
                    <Button type="primary" onClick={this.handelSubscribe}>Primary</Button>
                </form>
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