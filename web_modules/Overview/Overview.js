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
    const { grid } = this.props
    const { left, top } = findDOMNode(this).getBoundingClientRect()

    let x = Math.round(e.clientX - left)
    let y = Math.round(e.clientY - top)

    // grid snaping
    if (grid.snapToGrid) {
      x = grid.size * Math.round(x / grid.size)
      y = grid.size * Math.round(y / grid.size)
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

    this.props.onXPositionsChange(activePoints, dx)
    this.props.onYPositionsChange(activePoints, dy)
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

  handleClick = (e) => {
    if (this.props.keyActions.includes(APP_CTRL)) {
      const { pathsById, activePaths } = this.props
      const [x, y] = this.getCoords(e)

      if (activePaths.length === 1) {
        const path = pathsById[activePaths[0]]

        this.props.onOverviewCreatePoint(path.id, "L", x, y, {})
      } else {
        this.props.onOverviewCreatePath(x, y)
      }
    } else {
      this.props.onOverviewDeactivate()
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
    const path = this.props.pathsById[key]

    return (
      <Shape
        key={ key }
        path={ path }
        pointsById={ this.props.pointsById }
        keyActions={ this.props.keyActions }
        onMouseDown={ this.handleMouseDown } />
    )
  };

  render() {
    const { project, grid } = this.props

    return (
      <svg
        tabIndex={ 1 }
        className="ad-Overview"
        style={ getStyles(this.props) }
        onClick={ this.handleClick }
        onKeyDown={ this.handleKeyDown }>
        <Grid
          width={ project.width }
          height={ project.height }
          grid={ grid } />

        { project.paths.map(this.renderShape) }
      </svg>
    )
  }
}

Overview.propTypes = {
  onOverviewCreatePath: PropTypes.func.isRequired,
  onOverviewCreatePoint: PropTypes.func.isRequired,
  onOverviewDeactivate: PropTypes.func.isRequired,
  onOverviewDelete: PropTypes.func.isRequired,
  onXPositionsChange: PropTypes.func.isRequired,
  onYPositionsChange: PropTypes.func.isRequired,
  onParametersChange: PropTypes.func.isRequired,
  keyActions: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
  grid: PropTypes.object.isRequired,
  pointsById: PropTypes.object.isRequired,
  pathsById: PropTypes.object.isRequired,
  activePaths: PropTypes.array.isRequired,
  activePoints: PropTypes.array.isRequired,
}

export default Overview
