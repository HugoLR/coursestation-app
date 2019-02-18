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

import "./App.css"

class App extends Component {
  constructor(props){
    super();

    this.state = {
      value:'',
      courses: []
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

  render() {
    return (
      <div>
        <Navigationbar/>
        <Switch>
          <Route path="/" render={(props) => <Home {...props} data={this.state.value} onChangeValue={this.onChangeValue} />}  exact />
          <PrivateRoute path="/about" exact component={ About } />
          <Route path="/login" exact component={ Login } />
          <Route path="/signup" exact component={ SignUp } />
          <Route path="/courses" render={(props)=> <Courses {...props} courses={this.state.courses} data={this.state.value} onChangeCourses={this.onChangeCourses} />} exact />
          <Route path="/courses/compare" render={(props)=> <Compare {...props} courses={this.state.courses} />} exact />
        </Switch>
      </div>

    );
  }
}

export default App;
