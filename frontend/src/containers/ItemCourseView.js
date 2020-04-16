import React from "react";
import { Card } from "antd";
import axios from 'axios';


class CoursesDetail extends React.Component{
    constructor(props, context, state) {
        super(props, context);
        this.state = {
            courses: {}
        };

    }



    componentDidMount() {
        const coursesID = this.props.match.params.coursesID;
        debugger;
        axios.get(`http://0.0.0.0:8000/api/courses/${coursesID}`)
            .then(res =>{
                debugger;
                this.setState({
                    courses: res.data
                });
                debugger;
                console.log(res.data);
            })
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

export default CoursesDetail;