import React from "react";
import { connect } from "react-redux";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { List, message, Spin } from 'antd';
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";


class SingleRoom extends React.Component{


    constructor(props, context) {
        super(props, context);
        this.state = {
            datafiles: [],
            fileid:{}
        }
    }

    componentDidMount() {
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
            })
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

    downloadFile = (index) =>{
        // console.log(item);
        // event.preventDefault();
        debugger;
         fetch(`http://0.0.0.0:8000/api/downloads/?id=${index}`, {
          method: 'GET',
          headers: {
            // 'Accept': 'application/json',
            "Authorization": "Token " + localStorage.getItem("token"),
              
          },
        }).then((res) =>{
            debugger
            window.open(res.url,  "file.download");
            
            debugger
        });

    };
    
    render() {
        return(
            <div>
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
                                {console.log(item.id)}
                                <UploadOutlined onClick={()=>this.downloadFile(item.id)} value={item.id}/>
                            </div>
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