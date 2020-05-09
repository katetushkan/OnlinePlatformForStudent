import React from "react";
import { connect } from "react-redux";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import {List, message, Spin, Upload, Button, Divider, Space, Breadcrumb} from 'antd';
import {DownloadOutlined,
        DeleteOutlined,
        UploadOutlined} from "@ant-design/icons/lib/icons";


class SingleRoom extends React.Component{


    constructor(props, context) {
        super(props, context);
        this.state = {
            datafiles: [],
            username: [],
        }
        this.group = 1;
    }

    componentDidMount() {
        const coursesID = this.props.match.params.coursesID;
        axios.get(`http://0.0.0.0:8000/auth/user/`,{
            headers:{
                "Authorization": "Token " + localStorage.getItem("token")
            }
        })
            .then(res=>{
                this.setState({
                    username: res.data
                });
                this.group = this.state.username.groups[0];
                debugger;
                axios.get(`http://0.0.0.0:8000/api/courses/storage/${coursesID}/`,{
                headers:{
                    "Authorization": "Token " + localStorage.getItem("token")
                }
            })
                .then(res=>{
                    this.setState({
                        datafiles: res.data
                    });
                });
            });

        
    }
    handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData(res => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
  };

    handleDownload = (index) =>{
        // console.log(item);
        // event.preventDefault();
         fetch(`http://0.0.0.0:8000/api/downloads/?id=${index}`, {
          method: 'GET',
          headers: {
            // 'Accept': 'application/json',
            "Authorization": "Token " + localStorage.getItem("token"),
              
          },
        }).then((res) =>{
            window.open(res.url,  "file.download");
        });

    };

    handleDelete = (index) =>{
        // console.log(item);
        // event.preventDefault();
         fetch(`http://0.0.0.0:8000/api/delete/${index}`, {
          method: 'DELETE',
          headers: {
            // 'Accept': 'application/json',
            "Authorization": "Token " + localStorage.getItem("token"),

          },
        }).then((res) =>{
            debugger;
            console.log(res);
            const coursesID = this.props.match.params.coursesID;
            axios.get(`http://0.0.0.0:8000/api/courses/storage/${coursesID}/`,{
                headers:{
                    "Authorization": "Token " + localStorage.getItem("token")
                }
            })
                .then(res=>{
                    this.setState({
                        datafiles: res.data
                    });
                });
        });
         

    };
     
    props1 = {
      action: `http://0.0.0.0:8000/api/courses/storage/${this.props.match.params.coursesID}/`,
      method: 'POST',
      headers: {
         "Authorization": "Token " + localStorage.getItem("token"),
      },
      data: {
          week: 2,
          course_id:2,

      },
      showUploadList: false

    };
    handleUpload = () =>{
            axios.get(`http://0.0.0.0:8000/api/courses/storage/${this.props.match.params.coursesID}/`,{
                headers:{
                    "Authorization": "Token " + localStorage.getItem("token")
                }
            })
                .then(res=>{
                    this.setState({
                        datafiles: res.data
                    });
                });
    };
        
    
    render() {
        return(
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href="/classroom">My Classrooms list /</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <InfiniteScroll
                      initialLoad={false}
                      pageStart={0}
                      loadMore={this.handleInfiniteOnLoad}
                      hasMore={!this.state.loading && this.state.hasMore}
                      useWindow={false}
                    >
                      <List
                        dataSource={this.state.datafiles}
                        renderItem={item => (
                          <List.Item id={item.id} key={item.id}>
                            <List.Item.Meta
                              title={<a href="https://ant.design">week {item.week}</a>}
                              description={item.filename_to_display}
                            />
                            <div>
                                <DownloadOutlined onClick={()=>this.handleDownload(item.id)} value={item.id}/>
                            </div>
                              { this.group === 4 ?
                                <div>
                                <DeleteOutlined onClick={()=>this.handleDelete(item.id)} value={item.id}/>
                                </div>
                                  : true
                              }
                          </List.Item>
                        )}
                      >
                        {this.state.loading && this.state.hasMore && (
                          <div className="demo-loading-container">
                            <Spin />
                          </div>
                        )}
                      </List>
                    </InfiniteScroll>
                <Divider />
                <Space direction='horizontal'>

                { this.group === 4 ?
                    <div>
                     
                        <Upload {...this.props1} name="file"  onChange={(info => {
                            if (info.file.status !== 'uploading') {
                              console.log(info.file, info.fileList);
                              debugger
                            }
                            if (info.file.status === 'done') {
                              message.success(`${info.file.name} file uploaded successfully`);
                    
                            } else if (info.file.status === 'error') {
                              message.error(`${info.file.name} file upload failed.`);
                            }
                        })}>
                            <Button>
                              <UploadOutlined /> Click to Upload
                            </Button>
                          </Upload>
                    </div>

                    : true
                }
                { this.group === 4 ?
                    <Button onClick={this.handleUpload} >
                        Confirm Upload
                    </Button>
                    : true
                }
                </Space>
            </div>
        );
    }
}


const mapStateToProps = state =>{
    return{
        token: state.token
    }
}

export default connect(mapStateToProps)(SingleRoom)