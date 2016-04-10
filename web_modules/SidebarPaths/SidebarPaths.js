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
import { CTRL, SHIFT } from "../../src/constants/KeyActionTypes"

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

  onPathClick = (path) => {
    const {
      keyActions,
      project,
      activePaths,
      activePoints,
      pathsById,
    } = this.props

    if (!keyActions.includes(CTRL)) {
      this.props.onDeactivate(activePaths, activePoints)
    }

    if (keyActions.includes(SHIFT)) {
      const pathIndex = project.paths.indexOf(path.id)
      const activePathIndex = project.paths.indexOf(activePaths[0])
      const pathIds = pathIndex < activePathIndex ?
        project.paths.slice(pathIndex, activePathIndex + 1) :
        project.paths.slice(activePathIndex, pathIndex + 1)

      const pointIds = pathIds.reduce((acc, key) => [
        ...acc,
        ...pathsById[key].points,
      ], [])

      this.props.onActivate(pathIds, pointIds)
    } else {
      this.props.onActivate([path.id], path.points)
    }
  };

  renderSidebarPath = (key) => {
    const {
      pathsById,
      pointsById,
      project,
    } = this.props

    const path = pathsById[key]
    const reducedPointsById = path.points.reduce((acc, key) => ({
      ...acc,
      [pointsById[key].id]: pointsById[key],
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
        onBorderedChange={ this.props.onBorderedChange }
        onPathClick={ this.onPathClick }
        path={ path }
        project={ project }
        pointsById={ reducedPointsById } />
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
  onBorderedChange: PropTypes.func.isRequired,
  keyActions: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
  pathsById: PropTypes.object.isRequired,
  pointsById: PropTypes.object.isRequired,
  activePaths: PropTypes.array.isRequired,
  activePoints: PropTypes.array.isRequired,
}

export default DragDropContext(HTML5Backend)(SidebarPaths)
