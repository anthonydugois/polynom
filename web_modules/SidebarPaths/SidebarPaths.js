import React, { Component, PropTypes } from "react"
import Button from "Button"
import SidebarPanel from "Sidebar/SidebarPanel"
import SidebarModule from "Sidebar/SidebarModule"
import SidebarActions from "Sidebar/SidebarActions"
import SidebarPath from "SidebarPath"
import "./styles"

class SidebarPaths extends Component {
  handleAddClick = () => {
    const { width, height } = this.props.builder

    this.props.onAddClick(width / 2, height / 2)
  };

  handleRemoveClick = () => {
    this.props.onRemoveClick(this.props.activePaths)
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
    const { builder, activePaths } = this.props

    return (
      <SidebarPanel>
        <SidebarModule>
          { builder.paths.map(this.renderSidebarPath) }
        </SidebarModule>

        <SidebarActions>
          <Button onClick={ this.handleAddClick }>
            New path
          </Button>

          { activePaths.length > 0 && (
            <Button
              icon="delete"
              type="delete"
              onClick={ this.handleRemoveClick } />
          ) }
        </SidebarActions>
      </SidebarPanel>
    )
  }
}

SidebarPaths.propTypes = {
  onAddClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  keyActions: PropTypes.array.isRequired,
  builder: PropTypes.object.isRequired,
  pathsById: PropTypes.object.isRequired,
  activePaths: PropTypes.array.isRequired,
}

export default SidebarPaths
