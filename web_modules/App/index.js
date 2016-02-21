import React, { Component, PropTypes } from "react"
import mapActionsToKeys from "react-keybindings"
//import Overview from "Overview"
//import Sidebar from "Sidebar"
import * as KeyActionTypes from "../../src/constants/KeyActionTypes"
import "./styles"

class App extends Component {
  componentDidMount() {
    this.refs.app.focus()
  }

  render() {
    return (
      <div
        ref="app"
        tabIndex={ 0 }
        className="ad-App">
        { this.props.children }
        { /* <Sidebar { ...this.props } />
        <Overview { ...this.props } /> */ }
      </div>
    )
  }
}

App.propTypes = {
  keyActions: PropTypes.array.isRequired,
}

export default mapActionsToKeys({
  [KeyActionTypes.APP_CTRL]: "ctrl",
  [KeyActionTypes.APP_SHIFT]: "shift",
  [KeyActionTypes.SIDEBAR_DEL]: "delete",
  [KeyActionTypes.OVERVIEW_DEL]: "delete",
})(App)
