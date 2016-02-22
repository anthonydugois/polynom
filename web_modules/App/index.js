import React, { Component } from "react"
import { Link } from "react-router"
import "./styles"

class App extends Component {
  render() {
    return (
      <div className="ad-App">
        <Link to="/projects/0">Project 0</Link>
        { this.props.children }
      </div>
    )
  }
}

App.propTypes = {}

export default App
