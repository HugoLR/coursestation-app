import React, { Component } from 'react';

import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import "./courses.css"

class Courses extends Component {
  constructor(props){
    super()
  }

  render() {
    return (
      <React.Fragment>
        <h1>Esto es Courses</h1>
        <p>{this.props.data}</p>
      </React.Fragment>
    );
  }
}

export default Courses;
