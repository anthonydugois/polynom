import "./styles"

import React, { Component, PropTypes } from "react"
import mapActionsToKeys from "react-keybindings"
import Navbar from "Navbar"
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
        <div className="ad-Project-navbar">
          <Navbar />
        </div>
        <div className="ad-Project-layout">
          <div className="ad-Project-overview">
            <Overview { ...this.props } />
          </div>
          <div className="ad-Project-sidebar">
            <Sidebar { ...this.props } />
          </div>
        </div>
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
  [KeyActionTypes.OVERVIEW_ZOOM_PLUS]: ["ctrl", 107],
  [KeyActionTypes.OVERVIEW_ZOOM_MINUS]: ["ctrl", 109],
})(Project)
