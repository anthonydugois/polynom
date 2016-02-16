import React, { Component, PropTypes } from "react"
import Button from "Button"
import SidebarPath from "SidebarPath"
import "./styles"

class SidebarPaths extends Component {
  handleAddClick = () => {
    const { width, height } = this.props.builder

    this.props.onAddClick(width / 2, height / 2)
  };

  renderSidebarPath = (key) => {
    const path = this.props.pathsById[key]

    return (
      <SidebarPath
        key={ key }
        path={ path }
        keyActions={ this.props.keyActions } />
    )
  };

  render() {
    const { builder } = this.props

    return (
      <div className="ad-SidebarPaths">
        <div className="ad-SidebarPaths-module">
          { builder.paths.map(this.renderSidebarPath) }
        </div>

        <div className="ad-SidebarPaths-actions">
          <Button onClick={ this.handleAddClick }>
            New path
          </Button>
        </div>
      </div>
    )
  }
}

SidebarPaths.propTypes = {
  onAddClick: PropTypes.func.isRequired,
  keyActions: PropTypes.array.isRequired,
  builder: PropTypes.object.isRequired,
  pathsById: PropTypes.object.isRequired,
}

export default SidebarPaths
