import React, { Component } from 'react';


import "./course.css";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import StarRatingComponent from "react-star-rating-component";
import Card from "react-bootstrap/Card"

const Nexmo = require('nexmo');

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
      user: this.props.user,
      commentsByCourse: [],
      ratingStars:[]
    }
  }




  componentDidMount() {
    fetch(`${API_URL}/courses/${this.props.match.params.courseId}`, {
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
      }).then(this.showComents())
      .catch(err => {
        console.log(`err: ${err}`)
      })
  }

 send = () => {
    const nexmo = new Nexmo({
      apiKey: '8003c938',
      apiSecret: '5I5UdgaddIhaCix2'
    })

    const from = 'Nexmo'
    const to = '527225025782'
    const text = '!Has creado un comentario, gracias por ayudar a crecer la comunidad de Course Station'

    nexmo.message.sendSms(from, to, text)
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

 showComents = () => {
   fetch(`${API_URL}/courses/${this.props.match.params.courseId}/comments`, {
     method: 'GET',
     headers: {
       "Content-Type": "application/json"
     }
   }).then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          commentsByCourse: data.data,
          coments: data.coincidences,
        })
      })
      .catch(err => {
        console.log(`err: ${err}`)
      })
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
  this.send()
  this.handleClose()
  alert("Thank your comment will help other students")
}

  onSubmitChanges = () => {
    this.onCreateReview()
    this.showComents()
  }

  ratingAverage = () => {
    var sum = 0;
    for (var i = 0; i < this.state.course.commentsRating.length; i++) {
      sum += parseInt(this.state.course.commentsRating[i], 10)
      this.setState({
        ratingStars: sum/this.state.comments
      })
    }
    console.log(this.state.ratingStars)
  }

  render() {
    console.log(this.state.course)
    //Variable para manejar las estrellas del rating
    const { rating } = this.state

    return (
        <div className="course-route-container">
          <Card className="course-uniquecard">
            <Card className="course-uniquecard-characteristics">
              <div className="course-uniquecard-main_information">
                <h3 className="text space">{this.state.course.title}</h3>
                <p className="text space">Learn {this.state.course.title} with {this.state.course.instructors}</p>
                <p className="text space">{this.state.course.instructors}</p>
              </div>
              <div className="course-uniquecard-second_information">
                <Image className="course-uniquecard-image-plattform" src={this.state.course.plattform}/>
                <p className="text">Rating average</p>
                <p className="text">Level {this.state.course.level}</p>
                <p className="text comments-length"><i class="far fa-comments"></i>{this.state.comments}</p>
              </div>
            </Card>
            <Card className="course-uniquecard-second_column">
              <Image className="course-uniquecard-image-course" src={this.state.course.image}/>
              <div className="course-uniquecard-second_column-buttons">
                <Button onClick={this.handleShow} className="course-uniquecard-second_column-button" variant="outline-primary">Comment</Button>
                <Button className="course-uniquecard-second_column-button" variant="outline-primary"><a href={`https://www.udemy.com${this.state.course.url}`} target="_blank">Go to the Course</a></Button>
              </div>
            </Card>
          </Card>

          <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header className="modal-header" closeButton>
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
                <Button  onClick={this.onSubmitChanges} >
                  Submit Review
                </Button>
              </Modal.Footer>
          </Modal>
          {
            this.state.commentsByCourse.map(comment => {
              return (
                <div className="user-comments-container">
                  <div className="user-comments-rating">
                      <p className="comment-text"><i class="fas fa-user-astronaut"></i>{comment.username}</p>
                      <p className="comment-text-review">{comment.text}</p>
                  </div>
                  {
                    comment.ratings === 1 &&
                    <div className="comments-rating-byuser">
                      <i className="fas fa-star"></i>
                    </div>
                  }
                  {
                    comment.ratings === 2 &&
                    <div className="comments-rating-byuser">
                      <i className="fas fa-star"></i><i className="fas fa-star"></i>
                    </div>
                  }
                  {
                    comment.ratings === 3 &&
                    <div className="comments-rating-byuser">
                      <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                    </div>
                  }
                  {
                    comment.ratings === 4 &&
                    <div className="comments-rating-byuser">
                      <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                    </div>
                  }
                  {
                    comment.ratings === 4 &&
                    <div className="comments-rating-byuser">
                      <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                    </div>
                  }
                  {
                    comment.ratings === 5 &&
                    <div className="comments-rating-byuser">
                      <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                    </div>
                  }
                </div>
              )
            })
          }
        </div>
    );
  }
}

export default Course;
