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

  componentWillUnmount() {
    this.props.clearHistory()
  }

  handleKeyDown = (e) => {
    const { keyActions } = this.props

    if (keyActions.includes(KeyActionTypes.APP_UNDO)) {
      e.preventDefault()
      this.props.undo()
    }

    if (keyActions.includes(KeyActionTypes.APP_REDO)) {
      e.preventDefault()
      this.props.redo()
    }
  };

  render() {
    return (
      <div
        ref={ (project) => this.project = project }
        tabIndex={ 0 }
        className="ad-Project"
        onKeyDown={ this.handleKeyDown }>
        <Navbar { ...this.props } />
        <div className="ad-Project-content">
          <Overview { ...this.props } />
          <Sidebar { ...this.props } />
        </div>
      </div>
    )
  }
}

Project.propTypes = {
  undo: PropTypes.func.isRequired,
  redo: PropTypes.func.isRequired,
  clearHistory: PropTypes.func.isRequired,
  keyActions: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
}

export default mapActionsToKeys({
  [KeyActionTypes.APP_CTRL]: "ctrl",
  [KeyActionTypes.APP_SHIFT]: "shift",
  [KeyActionTypes.APP_UNDO]: "ctrl+z",
  [KeyActionTypes.APP_REDO]: "ctrl+y",
  [KeyActionTypes.SIDEBAR_DEL]: "delete",
  [KeyActionTypes.OVERVIEW_DEL]: "delete",
  [KeyActionTypes.OVERVIEW_UP]: "up",
  [KeyActionTypes.OVERVIEW_DOWN]: "down",
  [KeyActionTypes.OVERVIEW_LEFT]: "left",
  [KeyActionTypes.OVERVIEW_RIGHT]: "right",
  [KeyActionTypes.OVERVIEW_ZOOM_PLUS]: ["ctrl", 107],
  [KeyActionTypes.OVERVIEW_ZOOM_MINUS]: ["ctrl", 109],
})(Project)
