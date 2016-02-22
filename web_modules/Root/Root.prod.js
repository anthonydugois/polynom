import React, { Component, PropTypes } from "react"
import { Provider } from "react-redux"

class Root extends Component {
  render() {
    return (
      <Provider store={ this.props.store }>
        { this.props.children }
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.any,
  children: PropTypes.any,
}

export default Root
