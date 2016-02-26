import React, { Component, PropTypes } from "react"
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

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
}

export default App
