import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import CustomLayout from "./containers/Layout";
import CoursesList from "./containers/CoursesList";

function App() {
  return (
    <div className="App">
      <CustomLayout>
        <CoursesList/>
      </CustomLayout>
    </div>
  );
}

export default App;
