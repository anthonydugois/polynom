import "./styles"

import React, { Component, PropTypes } from "react"
import Navbar from "Navbar"

class App extends Component {
  render() {
    return (
      <div className="ad-App">
        <Navbar />
        { this.props.children }
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
}

export default App
