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
  state = {
    isDragging: false,
    draggedPoint: null,
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
    const { grid } = this.props.builder
    const { left, top } = findDOMNode(this).getBoundingClientRect()

    let x = Math.round(e.clientX - left)
    let y = Math.round(e.clientY - top)

    // grid snaping
    if (grid.snapToGrid) {
      x = grid.size * Math.round(x / grid.size)
      y = grid.size * Math.round(y / grid.size)
    }

    return { x, y }
  };

  handlePointMouseDown = (key) => {
    this.setState({
      isDragging: true,
      draggedPoint: key,
    })
  };

  handleMouseUp = () => {
    if (this.state.isDragging) {
      this.setState({
        isDragging: false,
        draggedPoint: null,
      })
    }
  };

  handleMouseMove = (e) => {
    if (this.state.isDragging) {
      e.preventDefault()

      const { x, y } = this.getCoords(e)

      this.props.onXPositionChange(this.state.draggedPoint, x)
      this.props.onYPositionChange(this.state.draggedPoint, y)
    }
  };

  handleOverviewDblClick = (e) => {
    const { pathsById, activePaths } = this.props
    const path = pathsById[activePaths[0]]
    const { x, y } = this.getCoords(e)

    this.props.onOverviewDblClick(path.id, "L", x, y)
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
  onXPositionChange: PropTypes.func.isRequired,
  onYPositionChange: PropTypes.func.isRequired,
  keyActions: PropTypes.array.isRequired,
  builder: PropTypes.object.isRequired,
  pointsById: PropTypes.object.isRequired,
  pathsById: PropTypes.object.isRequired,
  activePaths: PropTypes.array.isRequired,
}

export default Overview
