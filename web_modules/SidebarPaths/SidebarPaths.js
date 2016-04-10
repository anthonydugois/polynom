import "./styles"

import React, { Component, PropTypes } from "react"
import { DragDropContext } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"
import { SidebarActions, SidebarPanel, SidebarModule } from "Sidebar"
import { ButtonSquare } from "Button"
import Hint from "Hint"
import SidebarPath from "SidebarPath"
import SidebarPathsLayer from "./SidebarPathsLayer"
import {
  MdGesture,
  MdAdd,
  MdDelete,
} from "react-icons/lib/md"

class SidebarPaths extends Component {
  handleAddClick = () => {
    this.props.onAddClick(
      this.props.project.width / 2,
      this.props.project.height / 2
    )
  };

  handleRemoveClick = () => {
    this.props.onRemoveClick(this.props.activePaths)
  };

  renderSidebarPath = (key) => {
    const {
      keyActions,
      pathsById,
      pointsById,
      project,
      activePaths,
      activePoints,
    } = this.props

    const points = pathsById[key].points.reduce((acc, key) => ({
      ...acc,
      [pointsById[key].id]: pointsById[key],
    }), {})

    const paths = project.paths.reduce((acc, key) => ({
      ...acc,
      [pathsById[key].id]: pathsById[key],
    }), {})

    return (
      <SidebarPath
        key={ key }
        onActivate={ this.props.onActivate }
        onDeactivate={ this.props.onDeactivate }
        onPathMove={ this.props.onPathMove }
        onNameChange={ this.props.onNameChange }
        onPathCodeChange={ this.props.onPathCodeChange }
        onRelativeChange={ this.props.onRelativeChange }
        onClosedChange={ this.props.onClosedChange }
        onFilledChange={ this.props.onFilledChange }
        keyActions={ keyActions }
        projectId={ project.id }
        projectPaths={ project.paths }
        path={ pathsById[key] }
        pathsById={ paths }
        pointsById={ points } />
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
          <SidebarModule style={{ padding: "1.25rem" }}>
            <Hint
              icon={ <MdGesture size="2rem" /> }
              title="No path">
              There is no path yet in this project. Create the first one!
            </Hint>
          </SidebarModule>
        ) }

        <SidebarActions>
          <ButtonSquare
            size="3rem"
            type="action"
            onClick={ this.handleAddClick }>
            <MdAdd size="1rem" />
          </ButtonSquare>

          { activePaths.length > 0 && (
            <ButtonSquare
              size="3rem"
              type="action"
              onClick={ this.handleRemoveClick }>
              <MdDelete size="1rem" />
            </ButtonSquare>
          ) }
        </SidebarActions>
      </SidebarPanel>
    )
  }
}

SidebarPaths.propTypes = {
  onAddClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onActivate: PropTypes.func.isRequired,
  onDeactivate: PropTypes.func.isRequired,
  onPathMove: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onPathCodeChange: PropTypes.func.isRequired,
  onRelativeChange: PropTypes.func.isRequired,
  onClosedChange: PropTypes.func.isRequired,
  onFilledChange: PropTypes.func.isRequired,
  keyActions: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
  pathsById: PropTypes.object.isRequired,
  pointsById: PropTypes.object.isRequired,
  activePaths: PropTypes.array.isRequired,
  activePoints: PropTypes.array.isRequired,
}

export default DragDropContext(HTML5Backend)(SidebarPaths)
