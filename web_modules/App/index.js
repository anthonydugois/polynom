import React, { Component } from "react"
import "./styles"

class App extends Component {
  render() {
    return (
      <div className="ad-App">
        { this.props.children }
      </div>
    )
  }
}

App.propTypes = {}

export default App
