import React, { Component } from 'react';
// import Form from "react-bootstrap/Form"
// import Button from "react-bootstrap/Button"
import {Link} from "react-router-dom"


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newquery:''
    }
  }



  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      newquery: e.target.value
    })
  }

  render() {
    console.log(this.props)
    return (
      <React.Fragment>
      
        <label>
          <input type="text" value={this.state.newquery} onChange={this.handleChange} />
        </label>
        <Link to="/courses"><button onClick={() => this.props.onChangeValue(this.state.newquery)}>Search</button></Link>
      </React.Fragment>
    );
  }
}

export default Home;
