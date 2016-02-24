import React, { Component, PropTypes } from "react"
import { DragDropContext } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"
import Button from "Button"
import SidebarPanel from "Sidebar/SidebarPanel"
import SidebarModule from "Sidebar/SidebarModule"
import SidebarActions from "Sidebar/SidebarActions"
import SidebarPath from "SidebarPath"
import "./styles"

class SidebarPaths extends Component {
  handleAddClick = () => {
    const { width, height } = this.props.project

    this.props.onAddClick(width / 2, height / 2)
  };

  handleRemoveClick = () => {
    this.props.onRemoveClick(this.props.activePaths)
  };

  renderSidebarPath = (key) => {
    const {
      keyActions,
      pathsById,
      project,
      activePaths,
      activePoints,
    } = this.props

    return (
      <SidebarPath
        key={ key }
        keyActions={ keyActions }
        project={ project }
        path={ pathsById[key] }
        activePaths={ activePaths }
        activePoints={ activePoints } />
    )
  };

  render() {
    const { project, activePaths } = this.props

    return (
      <SidebarPanel>
        <SidebarModule>
          { project.paths.map(this.renderSidebarPath) }
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
  pathsById: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  activePaths: PropTypes.array.isRequired,
  activePoints: PropTypes.array.isRequired,
}

export default DragDropContext(HTML5Backend)(SidebarPaths)
