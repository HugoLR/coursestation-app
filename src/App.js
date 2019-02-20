import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigationbar from "./components/navbar/Navigationbar";
import About from "./components/about/About";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import PrivateRoute from "./components/privateComponent/PrivateComponent"
import SignUp from "./components/signup/SignUp"
import Courses from "./components/courses/Courses"
import Compare from "./components/compare/Compare"
import Course from "./components/course/Course"

import "./App.css"

class App extends Component {
  constructor(props){
    super();

    this.state = {
      value:'',
      courses: [],
      user:[]
    }
  }
    onChangeValue = (newvalue) => {
      this.setState({
        value:newvalue
      })
    }

    onChangeCourses = (newvalue) => {
      this.setState({
        courses: newvalue
      })
    }

    onChangeUsers = (newvalue) => {
      this.setState({
        user:newvalue
      })
    }

  render() {
    return (
      <div>
        <Navigationbar/>
        <Switch>
          <Route path="/" render={(props) => <Home {...props} data={this.state.value} user={this.state.user} onChangeUsers={this.onChangeUsers} onChangeValue={this.onChangeValue} />}  exact />
          <PrivateRoute path="/about" exact component={ About } />
          <Route path="/login" exact component={ Login } />
          <Route path="/signup" exact component={ SignUp } />
          <Route path="/courses" render={(props)=> <Courses {...props} courses={this.state.courses} data={this.state.value} onChangeCourses={this.onChangeCourses} />} exact />
          <Route path="/courses/compare" render={(props)=> <Compare {...props} courses={this.state.courses} />} exact />
          <Route path="/course/:courseId" render={(props)=> <Course {...props} user={this.state.user} />} />
        </Switch>
      </div>

    );
  }
}

export default App;
