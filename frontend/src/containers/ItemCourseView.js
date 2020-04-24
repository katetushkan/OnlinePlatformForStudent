import React from "react";
import { connect } from 'react-redux';
import {Button, Card, Result} from "antd";
import { Link } from 'react-router-dom';
import axios from 'axios';


class CoursesDetail extends React.Component{
    constructor(props, context, state) {
        super(props, context);
        this.state = {
            courses: {},
            subscribe: false
            
        };

    }

    componentDidMount() {
        const coursesID = this.props.match.params.coursesID;
        axios.get(`http://0.0.0.0:8000/api/courses/${coursesID}/`)
            .then(res =>{
                this.setState({
                    courses: res.data
                });
                console.log(res.data);
            })
    }

    handelSubscribe = (event) =>{
        const coursesID = this.props.match.params.coursesID;
        event.preventDefault();
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
              this.setState( {
                subscribe: true
              });
            console.log(res)
          });


    };

    
    render() {

            if (this.state.subscribe){
                if(localStorage.getItem('token')){
                    return(
                      <Result
                        status="success"
                        title="Successfully Subscribe to the course"
                        subTitle="Welcome to our platform!"
                        extra={[
                          <Button type="primary" key="console">
                              <Link>Go to your classroom</Link>
                          </Button>,
                        ]}
                      />
                  );
                }
                
                else{
                    return(
                        <Result
                            status="warning"
                            title="Please to subscribe this course first log in."
                            extra={
                              <Button type="primary" key="console">
                                  <Link to="/login">Login</Link>
                              </Button>
                            }
                        />
                    );
                }

            }
            else{
                return(
                  <div>
                      <Card title={this.state.courses.name}>
                          <p>{this.state.courses.date}</p>
                          <p>{this.state.courses.description}</p>
                      </Card>
                      <form>
                          <Button type="primary" style={{marginTop: 10}}  onClick={this.handelSubscribe}>Subscribe</Button>
                      </form>
                  </div>
                );
            }


    };

}


const mapStateToProps = state =>{
    return{
        token: state.token
    }
}

export default connect(mapStateToProps)(CoursesDetail);