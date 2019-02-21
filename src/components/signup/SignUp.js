import React, { Component } from 'react';

import "./signup.css"

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignUp extends Component {

  onSignUp = (e) => {
    e.preventDefault();

    const API_URL = "https://limitless-hamlet-19794.herokuapp.com/api/v1"
    fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: e.target.name.value,
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data.message === "User created succesfully") {
        alert("You have successfully registered")
        this.props.history.push("/login");
      }
    })
  }

  render() {
    return (
      <div className="signup-container">
        <Form  className="signup-form" onSubmit={ this.onSignUp}>
          <Form.Group controlId="formGroupName">
            <Form.Label className="signup-part">Name</Form.Label>
            <Form.Control name="name" type="text" placeholder="Enter your name" />
          </Form.Group>
          <Form.Group controlId="formGroupUsername">
            <Form.Label className="signup-part">Username</Form.Label>
            <Form.Control name="username" type="text" placeholder="Enter a username" />
          </Form.Group>
          <Form.Group controlId="formGroupEmail">
            <Form.Label className="signup-part">Email address</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label className="signup-part">Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create Account
          </Button>
        </Form>
      </div>
    )
  }
}

export default SignUp;
