import React, { Component, PropTypes } from "react"
import { findDOMNode } from "react-dom"
import Grid from "Grid"
import Shape from "Shape"
import "./styles"

function getStyles(props) {
  const { width, height } = props.builder
  return { width, height }
}

class Overview extends Component {
  constructor(props) {
    super(props)

    this.isDragging = false
    this.coords = [0, 0]
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
    const { grid } = this.props.builder
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

  handlePointMouseDown = (e) => {
    this.isDragging = true
    this.coords = this.getCoords(e)
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

      const current = this.getCoords(e)
      const dx = current[0] - this.coords[0]
      const dy = current[1] - this.coords[1]

      this.props.onXPositionsChange(this.props.activePoints, dx)
      this.props.onYPositionsChange(this.props.activePoints, dy)

      this.coords = current
    }
  };

  handleOverviewDblClick = (e) => {
    const { pathsById, activePaths } = this.props

    if (activePaths.length > 0) {
      const path = pathsById[activePaths[0]]
      const [x, y] = this.getCoords(e)

      this.props.onOverviewDblClick(path.id, "L", x, y)
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
        onPointMouseDown={ this.handlePointMouseDown } />
    )
  };

  render() {
    const { builder } = this.props

    return (
      <svg
        className="ad-Overview"
        style={ getStyles(this.props) }
        onDoubleClick={ this.handleOverviewDblClick }>
        <Grid
          width={ builder.width }
          height={ builder.height }
          grid={ builder.grid } />

        { builder.paths.map(this.renderShape) }
      </svg>
    )
  }
}

Overview.propTypes = {
  onOverviewDblClick: PropTypes.func.isRequired,
  onXPositionsChange: PropTypes.func.isRequired,
  onYPositionsChange: PropTypes.func.isRequired,
  keyActions: PropTypes.array.isRequired,
  builder: PropTypes.object.isRequired,
  pointsById: PropTypes.object.isRequired,
  pathsById: PropTypes.object.isRequired,
  activePaths: PropTypes.array.isRequired,
  activePoints: PropTypes.array.isRequired,
}

export default Overview
