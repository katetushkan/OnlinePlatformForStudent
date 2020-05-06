import React from 'react';
import { Route } from 'react-router-dom';
import CoursesList from "./containers/CoursesListView";
import CoursesDetail from "./containers/ItemCourseView";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import ClassRoomList from "./containers/ClassRoomView";
import SingleRoom from "./containers/SingleRoomView";
import ChatList from "./containers/ChatListView";
import ChatComponent from "./containers/ChatRoomItem";


const BaseRouter = () =>(

    <div>
     <Route exact path='/' component={CoursesList}/>
     <Route exact path='/courses/:coursesID' component={CoursesDetail}/>
     <Route exact path='/login' component={Login}/>
     <Route exact path='/signup' component={SignUp}/>
     <Route exact path='/classroom' component={ClassRoomList}/>
     <Route exact path='/classroom/:coursesID' component={SingleRoom}/>
     <Route exact path='/chat' component={ChatList}/>
     <Route exact path='/chat/:chatID' component={ChatComponent}/>
    </div>
);

export default BaseRouter;