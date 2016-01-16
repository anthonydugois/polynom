import React, { Component, PropTypes } from "react"
import cx from "classnames"
import Point from "Point"
import "./styles"

import pathCode from "../../src/utils/pathCode"

function getPath(props) {
  const {
    path,
    points,
    isDragging,
    draggedPoint,
    x,
    y,
  } = props

  if (isDragging && path.points.indexOf(draggedPoint) > -1) {
    points[draggedPoint].x = x
    points[draggedPoint].y = y
  }

  return pathCode(path, points)
}

class Shape extends Component {
  renderPoint = (key, index, keys) => {
    const { points } = this.props
    const point = points[key]

    return (
      <Point
        key={ key }
        point={ point }
        previousPoint={ index > 0 ? points[keys[index - 1]] : null }
        onPointClick={ () => this.props.onPointClick(point.id) }
        onPointMouseDown={ this.props.onPointMouseDown }
        isDragging={ this.props.isDragging }
        draggedPoint={ this.props.draggedPoint }
        x={ this.props.x }
        y={ this.props.y } />
    )
  };

  render() {
    const { path } = this.props

    return (
      <g className={ cx("ad-Shape", { "is-active": path.isActive }) }>
        <path
          className={ cx("ad-Shape-path", { "is-filled": path.isFilled }) }
          d={ getPath(this.props) } />

        <g className="ad-Shape-points">
          { path.points.map(this.renderPoint) }
        </g>
      </g>
    )
  }
}

Shape.propTypes = {
  onPointClick: PropTypes.func.isRequired,
  onPointMouseDown: PropTypes.func.isRequired,
  path: PropTypes.object.isRequired,
  points: PropTypes.object.isRequired,
  isDragging: PropTypes.bool,
  draggedPoint: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
}

export default Shape
