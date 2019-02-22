import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown'
import "./nabvar.css"
import isLoggedIn from "../../utils/isLoggedIn";
const URL="http://localhost:3001/api/v1";

class Navigationbar extends Component {

  constructor() {
    super();
    this.state = {
      newquery:'',
      users:[],
      username:""
    }
  }


  componentDidMount(){
    fetch(`${URL}/users`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    }).then(response => response.json())
      .then(data => {
        this.setState({
          users:data.users
        })

        const token = localStorage.getItem('token')
        let base64Url = token.split('.')[1]
        let base64 = base64Url.replace('-','+').replace('_', '/')
        const t = JSON.parse(window.atob(base64))

        const currentUser = data.users.filter( user => {

          if (user.email === t.email) {
            this.setState({
              user: user,
              username:user.username
            })
            // console.log(this.state.user)
          }
        })
      })
      .catch(err => {
        console.log(`err:${err}`)
      })
  }


  handleLogout = () => {
    const { history } = this.props;

    localStorage.removeItem('token');
    history.push("/")
  }

  render() {
    return(
        <Navbar className="main--menu" expand="lg">
            <div className="main--menu--first">
              <Navbar.Brand className="main--menu--elements">
                <Link to="/"><i className="fas fa-space-shuttle"></i><span className="main-menu-logo-title">Course Station</span></Link>
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
                </Dropdown>
            </Navbar.Brand>
          </div>
          <div className="main--menu--second">
            {isLoggedIn() &&
              <p className="username">Welcome</p>
            }
          </div>
      </Navbar>
      )
    }
}

export default withRouter(Navigationbar);
