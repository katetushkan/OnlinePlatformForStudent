import React from "react";
import {connect} from "react-redux";
import {Comment, Avatar, Form, Button, List, Input, Breadcrumb} from 'antd';
import moment from 'moment';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'messages' : 'message'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea id="chat-message-input" rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Send
      </Button>
    </Form.Item>
  </div>
);

class ChatRoom extends React.Component{

    constructor() {
        super();
        this.socketRef = null;
        this.state = {
            comments: [],
            submitting: false,
            value: '',
            upload: true,

          };
    }
    componentDidMount() {
        const coursesID = this.props.match.params.chatID;
        debugger;
        const socketpath = `ws://0.0.0.0:8000/ws/chat/${coursesID}/`;
        this.socketRef = new WebSocket(socketpath);
        this.socketRef.onmessage = e => {
            const date = JSON.parse(e.data);
            // this.state.comments.push(data.message);
            if(this.state.upload === true){
                this.setState({
                submitting: false,
                value: '',
                comments: [
                  {
                    author: `${date.message[1]}`,
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: <p>{date.message[0]}</p>,
                    datetime: moment().fromNow(),
                  },
                  ...this.state.comments,
                ],
              });
            }


          };
            
    }


    handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    const messageInputDom = document.querySelector('#chat-message-input');
            const message = messageInputDom.value;
            debugger;
            this.socketRef.send(JSON.stringify({
                'message': message,
                "Authorization": "Token " + localStorage.getItem("token")
            }));
            // this.setState({
            //   submitting: true,
            // });
            this.state.upload = false;
            this.setState({
                submitting: false,
                value: '',
                comments: [
                  {
                    author: 'Me',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: <p>{message}</p>,
                    datetime: moment().fromNow(),
                  },
                  ...this.state.comments,
                ],
              });
            
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

   
    render() {
        const { comments, submitting, value } = this.state;
        return(
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                      <a href="/chat">Chat list / </a>
                    </Breadcrumb.Item>
              </Breadcrumb>
                <Comment
                  avatar={
                    <Avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      alt="Han Solo"
                    />
                  }
                  content={
                    <Editor
                      onChange={this.handleChange}
                      onSubmit={this.handleSubmit}
                      submitting={submitting}
                      value={value}
                    />
                  }
                />
                {comments.length > 0 && <CommentList comments={comments} /> }
          </div>
            
        );
    }
}
const mapStateToProps = state =>{
    return{
        token: state.token
    }
}

export default connect(mapStateToProps)(ChatRoom);