import React, { Component, PropTypes } from "react"
import { findDOMNode } from "react-dom"
import Grid from "Grid"
import Shape from "Shape"
import { APP_CTRL, OVERVIEW_DEL } from "../../src/constants/KeyActionTypes"
import * as ObjectTypes from "../../src/constants/ObjectTypes"
import "./styles"

function getStyles(props) {
  const { width, height } = props.project
  return { width, height }
}

class Overview extends Component {
  constructor(props) {
    super(props)

    this.isDragging = false
    this.coords = [0, 0]
    this.draggedPoint = null
    this.draggedObject = null
  }

  componentDidMount() {
    document.addEventListener("mousemove", this.handleMouseMove)
    document.addEventListener("mouseup", this.handleMouseUp)
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.handleMouseMove)
    document.removeEventListener("mouseup", this.handleMouseUp)
  }

  getCoords = (e) => {
    const { project } = this.props
    const { left, top } = findDOMNode(this).getBoundingClientRect()

    let x = Math.round(e.clientX - left)
    let y = Math.round(e.clientY - top)

    // grid snaping
    if (project.gridSnap) {
      x = project.gridSize * Math.round(x / project.gridSize)
      y = project.gridSize * Math.round(y / project.gridSize)
    }

    return [x, y]
  };

  handleMouseDown = (e, draggedPoint, draggedObject) => {
    this.isDragging = true
    this.coords = this.getCoords(e)
    this.draggedPoint = draggedPoint
    this.draggedObject = draggedObject
  };

  handleMouseUp = (e) => {
    if (this.isDragging) {
      this.isDragging = false
      this.coords = this.getCoords(e)
    }
  };

  handleMouseMove = (e) => {
    if (this.isDragging) {
      e.preventDefault()

      const coords = this.getCoords(e)

      switch (this.draggedObject) {
      case ObjectTypes.PATH:
      case ObjectTypes.POINT:
        this.movePoints(coords)
        break

      case ObjectTypes.POINT_ANCHOR_1:
        this.moveFirstAnchor(coords)
        break

      case ObjectTypes.POINT_ANCHOR_2:
        this.moveSecondAnchor(coords)
        break
      }
    }
  };

  movePoints(coords) {
    const { activePoints } = this.props
    const dx = coords[0] - this.coords[0]
    const dy = coords[1] - this.coords[1]

    this.coords = coords

    if (dx !== 0) {
      this.props.onXPositionsChange(activePoints, dx)
    }

    if (dy !== 0) {
      this.props.onYPositionsChange(activePoints, dy)
    }
  }

  moveFirstAnchor(coords) {
    this.props.onParametersChange(this.draggedPoint, {
      x1: coords[0],
      y1: coords[1],
    })
  }

  moveSecondAnchor(coords) {
    this.props.onParametersChange(this.draggedPoint, {
      x2: coords[0],
      y2: coords[1],
    })
  }

  handleOverviewMouseDown = (e) => {
    const { pathsById, activePaths, activePoints } = this.props

    if (this.props.keyActions.includes(APP_CTRL)) {
      const [x, y] = this.getCoords(e)

      if (activePaths.length === 1) {
        const path = pathsById[activePaths[0]]

        this.props.onOverviewCreatePoint(path.id, "L", x, y, {})
      } else {
        this.props.onOverviewCreatePath(x, y)
      }
    } else {
      this.props.onDeactivate(activePaths, activePoints)
    }
  };

  handleKeyDown = (e) => {
    const { keyActions, activePoints } = this.props

    if (keyActions.includes(OVERVIEW_DEL) && activePoints.length > 0) {
      e.preventDefault()
      this.props.onOverviewDelete(activePoints)
    }
  };

  renderShape = (key) => {
    const {
      onActivate,
      onDeactivate,
      keyActions,
      pathsById,
      pointsById,
      activePaths,
      activePoints,
    } = this.props

    return (
      <Shape
        key={ key }
        onActivate={ onActivate }
        onDeactivate={ onDeactivate }
        keyActions={ keyActions }
        path={ pathsById[key] }
        pointsById={ pointsById }
        activePaths={ activePaths }
        activePoints={ activePoints }
        onMouseDown={ this.handleMouseDown } />
    )
  };

  render() {
    const { project } = this.props

    return (
      <svg
        tabIndex={ 1 }
        className="ad-Overview"
        style={ getStyles(this.props) }
        onMouseDown={ this.handleOverviewMouseDown }
        onKeyDown={ this.handleKeyDown }>
        <Grid project={ project } />

        { project.paths.map(this.renderShape) }
      </svg>
    )
  }
}

Overview.propTypes = {
  onActivate: PropTypes.func.isRequired,
  onDeactivate: PropTypes.func.isRequired,
  onOverviewCreatePath: PropTypes.func.isRequired,
  onOverviewCreatePoint: PropTypes.func.isRequired,
  onOverviewDelete: PropTypes.func.isRequired,
  onXPositionsChange: PropTypes.func.isRequired,
  onYPositionsChange: PropTypes.func.isRequired,
  onParametersChange: PropTypes.func.isRequired,
  keyActions: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
  pointsById: PropTypes.object.isRequired,
  pathsById: PropTypes.object.isRequired,
  activePaths: PropTypes.array.isRequired,
  activePoints: PropTypes.array.isRequired,
}

export default Overview
