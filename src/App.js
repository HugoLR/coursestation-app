import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigationbar from "./components/navbar/Navigationbar";



import "./App.css"


class App extends Component {
  render() {
    return (
      <Navigationbar />

    );
  }
}

export default App;
