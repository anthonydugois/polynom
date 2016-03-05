import "./styles"

import React, { Component, PropTypes } from "react"
import { DragDropContext } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"
import Hint from "Hint"
import { ButtonPrimary, ButtonDelete } from "Button"
import Icon from "Icon"
import SidebarPanel from "Sidebar/SidebarPanel"
import SidebarModule from "Sidebar/SidebarModule"
import SidebarActions from "Sidebar/SidebarActions"
import SidebarPath from "SidebarPath"
import SidebarPathsLayer from "./SidebarPathsLayer"

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
    const {
      project,
      activePaths,
    } = this.props

    return (
      <SidebarPanel>
        { project.paths.length > 0 ? (
          <SidebarModule>
            { project.paths.map(this.renderSidebarPath) }
            <SidebarPathsLayer />
          </SidebarModule>
        ) : (
          <SidebarModule>
            <Hint
              icon="paths"
              title="No path">
              There is no path in this project. Create the first one!
            </Hint>
          </SidebarModule>
        ) }

        <SidebarActions>
          <ButtonPrimary onClick={ this.handleAddClick }>
            New path
          </ButtonPrimary>

          { activePaths.length > 0 && (
            <ButtonDelete onClick={ this.handleRemoveClick }>
              <Icon name="delete" />
            </ButtonDelete>
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
  project: PropTypes.object.isRequired,
  pathsById: PropTypes.object.isRequired,
  activePaths: PropTypes.array.isRequired,
  activePoints: PropTypes.array.isRequired,
}

export default DragDropContext(HTML5Backend)(SidebarPaths)
