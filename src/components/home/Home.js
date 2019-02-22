import React, { Component } from 'react';
import { Link } from "react-router-dom"

import Container from "react-bootstrap/Container"

import "./home.css"

const URL="http://localhost:3001/api/v1/"


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newquery:'',
      user: []
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
        // console.log(data)
        this.setState({
          users:data.users
        })

        const token = localStorage.getItem('token')
        let base64Url = token.split('.')[1]
        let base64 = base64Url.replace('-','+').replace('_', '/')
        const t = JSON.parse(window.atob(base64))

        const currentUser = data.users.filter( user => {

          if (user.email === t.email) {
            this.setState({user: user})
            console.log(this.state.user)
          }
        })
      })
      .catch(err => {
        console.log(`err:${err}`)
      })

  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      newquery: e.target.value
    })
  }

  render() {
    // console.log(localStorage.getItem('token'))
    return (
      <div className="home-container">
        <video className="background-video" loop autoPlay>
          <source src={require('../../video/MilkyWay1H264.mov')} widht={1200} type="video/mp4" />
        </video>
        <div className="home-container-text">
          <div>
            <h3 className="home-container-phrase">All courses In One Place</h3>
            <h3 className="home-container-phrase">Search to find your next course</h3>
          </div>
          <div>
            <input type="text" className="home-container-input" value={this.state.newquery} onChange={this.handleChange} placeholder="Search" />
            <Link to="/courses" onClick={() => this.props.onChangeUsers(this.state.user)}><button className="home-container-search" onClick={() => this.props.onChangeValue(this.state.newquery)} >Search</button></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
