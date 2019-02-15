import React, { Component } from 'react';

import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import "./courses.css"

const client_id = "8Ka4YUEh2qVhXByEDTYLOQbW8LDeIRgGPny4Z9P4"
const client_secret = "pXPaaOTXngGi19piCqj487AiGhIWAZWQQQZOHiQ2grmyxQgD7jx0UepN9K2zEijRruDni27OCSBJnr8WMl9op4hqkI3qTtM8YzhGazhCk4Mubm2qs80mPoNzicgjBIks"
const URL_UDEMY = "https://www.udemy.com/api-2.0/courses/?search="
const URL_UDEMY_LEVELBEGINNER = "&instructional_level=beginner"
const URL_UDEMY_LEVELINTERMEDIATE = "&instructional_level=intermediate"
const URL_UDEMY_EXPERT = "&instructional_level=expert"


class Courses extends Component {
  constructor(props){
    super()

    this.state = {
      coursesUdemy_1:[],
      coursesUdemy_2:[],
      coursesUdemy_3:[],
      coursesFrontendMaters:[],
      coursesUdacity:[],
      allcourses:[]
    }
  }

  componentDidMount(){
    fetch(`${URL_UDEMY}${this.props.data}${URL_UDEMY_LEVELBEGINNER}`, {
      method:'get',
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Basic ' + btoa(client_id + ":" + client_secret)
      }
    }).then(response => response.json())
      .then(data => {
        // console.log(data)
        data.results.map(course => {
          // console.log(course)
          this.setState({
            coursesUdemy_1: [...this.state.coursesUdemy_1, course],
          })
        })
      }).then(fetch(`${URL_UDEMY}${this.props.data}${URL_UDEMY_LEVELINTERMEDIATE}`, {
        method:'get',
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Basic ' + btoa(client_id + ":" + client_secret)
        }
      }).then(response => response.json())
        .then(data => {
          // console.log(data)
          data.results.map(course => {
            // console.log(course)
            this.setState({
              coursesUdemy_2: [...this.state.coursesUdemy_2, course],
            })
          })
      })).then(fetch(`${URL_UDEMY}${this.props.data}${URL_UDEMY_EXPERT}`, {
          method:'get',
          headers: {
            "Content-Type": "application/json",
            Authorization: 'Basic ' + btoa(client_id + ":" + client_secret)
        }
      }).then(response => response.json())
          .then(data => {
            // console.log(data)
            data.results.map(course => {
              // console.log(course)
              this.setState({
                coursesUdemy_3: [...this.state.coursesUdemy_3, course],
              })
            })
      })).then(fetch("https://api.frontendmasters.com/v1/kabuki/courses", {
          method: 'get',
        }).then(response => response.json())
          .then(data => {
          // console.log(data)
          const coincidences = data.filter(course => {
          const title = course.title.toLowerCase();

          if (title.includes(`${this.props.data}`)){
              // console.log(course)
              this.setState({
                coursesFrontendMaters: [...this.state.coursesFrontendMaters, course]
              })
            }
            // console.log(this.state.coursesFrontendMaters)

          })
        })).then(fetch("https://www.udacity.com/public-api/v1/courses", {
          method: 'get'
        }).then(response => response.json())
        .then(data => {
          const coincidences = data.courses.filter(course => {
          const title = course.title.toLowerCase()
          const tags = course.tags.toString()

        if (title.includes(`${this.props.data}`) || tags.includes(`${this.props.data}`)) {
        // console.log(course)
        this.setState({
          coursesUdacity: [...this.state.coursesUdacity, course]
        })
      }
    })
  })).then(this.mergeArray)
}

mergeArray = () => {
   const allCoursesArray = [this.state.coursesUdemy_1, this.state.coursesUdemy_2]
   this.setState({
     allcourses: allCoursesArray
   })
}

  render() {
    // console.log(this.state.coursesUdemy_1)
    // console.log(this.state.coursesUdemy_2)
    // console.log(this.state.coursesUdemy_3)
    // console.log(this.state.coursesUdemy_1)
    return (
      <React.Fragment>
        <h1>Esto es Courses</h1>
        <p>{this.props.data}</p>
        <Container className="courses-container">
        {
          this.state.coursesUdacity.map(course => {
            return (
              <Card classname="courses-container-card" style={{ width: '18rem'}}>
              <Card.Title>{course.title}</Card.Title>
              <Card.Img  className="image-card"variant="top" src={course.image} />
              <ListGroup variant="flush">
                {course.instructors.length > 0 &&
                  <ListGroup.Item>Instructor {course.instructors[0].name}</ListGroup.Item>
                }
                <ListGroup.Item><Card.Img variant="top" src="https://d20vrrgs8k4bvw.cloudfront.net/images/open-graph/udacity.png" /></ListGroup.Item>
              </ListGroup>
              </Card>
            );
          })
        }
        {
          this.state.coursesFrontendMaters.map(course => {
            return (
              <Card classname="courses-container-card" style={{ width: '18rem'}}>
              <Card.Title>{course.title}</Card.Title>
              <Card.Img className="image-card" variant="top" src={course.thumbnail} />
              <ListGroup variant="flush">
                <ListGroup.Item>Instructor no specified</ListGroup.Item>
                <ListGroup.Item><Card.Img className="image-plattform" variant="top" src="https://avatars1.githubusercontent.com/u/5613852?s=280&v=4" /></ListGroup.Item>
              </ListGroup>
              </Card>
            )
          })
        }
        </Container>
      </React.Fragment>
    );
  }
}

export default Courses;
