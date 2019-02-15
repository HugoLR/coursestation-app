import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigationbar from "./components/navbar/Navigationbar";
import About from "./components/about/About";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import PrivateRoute from "./components/privateComponent/PrivateComponent"
import SignUp from "./components/signup/SignUp"
import Courses from "./components/courses/Courses"

import "./App.css"

class App extends Component {
  constructor(props){
    super();

    this.state = {
      value:''
    }
  }
    onChangeValue = (newvalue) => {
      this.setState({
        value:newvalue
      })
    }

  render() {
    return (
      <div>
        <Navigationbar/>
        <Switch>
          <Route path="/" render={(props) => <Home {...props} data={this.state.value} onChangeValue={this.onChangeValue} />}  exact/>
          <PrivateRoute path="/about" exact component={ About } />
          <Route path="/login" exact component={ Login } />
          <Route path="/signup" exact component={ SignUp } />
          <Route path="/courses" render={(props)=> <Courses {...props} data={this.state.value}/>} exact />
        </Switch>
      </div>

    );
  }
}

export default App;
