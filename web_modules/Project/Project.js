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

  handleKeyDown = (e) => {
    if (this.props.keyActions.length > 0) {
      e.preventDefault()
    }
  };

  render() {
    return (
      <div
        ref={ (project) => this.project = project }
        tabIndex={ 0 }
        className="ad-Project"
        onKeyDown={ this.handleKeyDown }>
        <div className="ad-Project-navbar">
          <Navbar />
        </div>
        <div className="ad-Project-layout">
          <Overview { ...this.props } />
          <Sidebar { ...this.props } />
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
