import React, { Component, PropTypes } from "react"
import mapActionsToKeys from "react-keybindings"
import Sidebar from "Sidebar"
import Overview from "Overview"
import * as KeyActionTypes from "../../src/constants/KeyActionTypes"
import "./styles"

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
        <Sidebar { ...this.props } />
        <Overview { ...this.props } />
      </div>
    )
  }
}

Project.propTypes = {
  keyActions: PropTypes.array.isRequired,
}

export default mapActionsToKeys({
  [KeyActionTypes.APP_CTRL]: "ctrl",
  [KeyActionTypes.APP_SHIFT]: "shift",
  [KeyActionTypes.SIDEBAR_DEL]: "delete",
  [KeyActionTypes.OVERVIEW_DEL]: "delete",
})(Project)
