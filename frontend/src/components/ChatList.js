import React from "react";
import {List, Card } from 'antd';



const ChatListItem = (props) => {
    return(
        <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={props.data}
            renderItem={item => (
              <List.Item>
                  <a href={`/chat/${item.id}`}>
                      <Card title={item.name}>
                        {item.date}
                      </Card>
                  </a>
              </List.Item>
            )}
          />
    );
};

export default ChatListItem;