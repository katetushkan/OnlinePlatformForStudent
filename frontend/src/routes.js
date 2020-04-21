import React from 'react';
import { Route } from 'react-router-dom';
import CoursesList from "./containers/CoursesListView";
import CoursesDetail from "./containers/ItemCourseView";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import ClassRoomView from "./containers/ClassRoomView";


const BaseRouter = () =>(

    <div>
     <Route exact path='/' component={CoursesList}/>
     <Route exact path='/courses/:coursesID' component={CoursesDetail}/>
     <Route exact path='/login' component={Login}/>
     <Route exact path='/signup' component={SignUp}/>
     <Route exact path='/classroom' component={ClassRoomView}/>
    </div>
);

export default BaseRouter;