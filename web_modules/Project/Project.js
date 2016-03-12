import "./styles"

import React, { Component, PropTypes } from "react"
import mapActionsToKeys from "react-keybindings"
import Sidebar from "Sidebar"
import Overview from "Overview"
import * as KeyActionTypes from "../../src/constants/KeyActionTypes"

class Project extends Component {
  componentDidMount() {
    this.project.focus()
  }

  render() {
    return (
      <div
        ref={ (project) => this.project = project }
        tabIndex={ 0 }
        className="ad-Project">
        <Overview { ...this.props } />
        <Sidebar { ...this.props } />
      </div>
    )
  }
}

Project.propTypes = {
  keyActions: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
}

export default mapActionsToKeys({
  [KeyActionTypes.APP_CTRL]: "ctrl",
  [KeyActionTypes.APP_SHIFT]: "shift",
  [KeyActionTypes.SIDEBAR_DEL]: "delete",
  [KeyActionTypes.OVERVIEW_DEL]: "delete",
  [KeyActionTypes.OVERVIEW_UP]: "up",
  [KeyActionTypes.OVERVIEW_DOWN]: "down",
  [KeyActionTypes.OVERVIEW_LEFT]: "left",
  [KeyActionTypes.OVERVIEW_RIGHT]: "right",
})(Project)
