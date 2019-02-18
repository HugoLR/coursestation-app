import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import "./courses.css"

const URL="http://localhost:3001/api/v1/courses"

class Courses extends Component {
  constructor(props){
    super()

    this.state = {
      courses:[]
    }
  }

  componentDidMount(){
    fetch(`${URL}`, {
      method:'get',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
      .then(data => {
        const coincidences = data.courses.filter(course => {
          const title = course.title.toLowerCase();

          if (title.includes(`${this.props.data}`)){

            this.setState({
              courses:[...this.state.courses, course]
            })
          }
        })
      })
      .catch(err => {
        console.log(`error:${err}`)
      })
  }

  render() {
    return (
      <React.Fragment>
        <Link to="/courses/compare" ><button className="courses-compare-button" onClick={() => this.props.onChangeCourses(this.state.courses)}>Compare</button></Link>
        <div className="courses-header">
          <h2>Results for {this.props.data}</h2>
          <p>Total coincidences: <span>{this.state.courses.length}</span></p>
        </div>
        <Container className="courses-container">
        {
          this.state.courses.map(course => {
            return (
              <Card   className="courses-container-card" style={{ width: '18rem'}}>
              <Card.Title className="courses-container-card-title">{course.title}</Card.Title>
              <Card.Img  className="image-card" variant="top" src={course.image} />
              <ListGroup variant="flush">
                {course.instructors.length > 0 &&
                  <ListGroup.Item>Instructor {course.instructors[0]}</ListGroup.Item>
                }
                <ListGroup.Item><Card.Img variant="top" src={course.plattform} /></ListGroup.Item>
              </ListGroup>
              </Card>
            );
          })
        }
        </Container>
      </React.Fragment>
    );
  }
}

export default Courses;
