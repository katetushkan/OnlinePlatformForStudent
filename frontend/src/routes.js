import React from 'react';
import { Route } from 'react-router-dom';
import CoursesList from "./containers/CoursesListView";
import CoursesDetail from "./containers/ItemCourseView";


const BaseRouter = () =>(

    <div>
     <Route exact path='/' component={CoursesList}/>
     <Route exact path='/:coursesID' component={CoursesDetail}/>
    </div>
);

export default BaseRouter;