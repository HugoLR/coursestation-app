import React, { Component } from 'react';
import { NavLink, Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
// import Brand from 'react-bootstrap/Navbar'
import "./nabvar.css"

class Navigationbar extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <React.Fragment>
      
        <Navbar className="main--menu" expand="lg">
        <Navbar.Brand>
          <img src={require('../../images/logo.png')} width={190} height={70}/>
        </Navbar.Brand>
        <Navbar.Brand>Home</Navbar.Brand>
        <Navbar.Brand className="icon--menu"><i class="fas fa-user-astronaut"></i></Navbar.Brand>
        </Navbar>
      </React.Fragment>
      )
    }
}

export default Navigationbar;
