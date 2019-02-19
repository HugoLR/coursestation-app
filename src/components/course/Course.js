import React, { Component } from 'react';

const API_URL = "http://localhost:3001/api/v1"

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: []
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
          course: data.courses
        })
      })
      .catch(err => {
        console.log(`err: ${err}`)
      })
  }

  render() {
    console.log(this.props)
    return (
      <React.Fragment>
        <h1>Este es Course</h1>
        <div>
          <h2>{this.state.course.title}</h2>
          <p>{this.state.course.instructors}</p>
          <button>Writte review</button>
        </div>
      </React.Fragment>
    );
  }
}

export default Course;
