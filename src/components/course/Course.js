import React, { Component } from 'react';


import "./course.css"
import Image from "react-bootstrap/Image"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import StarRatingComponent from "react-star-rating-component"


const API_URL = "https://limitless-hamlet-19794.herokuapp.com/api/v1"

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      comments: 0,
      show: false,
      rating: 1,
      commentText: "",
      user: this.props.user
    }
  }


  componentDidMount() {
    fetch(`${API_URL}/courses/${this.props.match.params.courseId}/`, {
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          course: data.courses,
          comments: data.courses.comments.length
        })
      })
      .catch(err => {
        console.log(`err: ${err}`)
      })
  }


  handleClose = () => {
    this.setState({show: false});
  }

  handleShow = () => {
    this.setState({show: true});
  }

  onStarClick = (nextValue, prevValue, name) =>{
   this.setState({rating: nextValue});
 }

 handleTextComment = (e) => {
   e.preventDefault()
   this.setState({commentText:e.target.value})
 }

  onCreateReview = () => {
  fetch(`${API_URL}/users/${this.state.user._id}/comments`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text:this.state.commentText,
      ratings:this.state.rating,
      username:this.state.user.username,
      course:this.props.match.params.courseId,
    })
  })

  this.handleClose()
  alert("Thank your comment will help other students")
}

  render() {

    //Variable para manejar las estrellas del rating
    const { rating } = this.state

    return (
      <React.Fragment>
        <h1>Este es Course</h1>
        <div className="course-uniquecard">
          <div className="course-description">
            <h2>{this.state.course.title}</h2>
            <p>Description</p>
            <p>{this.state.course.instructors}</p>
            <div className="course-specific-information">
              <Image height={60} width={60} src={this.state.course.plattform} />
              <p>Rating</p>
              <p>level</p>
              <p>comments length</p>
            </div>
          </div>
          <div className="course-second-card">
            <Image className="course-logo-image" src={this.state.course.image} />
            <div className="course-buttons">
              <button onClick={this.handleShow} className="course-button">Write a review</button>
              <button className="course-button">Go to the course </button>
            </div>
          </div>
        </div>
        <div>
          <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title className="modal-title">Review {this.state.course.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h3 className="modal-question-one">Rate this Course</h3>
                <div className="modal-star-container">
                  <StarRatingComponent className="modal-star-review"
                    name="rate1"
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                  />
                </div>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label className="modal-question-two"><h3 className="modal-question-two">Write a Review</h3></Form.Label>
                  <Form.Control as="textarea" rows="3" name="text" value={this.state.commentText} onChange={this.handleTextComment} />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                <Button  onClick={this.onCreateReview} >
                  Submit Review
                </Button>
              </Modal.Footer>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default Course;
