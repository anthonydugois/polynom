import "./styles"

import React, { Component, PropTypes } from "react"
import Grid from "Grid"
import Shape from "Shape"
import * as KeyActionTypes from "../../src/constants/KeyActionTypes"
import * as ObjectTypes from "../../src/constants/ObjectTypes"
import { clamp } from "../../src/utils"

class Overview extends Component {
  constructor(props) {
    super(props)

    this.draggedPoint = null
    this.draggedObject = null
    this.mouseDownCoords = [0, 0]
  }

  state = {
    isDragging: false,
    coords: [0, 0],
    localPoints: this.props.pointsById,
    zoom: 1,
  };

  componentDidMount() {
    document.addEventListener("mousemove", this.handleMouseMove)
    document.addEventListener("mouseup", this.handleMouseUp)
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.handleMouseMove)
    document.removeEventListener("mouseup", this.handleMouseUp)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ localPoints: nextProps.pointsById })
  }

  getCoords = (e) => {
    const { project } = this.props
    const { zoom } = this.state
    const { left, top } = this.svg.getBoundingClientRect()

    let x = Math.round(e.clientX - left)
    let y = Math.round(e.clientY - top)

    // grid snaping
    if (project.gridSnap) {
      x = project.gridSize * Math.round(x / project.gridSize)
      y = project.gridSize * Math.round(y / project.gridSize)
    }

    x = +(x / zoom).toFixed(0)
    y = +(y / zoom).toFixed(0)

    return [x, y]
  };

  handleMouseDown = (e, draggedPoint, draggedObject) => {
    this.draggedPoint = draggedPoint
    this.draggedObject = draggedObject
    this.mouseDownCoords = this.getCoords(e)

    this.setState({
      coords: this.mouseDownCoords,
      isDragging: true,
    })
  };

  handleMouseUp = (e) => {
    if (this.state.isDragging) {
      const coords = this.getCoords(e)

      switch (this.draggedObject) {
      case ObjectTypes.PATH:
      case ObjectTypes.POINT:
        this.props.onXPositionsChange(
          this.props.activePoints,
          coords[0] - this.mouseDownCoords[0]
        )
        this.props.onYPositionsChange(
          this.props.activePoints,
          coords[1] - this.mouseDownCoords[1]
        )
        break

      case ObjectTypes.POINT_ANCHOR_1:
        this.props.onParametersChange(
          this.draggedPoint,
          { x1: coords[0], y1: coords[1] },
        )
        break

      case ObjectTypes.POINT_ANCHOR_2:
        this.props.onParametersChange(
          this.draggedPoint,
          { x2: coords[0], y2: coords[1] },
        )
        break
      }

      this.setState({ isDragging: false })
    }
  };

  handleMouseMove = (e) => {
    const coords = this.getCoords(e)

    if (this.state.isDragging) {
      e.preventDefault()

      this.setState({
        coords,
        localPoints: this.getLocalPoints(coords),
      })
    } else {
      this.setState({ coords })
    }
  };

  getLocalPoints(coords) {
    switch (this.draggedObject) {
    case ObjectTypes.PATH:
    case ObjectTypes.POINT:
      return this.movePoints(
        coords[0] - this.state.coords[0],
        coords[1] - this.state.coords[1]
      )

    case ObjectTypes.POINT_ANCHOR_1:
      return this.moveFirstAnchor(coords)

    case ObjectTypes.POINT_ANCHOR_2:
      return this.moveSecondAnchor(coords)

    default:
      return this.state.localPoints
    }
  }

  movePoints(dx, dy) {
    return Object.keys(this.state.localPoints).reduce(
      (acc, key) => {
        const point = this.state.localPoints[key]

        return {
          ...acc,
          [point.id]: !this.props.activePoints.includes(point.id) ? point : {
            ...point,
            x: point.x + dx,
            y: point.y + dy,
            parameters: {
              ...point.parameters,
              ...typeof point.parameters.x1 !== "undefined"
                && { x1: point.parameters.x1 + dx },
              ...typeof point.parameters.y1 !== "undefined"
                && { y1: point.parameters.y1 + dy },
              ...typeof point.parameters.x2 !== "undefined"
                && { x2: point.parameters.x2 + dx },
              ...typeof point.parameters.y2 !== "undefined"
                && { y2: point.parameters.y2 + dy },
            },
          },
        }
      },
      {}
    )
  }

  moveFirstAnchor([x1, y1]) {
    const point = this.state.localPoints[this.draggedPoint]

    return {
      ...this.state.localPoints,
      [point.id]: {
        ...point,
        parameters: { ...point.parameters, x1, y1 },
      },
    }
  }

  moveSecondAnchor([x2, y2]) {
    const point = this.state.localPoints[this.draggedPoint]

    return {
      ...this.state.localPoints,
      [point.id]: {
        ...point,
        parameters: { ...point.parameters, x2, y2 },
      },
    }
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
        this.props.onXPositionsChange(
          this.props.activePoints,
          project.gridSnap ?
            -project.gridSize :
            -project.keyboardIncrement
        )
      }

      if (keyActions.includes(KeyActionTypes.OVERVIEW_RIGHT)) {
        e.preventDefault()
        this.props.onXPositionsChange(
          this.props.activePoints,
          project.gridSnap ?
            project.gridSize :
            project.keyboardIncrement
        )
      }

      // y increment
      if (keyActions.includes(KeyActionTypes.OVERVIEW_UP)) {
        e.preventDefault()
        this.props.onYPositionsChange(
          this.props.activePoints,
          project.gridSnap ?
            -project.gridSize :
            -project.keyboardIncrement
        )
      }

      if (keyActions.includes(KeyActionTypes.OVERVIEW_DOWN)) {
        e.preventDefault()
        this.props.onYPositionsChange(
          this.props.activePoints,
          project.gridSnap ?
            project.gridSize :
            project.keyboardIncrement
        )
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
      activePaths,
      activePoints,
    } = this.props

    return (
      <Shape
        key={ key }
        zoom={ this.state.zoom }
        onActivate={ onActivate }
        onDeactivate={ onDeactivate }
        project={ project }
        keyActions={ keyActions }
        path={ pathsById[key] }
        globalPoints={ this.props.pointsById }
        localPoints={ this.state.localPoints }
        activePaths={ activePaths }
        activePoints={ activePoints }
        onMouseDown={ this.handleMouseDown } />
    )
  };

  handleDoubleClick = (e) => {
    this.setState({ zoom: this.state.zoom === 1 ? 3 : 1 })
  };

  render() {
    const { project } = this.props
    const { zoom } = this.state
    const x = clamp(this.state.coords[0], 0, project.width)
    const y = clamp(this.state.coords[1], 0, project.height)

    return (
      <div className="ad-Overview">
        <svg
          ref={ (svg) => this.svg = svg }
          tabIndex={ 1 }
          className="ad-Overview-svg"
          width={ project.width }
          height={ project.height }
          viewBox={ `0 0 ${ project.width / zoom } ${ project.height / zoom }` }
          onDoubleClick={ this.handleDoubleClick }
          onMouseDown={ this.handleOverviewMouseDown }
          onKeyDown={ this.handleKeyDown }>
          <Grid
            zoom={ zoom }
            project={ project } />

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
