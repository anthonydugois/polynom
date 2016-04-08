import "./styles"

import React, { Component, PropTypes } from "react"
import mapActionsToKeys from "react-keybindings"
import Navbar from "Navbar"
import Sidebar from "Sidebar"
import Overview from "Overview"
import * as KeyActionTypes from "../../src/constants/KeyActionTypes"

class Project extends Component {
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
    const {
      params,
      project,
    } = this.props

    return (
      <div
        tabIndex={ 0 }
        className="ad-Project"
        onKeyDown={ this.handleKeyDown }>
        <Navbar
          project={ project }
          params={ params } />
        <div className="ad-Project-content">
          <Overview
            project={ project }
            params={ params } />
          <Sidebar
            project={ project }
            params={ params } />
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
  [KeyActionTypes.APP_UNDO]: "ctrl+z",
  [KeyActionTypes.APP_REDO]: "ctrl+y",
})(Project)
