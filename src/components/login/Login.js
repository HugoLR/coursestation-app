import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import "./login.css";

class Login extends Component {
  state = {
    error: {
      status:false,
      message: ''
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const API_URL = "https://limitless-hamlet-19794.herokuapp.com/api/v1"

    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value
      })
    })
    .then(response => response.json())
    .then(data => {
      if(typeof data.token !== "undefined") {
        localStorage.setItem("token", data.token);
        const url = window.decodeURIComponent(this.props.location.search);
        if (url !== "") {
          alert("You login in Course Station")
          this.props.history.push("/" + url.split("/")[1]);
        } else {
          alert("You login in Course Station")
          window.location.reload(this.props.history.push("/"));
        }
      } else {
        this.setState({
          error:{
            status:true,
            message: data.message
          }
        })
      }
    })
    .catch(e => alert(e))
  }

  render() {
    return (
      <div className="login-container">
        <Form className="login-form" onSubmit={ this.onSubmit }>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="login-part">Email address</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="login-part">Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Password" />
          </Form.Group>
          { this.state.error.status && <p>{ this.state.error.message }</p>}
          <Button variant="primary" type="submit">
            Log In
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
