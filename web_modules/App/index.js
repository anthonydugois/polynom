import React, { Component, PropTypes } from "react"
import mapActionsToKeys from "react-keybindings"
import Overview from "Overview"
import Sidebar from "Sidebar"
import {
  APP_CTRL,
  APP_SHIFT,
  OVERVIEW_DEL,
} from "../../src/constants/KeyActionTypes"
import "./styles"

class App extends Component {
  render() {
    return (
      <div
        tabIndex={ 1 }
        className="ad-App">
        <Sidebar { ...this.props } />
        <Overview { ...this.props } />
      </div>
    )
  }
}

App.propTypes = {
  keyActions: PropTypes.array.isRequired,
}

export default mapActionsToKeys({
  [APP_CTRL]: "ctrl",
  [APP_SHIFT]: "shift",
  [OVERVIEW_DEL]: "delete",
})(App)
