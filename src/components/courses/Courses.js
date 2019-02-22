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
      this.getFrontendMaster()
  }

  getFrontendMaster = () => {
    fetch("https://api.frontendmasters.com/v1/kabuki/courses", {
        method: 'get'
      }).then(response => response.json())
      .then(data => {
        const filtered = data.filter(course => course.thumbnail !== "")

        const news = filtered.filter(course => {
          console.log(course)
          return course.title.toLowerCase().includes(`${this.props.data}`)
        })

        this.setState({ courses: news.concat(this.state.courses) })
      })
  }

  render() {
    console.log(this.state.courses)
    // console.log(this.props)
    // console.log(localStorage.getItem('token'))
    return (
      <div className="courses-main-container">
        <Link to="/courses/compare" ><button className="courses-compare-button" onClick={() => this.props.onChangeCourses(this.state.courses)}><i class="fas fa-filter"></i>Compare Courses</button></Link>
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
                {
                  typeof course.image === "undefined" &&
                  <Card.Img  className="image-card" variant="top" src={course.thumbnail} />
                }
                {
                  typeof course.thumbnail === "undefined" &&
                  <Card.Img  className="image-card" variant="top" src={course.image} />
                }
                <ListGroup variant="flush">
                  { (typeof course.summary == "undefined"  && typeof course.instructors !== "undefined") &&

                    <ListGroup.Item>Instructor {course.instructors[0]}</ListGroup.Item>
                  }
                  { typeof course.instructors == "undefined"  &&

                    <ListGroup.Item>Instructor {course.summary.split(" ").slice(0, 1).join(" ")}</ListGroup.Item>
                  }
                  {
                    typeof course.plattform !== "undefined" &&
                    <ListGroup.Item><Card.Img variant="top" src={course.plattform} /></ListGroup.Item>
                  }
                  {
                    typeof course.plattform === "undefined" &&
                    <ListGroup.Item>
                      <Card.Img
                      style={{width:"246px", height:"129px"}}
                      variant="top"
                       src="https://pbs.twimg.com/profile_images/911069740164108289/ZiVAi6zG_400x400.jpg"/>
                    </ListGroup.Item>

                  }
                </ListGroup>
              </Card>
            );
          })
        }
        </Container>
      </div>
    );
  }
}

export default Courses;
