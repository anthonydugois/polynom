import React, { Component, PropTypes } from "react"
import { Provider } from "react-redux"
import DevTools from "DevTools"

class Root extends Component {
  render() {
    return (
      <Provider store={ this.props.store }>
        <div>
          { this.props.children }
          <DevTools />
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.any,
  children: PropTypes.any,
}

export default Root
