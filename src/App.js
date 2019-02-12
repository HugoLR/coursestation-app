import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigationbar from "./components/navbar/Navigationbar";
import About from "./components/about/About";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import PrivateRoute from "./components/privateComponent/PrivateComponent"
import SignUp from "./components/signup/SignUp"

import "./App.css"

class App extends Component {
  render() {
    return (
      <div>
        <Navigationbar />
        <Switch>
          <Route path="/" exact component={ Home } />
          <PrivateRoute path="/about" exact component={ About } />
          <Route path="/login" exact component={ Login } />
          <Route path="/signup" exact component={ SignUp } />
        </Switch>
      </div>

    );
  }
}

export default App;
