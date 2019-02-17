import React, { Component } from 'react';
import { Link } from "react-router-dom"

import Container from "react-bootstrap/Container"

import "./home.css"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newquery:''
    }
  }



  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      newquery: e.target.value
    })
  }

  render() {
    console.log(this.props)
    return (
      <Container className="home-container">
        <video className="background-video" loop autoPlay>
          <source src={require('../../video/MilkyWay1H264.mov')} type="video/mp4" />
        </video>
        <div className="home-container-text">
          <div>
            <i class="fas fa-space-shuttle"></i><span className="main-menu-logo-title">Course Station</span>
          </div>
          <div>
            <h3>All courses In On Place</h3>
          </div>
          <div>
            <input type="text" value={this.state.newquery} onChange={this.handleChange} />
            <Link to="/courses"><button onClick={() => this.props.onChangeValue(this.state.newquery)}>Search</button></Link>
          </div>
        </div>
      </Container>
    );
  }
}

export default Home;
