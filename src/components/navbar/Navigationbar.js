import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown'
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
          <Navbar.Brand className="main--menu--elements">
            <Link to="/"><i class="fas fa-space-shuttle"></i><span className="main-menu-logo-title">Course Station</span></Link>
          </Navbar.Brand>
          <Navbar.Brand>
            <Link className="main-menu-link" to="/about">About</Link>
          </Navbar.Brand>
          <Navbar.Brand>
            <Link className="main-menu-link" to="/about">Blog</Link>
          </Navbar.Brand>
          <Navbar.Brand>
            <Link className="main-menu-link" to="/about">Top</Link>
          </Navbar.Brand>
          <Navbar.Brand className="icon--menu">
            <Dropdown>
              <Dropdown.Toggle split className="main-menu-dropdown">
                <i className="fas fa-user-astronaut"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item><Link className="second-menu-link" to="/login">Login</Link></Dropdown.Item>
                <Dropdown.Item><Link className="second-menu-link" to="/signup">Signup</Link></Dropdown.Item>
                <Dropdown.Item><button  className="second-menu-link main-menu-button" onClick={ this.handleLogout }>Logout</button></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>;
        </Navbar.Brand>
      </Navbar>
      )
    }
}

export default withRouter(Navigationbar);
