import React from "react";
import {List, Card, } from 'antd';
import {LoadingOutlined, CheckCircleTwoTone} from "@ant-design/icons/lib/icons";

const Courses = (props) => {

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
                  <a href={`/courses/${item.id}`}>

                      <Card title={item.name}>

                        <p>{item.date} - <br />
                            {item.endDate}
                        </p>
                          <p>
                              {Date.parse(item.date) > Date.now().toString() ?
                                 <div>
                                     <LoadingOutlined style={{ color: '#eb4034' }}/> We still have some place!!!

                                 </div>

                                  : <div><CheckCircleTwoTone twoToneColor="#52c41a" /> This course already begins!</div>
                          }
                          </p>

                      </Card>
                  </a>
              </List.Item>
            )}
          />
    );
};

export default Courses;
