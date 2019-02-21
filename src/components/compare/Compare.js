import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"

import "./compare.css"

class Compare extends Component {
  constructor(){
    super()

    this.state = {
      courses: [],
      filterCourses:[],
    }
  }

  componentDidMount(){
    this.setState({
      courses: this.props.courses,
      filterCourses: this.props.courses
    })
  }

  showAnyPriceFilter = () => {
    var allprices = this.state.courses.filter(course => course.price > 0)
    this.setState({
      filterCourses: allprices
    })
  }

  showPriceFirsFilter = () => {
    var lessThan500 = this.state.courses.filter(course => course.price <= 500)
    this.setState({
      filterCourses: lessThan500
    })
  }

  showPriceSecondFilter = () => {
    var lessThan1000 = this.state.courses.filter(course => course.price > 500 && course.price <= 1000)
    this.setState({
      filterCourses: lessThan1000
    })
  }

  showPriceThirdFilter = () => {
    var moreThan1000 = this.state.courses.filter(course => course.price > 1000)
    this.setState({
      filterCourses: moreThan1000
    })
  }

  showAllLevelCourses = () => {
    var allLevelCourses = this.state.filterCourses.filter(course => course.level === "beginner" || course.level === "intermediate" || course.level === "advanced")
    this.setState({
      filterCourses: allLevelCourses
    })
  }

  showBeginnerCourses = () => {
    var beginnerCourses = this.state.filterCourses.filter(course => course.level === "beginner")
    this.setState({
      filterCourses: beginnerCourses
    })
  }

  showIntermediateCourses = () => {
    var intermediateCourses = this.state.filterCourses.filter(course => course.level === "intermediate")
    this.setState({
      filterCourses: intermediateCourses
    })
  }

  showAdvancedCourses = () => {
    var advancedCourses = this.state.filterCourses.filter(course => course.level === "advanced")
    this.setState({
      filterCourses: advancedCourses
    })
  }

  render() {
    console.log(this.state.showCourses)
    return (
      <React.Fragment>
        <div className="compare-grid">
          <div>
            <Card className="filter-card">
              <Card.Title>Price Range</Card.Title>
              <Form.Group controlId="formBasicChecbox">
                <Form.Check onClick={this.showAnyPriceFilter} type="checkbox" label="Any price" />
                <Form.Check onClick={this.showPriceFirsFilter}  type="checkbox" label="Under $500" />
                <Form.Check onClick={this.showPriceSecondFilter} type="checkbox" label="Between $500 and $1000" />
                <Form.Check onClick={this.showPriceThirdFilter} type="checkbox" label="More than $1000" />
              </Form.Group>
            </Card>
            <Card className="filter-card">
              <Card.Title>Level</Card.Title>
              <Form.Group controlId="formBasicChecbox">
                <Form.Check onClick={this.showAllLevelCourses} type="checkbox" label="All levels" />
                <Form.Check onClick={this.showBeginnerCourses} type="checkbox" label="Beginner" />
                <Form.Check onClick={this.showIntermediateCourses} type="checkbox" label="Intermediate" />
                <Form.Check onClick={this.showAdvancedCourses} type="checkbox" label="Advanced" />
              </Form.Group>
            </Card>
            <Card className="filter-card">
              <Card.Title>Course Station Ranking<i className="course-station-icon-compare" className="fas fa-space-shuttle"></i></Card.Title>
              <Form.Group controlId="formBasicChecbox">
                <div className="filter-card-stars">
                  <Form.Check type="checkbox" label="Five stars" />
                  <div className="filter-card-stars-icons">
                    <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                  </div>
                </div>
                <div className="filter-card-stars">
                  <Form.Check type="checkbox" label="Four stars" />
                  <div  className="filter-card-stars-icons">
                    <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                  </div>
                </div>
                <div className="filter-card-stars">
                  <Form.Check type="checkbox" label="Three stars" />
                  <div  className="filter-card-stars-icons">
                    <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                  </div>
                </div>
                <div className="filter-card-stars">
                  <Form.Check type="checkbox" label="Two stars" />
                  <div  className="filter-card-stars-icons">
                    <i className="fas fa-star"></i><i className="fas fa-star"></i>
                  </div>
                </div>
                <div className="filter-card-stars">
                  <Form.Check type="checkbox" label="One stars" />
                  <div  className="filter-card-stars-icons">
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </Form.Group>
            </Card>
          </div>
          <div className="compare-courses">
          {
            this.state.filterCourses.length === 0 &&
            this.state.courses.map(course => {
              return (
                <Card className="compare-card">
                  <Card.Img  className="compare-card-image" variant="top" src={course.image} />
                  <div className="compare-card-second-column">
                    <Card.Title className="courses-container-card-title">{course.title}</Card.Title>
                      {course.instructors.length > 0 &&
                        <ListGroup.Item className="compare-card-instructor">Instructor {course.instructors[0]}</ListGroup.Item>
                      }
                      <div className="courses-container-card-details">
                        <Card.Img className="courses-container-card-plattform-image" variant="top" src={course.plattform} />
                        <ListGroup.Item><i class="fas fa-hand-holding-usd"></i>${course.price}</ListGroup.Item>
                        <ListGroup.Item>Level: {course.level}</ListGroup.Item>
                        <ListGroup.Item>{course.comments.Rating}</ListGroup.Item>
                        <ListGroup.Item className="compare-course-go-button"><Link to={`/course/${course._id}`}><Button variant="outline-primary">Go</Button></Link></ListGroup.Item>
                      </div>
                  </div>
                </Card>
              );
            })
          }
          {
            this.state.filterCourses.length > 0 &&
            this.state.filterCourses.map(course => {
              return (
                <Card className="compare-card">
                  <Card.Img  className="compare-card-image" variant="top" src={course.image} />
                  <div className="compare-card-second-column">
                    <Card.Title className="courses-container-card-title">{course.title}</Card.Title>
                      {course.instructors.length > 0 &&
                        <ListGroup.Item className="compare-card-instructor">Instructor {course.instructors[0]}</ListGroup.Item>
                      }
                      <div className="courses-container-card-details">
                        <Card.Img className="courses-container-card-plattform-image" variant="top" src={course.plattform} />
                        <div><i class="fas fa-hand-holding-usd"></i>${course.price}</div>
                        <div>Level: {course.level}</div>
                        <div>{course.comments.Rating}</div>
                        <div className="compare-course-go-button"><Link to={`/course/${course._id}`}><Button variant="outline-primary">Go</Button></Link></div>
                      </div>
                  </div>
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
