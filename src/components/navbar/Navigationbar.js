import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
// import Brand from 'react-bootstrap/Navbar'
import "./nabvar.css"

class Navigationbar extends Component {

  handleLogout = () => {
    const { history } = this.props;

    localStorage.removeItem('token');
    history.push("/")
  }

  render() {
    return(
        <Navbar className="main--menu" expand="lg">
          <Navbar.Brand>
            <Link to="/"><img src={require('../../images/logo.png')} width={190} height={70} alt="Logo"/></Link>
          </Navbar.Brand>
          <Navbar.Brand>
            <Link to="/about">About</Link>
          </Navbar.Brand>
          <Navbar.Brand>
            <Link to="/login">Login</Link>
          </Navbar.Brand>
          <Navbar.Brand>
            <Link to="/signup">Signup</Link>
          </Navbar.Brand>
          <Navbar.Brand>
            <button onClick={ this.handleLogout }>Logout</button>
          </Navbar.Brand>
          <Navbar.Brand className="icon--menu"><i className="fas fa-user-astronaut"></i></Navbar.Brand>
        </Navbar>
      )
    }
}

export default withRouter(Navigationbar);
