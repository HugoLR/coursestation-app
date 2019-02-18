import React, { Component } from 'react';

import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"

import "./compare.css"

const URL="http://localhost:3001/api/v1/courses"

class Compare extends Component {
  constructor(){
    super()

    this.state = {
      courses: []
    }
  }



  componentDidMount(){
    this.setState({
      courses: this.props.courses
    })
    this.props.courses.map(course => {
      fetch(`${URL}/${course._id}/comments`, {
        method: 'get',
        headers:{
          "Content-Type":'aplication-json'
        }
      }).then(response => response.json())
        .then(data => {
          console.log(data)
      })
    })
  }

  render() {
    console.log(this.state.courses)
    return (
      <React.Fragment>
        <h1>Este es compare</h1>
        <div className="compare-grid">
          <div>
            <Card className="filter-card">
              <Card.Title>Price Range</Card.Title>
              <Form.Group controlId="formBasicChecbox">
                <Form.Check type="checkbox" label="Any price" />
                <Form.Check type="checkbox" label="Under $500" />
                <Form.Check type="checkbox" label="Under $10000" />
                <Form.Check type="checkbox" label="More than $10000" />
              </Form.Group>
            </Card>
            <Card className="filter-card">
              <Card.Title>Level</Card.Title>
              <Form.Group controlId="formBasicChecbox">
                <Form.Check type="checkbox" label="All levels" />
                <Form.Check type="checkbox" label="Beginner" />
                <Form.Check type="checkbox" label="Intermediate" />
                <Form.Check type="checkbox" label="Advanced" />
              </Form.Group>
            </Card>
            <Card className="filter-card">
              <Card.Title>Course Station Ranking</Card.Title>
              <Form.Group controlId="formBasicChecbox">
                <Form.Check type="checkbox" label="Five stars" />
                <Form.Check type="checkbox" label="Four stars" />
                <Form.Check type="checkbox" label="Three stars" />
                <Form.Check type="checkbox" label="Two stars" />
                <Form.Check type="checkbox" label="One star" />
              </Form.Group>
            </Card>
          </div>
          <div className="compare-courses">
          {
            this.state.courses.map(course => {
              return (
                <Card   className="courses-container-card" style={{ width: '18rem'}}>
                  <Card.Img  className="image-card" variant="top" src={course.image} />
                  <Card.Title className="courses-container-card-title">{course.title}</Card.Title>
                  <ListGroup variant="flush">
                    {course.instructors.length > 0 &&
                      <ListGroup.Item>Instructor {course.instructors[0]}</ListGroup.Item>
                    }
                    <ListGroup.Item><Card.Img variant="top" src={course.plattform} /></ListGroup.Item>
                    <ListGroup.Item>$ {course.price}</ListGroup.Item>
                    <ListGroup.Item>$ {course.level}</ListGroup.Item>
                    <ListGroup.Item>$ {course.level}</ListGroup.Item>
                  </ListGroup>
                </Card>
              );
            })
          }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Compare;
