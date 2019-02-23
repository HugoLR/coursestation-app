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
      filterCourses: []

    }
  }

  componentDidMount(){

    const news = this.props.courses.map(course => {

      if ( typeof course.price !== "undefined" ) {
        return course
      }

      if ( course.title.includes("Introduction") ) {
        course.level = "beginner"
        course.price = 746
        return course
      }

      if ( course.title.includes("Advance") ) {
        course.level = "advanced"
        course.price = 746
        return course
      }

      if ( !course.title.includes("Advance") && !course.title.includes("Introduction") ) {
        course.level = "intermediate"
        course.price = 746
        return course
      }


    })
    this.setState({courses: news, filterCourses: news})
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
      courses: allLevelCourses
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
    console.log(this.state.courses)
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
          </div>
          <div className="compare-courses">
          {

            this.state.filterCourses.map(course => {
              return (
                <Card className="compare-card">
                  <div className="compare-card-image-container">
                  {
                    typeof course.image === "undefined" &&
                    <Card.Img  className="compare-card-image" variant="top" src={course.thumbnail} style={{width: '255px', height: '228px'}} />
                  }
                  {
                    typeof course.thumbnail === "undefined" &&
                    <Card.Img  className="compare-card-image" variant="top" src={course.image} style={{width: '255px', height: '228px'}} />
                  }


                  </div>
                  <div className="compare-card-second-column">
                    <Card.Title className="courses-container-card-title">{course.title}</Card.Title>
                    { (typeof course.summary == "undefined"  && typeof course.instructors !== "undefined") &&

                    <ListGroup.Item className="compare-card-instructor">Instructor {course.instructors[0]}</ListGroup.Item>
                    }
                    { typeof course.instructors == "undefined"  &&

                      <ListGroup.Item className="compare-card-instructor">Instructor {course.summary.split(" ").slice(0, 1).join(" ")}</ListGroup.Item>
                    }

                      <div className="courses-container-card-details">
                        {
                          typeof course.plattform !== "undefined" &&
                          <img className="courses-container-card-plattform-image"  src={course.plattform} />
                        }
                        {
                          typeof course.plattform === "undefined" &&
                          <img style={{width:"113.52px", height:"59.59px"}} className="courses-container-card-plattform-image"  src="https://pbs.twimg.com/profile_images/911069740164108289/ZiVAi6zG_400x400.jpg" />

                        }

                        <ListGroup.Item><i class="fas fa-hand-holding-usd"></i>${course.price}</ListGroup.Item>
                        <ListGroup.Item>Level: {course.level}</ListGroup.Item>

                        {
                          typeof course._id === "undefined" &&
                          <ListGroup.Item className="compare-course-go-button"><Link to={`/course/${course._id}`}><Button variant="outline-primary">Go</Button></Link></ListGroup.Item>
                        }
                        { typeof course._id !== "undefined" &&
                          <ListGroup.Item className="compare-course-go-button"><Link to={`/course/${course._id}`}><Button variant="outline-primary">Go</Button></Link></ListGroup.Item>
                        }
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
