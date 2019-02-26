import React, { Component } from 'react';

import "./course.css";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import StarRatingComponent from "react-star-rating-component";
import Card from "react-bootstrap/Card"

const Nexmo = require('nexmo');
const moment = require('moment');

const API_URL = "https://limitless-hamlet-19794.herokuapp.com/api/v1"

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      comments: "",
      show: false,
      smShow: false,
      rating: 1,
      commentText: "",
      user: this.props.user,
      commentsByCourse: [],
      ownerComment: [],
      ratingStars:[],
      editShow:false,
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
        // console.log(data)
        this.setState({
          course: data.courses,
        })
      }).then(this.showComents())
      .catch(err => {
        console.log(`err: ${err}`)
      })
  }

 sendMessage = () => {
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
    this.setState({
      show: false,
      smShow: false,
      editShow:false
    });
  }

  handleShow = () => {
    this.setState({show: true});
  }

  onStarClick = (nextValue, prevValue, name) => {
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
        // console.log(data.data)

        this.setState({
          commentsByCourse: data.data,
          comments: data.coincidences
        })
        const actuallComment = data.data.filter(comment =>{
          if (comment.user === this.state.user._id) {
            this.setState({
              ownerComment:comment
            })
          }
        })
        const average = []
        data.data.map(comment => {
          average.push(comment.ratings)
        })
        const sum = average.reduce(((partial_sum, a) => partial_sum + a))
        this.setState({
          ratingStars: sum/average.length
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
  // this.sendMessage()
  this.handleClose()
  alert("Thanks, your comment will help other students")
}

  onUpdateComment = () => {
    fetch(`${API_URL}/users/${this.state.user._id}/comments`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        commentId: this.state.ownerComment._id,
        text:this.state.commentText,
        ratings:this.state.rating
      })
    })

    this.handleClose()
  }

  onDeletComment = () => {
    // console.log("Esta es la variable que querio",  this.state.ownerComment._id)
    fetch(`${API_URL}/users/${this.state.user._id}/comments`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        commentId: this.state.ownerComment._id
      })
    })

    this.handleClose()
  }

  onSubmitChanges = () => {
    this.onCreateReview()
    this.showComents()
  }

  onUpdateChanges = () => {
    this.onUpdateComment()
    this.showComents()
  }

  onDeleteChanges = () => {
    this.onDeletComment()
    this.showComents()
  }

  render() {
    console.log("Este es el comentario que quiero", this.state.ratingStars)
    //Variable para manejar las estrellas del rating
    const { rating } = this.state

    //Variable para modal de eliminar comentarios
    let smClose = () => this.setState({ smShow: false });

    //Variable para la fecha del comentario
    const commentDate = this.state.ownerComment.date

    return (
      <div className="course-route-container">
        <Card className="course-uniquecard">
          <Card className="course-uniquecard-characteristics">
            <div className="course-uniquecard-main_information">
              <h3 className="text space">{this.state.course.title}</h3>
              <p className="text space">Take {this.state.course.title} with {this.state.course.instructors}</p>
              <p className="text space">{this.state.course.instructors}</p>
            </div>
            <div className="course-uniquecard-second_information">
              <Image className="course-uniquecard-image-plattform" src={this.state.course.plattform}/>
              <div className="course-uniquecard-average-ratings">
                <p className="text">Course Station Rating {this.state.ratingStars}</p>
                {
                  Math.floor(this.state.ratingStars) === 1 &&
                  <div className="average-ratings-stars">
                    <i className="fas fa-star"></i>
                  </div>
                }
                {
                  Math.floor(this.state.ratingStars) === 2 &&
                  <div className="average-ratings-stars">
                    <i className="fas fa-star"></i><i className="fas fa-star"></i>
                  </div>
                }
                {
                  Math.floor(this.state.ratingStars) === 3 &&
                  <div className="average-ratings-stars">
                    <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                  </div>
                }
                {
                  Math.floor(this.state.ratingStars) === 4 &&
                  <div className="average-ratings-stars">
                    <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                  </div>
                }
                {
                  Math.floor(this.state.ratingStars) === 5 &&
                  <div className="average-ratings-stars">
                    <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                  </div>
                }
              </div>
              <div className="level-and-comments-length-container">
                <p className="text">Level {this.state.course.level}</p>
                <p className="text comments-length"><i class="far fa-comments"></i>{this.state.comments}</p>
              </div>
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

        <Modal
        size="sm"
        show={this.state.smShow}
        onHide={smClose}
        aria-labelledby="example-modal-sizes-title-sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Are you sure you want to delete your comment?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button onClick={this.onDeleteChanges}>
            Delete
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={this.state.editShow} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 className="modal-question-one">Update Rate</h3>
          <div className="modal-star-container">
            <StarRatingComponent className="modal-star-review"
              name="rate1"
              starCount={5}
              value={rating}
              onStarClick={this.onStarClick.bind(this)}
            />
          </div>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="modal-question-two"><h3 className="modal-question-two">Update a Review</h3></Form.Label>
            <Form.Control as="textarea" rows="3" name="text" value={this.state.commentText} onChange={this.handleTextComment}  />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button  onClick={this.onUpdateChanges} >
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
        <div className="actual-date">
          <p className="actual-date-comment">{this.state.comments} comments</p>
          <p>{moment(Date.now()).format('MMMM Do YYYY')}</p>
        </div>
        {
          this.state.commentsByCourse.map(comment => {
            return (
              <div className="user-comments-container">
                <div className="user-comments-rating">
                    <p className="comment-text"><i class="fas fa-user-astronaut"></i>{comment.username}</p>
                    <p className="comment-text-review">{comment.text}</p>
                </div>
                <div className="comments-icons">
                  <div className="comments-icons-date-rating-wrapper">
                    <p className="comment-date">{moment(comment.date).format('MMMM Do YYYY')}</p>
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
                  comment.ratings === 5 &&
                  <div className="comments-rating-byuser">
                    <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                  </div>
                }
                </div>
                {
                  this.state.user._id === comment.user &&
                  <div className="comments-crud-buttons">
                    <button className="comment-edit-button" onClick={() => this.setState({ editShow: true })}><i class="far fa-edit"></i></button>
                    <button className="comment-delete-button" onClick={() => this.setState({ smShow: true })}><i class="fas fa-trash-alt"></i></button>
                  </div>
                }
                </div>
              </div>
            )
          })
        }
      </div>
  );
}
}

export default Course;
