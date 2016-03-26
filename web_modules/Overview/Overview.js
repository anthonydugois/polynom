import "./styles"

import React, { Component, PropTypes } from "react"
import Grid from "Grid"
import Shape from "Shape"
import * as KeyActionTypes from "../../src/constants/KeyActionTypes"
import * as ObjectTypes from "../../src/constants/ObjectTypes"
import { inRange } from "../../src/utils"

class Overview extends Component {
  constructor(props) {
    super(props)

    this.draggedPoint = null
    this.draggedObject = null
  }

  state = {
    isDragging: false,
    coords: [0, 0],
  };

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
    const { left, top } = this.svg.getBoundingClientRect()

    let x = Math.round(e.clientX - left)
    let y = Math.round(e.clientY - top)

    // grid snaping
    if (project.gridSnap) {
      x = project.gridSize * Math.round(x / project.gridSize)
      y = project.gridSize * Math.round(y / project.gridSize)
    }

    x = inRange(x, 0, project.width)
    y = inRange(y, 0, project.height)

    return [x, y]
  };

  handleMouseDown = (e, draggedPoint, draggedObject) => {
    this.draggedPoint = draggedPoint
    this.draggedObject = draggedObject

    this.setState({
      coords: this.getCoords(e),
      isDragging: true,
    })
  };

  handleMouseUp = () => {
    if (this.state.isDragging) {
      this.setState({ isDragging: false })
    }
  };

  handleMouseMove = (e) => {
    const coords = this.getCoords(e)

    if (this.state.isDragging) {
      e.preventDefault()

      switch (this.draggedObject) {
      case ObjectTypes.PATH:
      case ObjectTypes.POINT:
        this.movePoints(
          coords[0] - this.state.coords[0],
          coords[1] - this.state.coords[1]
        )
        break

      case ObjectTypes.POINT_ANCHOR_1:
        this.moveFirstAnchor(coords)
        break

      case ObjectTypes.POINT_ANCHOR_2:
        this.moveSecondAnchor(coords)
        break
      }
    }

    this.setState({ coords })
  };

  movePoints(dx, dy) {
    if (dx !== 0) {
      this.props.onXPositionsChange(this.props.activePoints, dx)
    }

    if (dy !== 0) {
      this.props.onYPositionsChange(this.props.activePoints, dy)
    }
  }

  moveFirstAnchor([x1, y1]) {
    this.props.onParametersChange(this.draggedPoint, { x1, y1 })
  }

  moveSecondAnchor([x2, y2]) {
    this.props.onParametersChange(this.draggedPoint, { x2, y2 })
  }

  handleOverviewMouseDown = (e) => {
    const {
      keyActions,
      activePaths,
      activePoints,
    } = this.props

    if (keyActions.includes(KeyActionTypes.APP_CTRL)) {
      const [x, y] = this.getCoords(e)

      if (activePaths.length === 1) {
        this.props.onOverviewCreatePoint(activePaths[0], "L", x, y, {})
      } else {
        this.props.onOverviewCreatePath(x, y)
      }
    } else if (activePaths.length > 0 || activePoints.length > 0) {
      this.props.onDeactivate(activePaths, activePoints)
    }
  };

  handleKeyDown = (e) => {
    const {
      keyActions,
      project,
      activePoints,
    } = this.props

    if (activePoints.length > 0) {
      if (keyActions.includes(KeyActionTypes.OVERVIEW_DEL)) {
        e.preventDefault()
        this.props.onOverviewDelete(activePoints)
      }

      // x increment
      if (keyActions.includes(KeyActionTypes.OVERVIEW_LEFT)) {
        e.preventDefault()
        this.movePoints(-project.keyboardIncrement, 0)
      }

      if (keyActions.includes(KeyActionTypes.OVERVIEW_RIGHT)) {
        e.preventDefault()
        this.movePoints(project.keyboardIncrement, 0)
      }

      // y increment
      if (keyActions.includes(KeyActionTypes.OVERVIEW_UP)) {
        e.preventDefault()
        this.movePoints(0, -project.keyboardIncrement)
      }

      if (keyActions.includes(KeyActionTypes.OVERVIEW_DOWN)) {
        e.preventDefault()
        this.movePoints(0, project.keyboardIncrement)
      }
    }
  };

  renderShape = (key) => {
    const {
      onActivate,
      onDeactivate,
      keyActions,
      project,
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
        project={ project }
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
    const [x, y] = this.state.coords

    return (
      <div className="ad-Overview">
        <svg
          ref={ (svg) => this.svg = svg }
          tabIndex={ 1 }
          className="ad-Overview-svg"
          width={ project.width }
          height={ project.height }
          viewBox={ `0 0 ${ project.width } ${ project.height }` }
          onMouseDown={ this.handleOverviewMouseDown }
          onKeyDown={ this.handleKeyDown }>
          <Grid project={ project } />

          { project.paths.map(this.renderShape) }
        </svg>

        <ul className="ad-Overview-infos">
          <li className="ad-Overview-info">
            { `x: ${ x }, y: ${ y }` }
          </li>
        </ul>
      </div>
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
