import React, { Component, PropTypes } from "react"
import Point from "Point"
import cx from "classnames"
import "./styles"

class Shape extends Component {
  renderPoint = (point, index, points) => (
    <Point
      key={ point.id }
      point={ point }
      previousPoint={ index > 0 ? points[index - 1] : null }
      onPointClick={ () => this.props.onPointClick(point.id) } />
  );

  render() {
    const { path, points } = this.props

    return (
      <g className={ cx("ad-Shape", { "is-active": path.isActive }) }>
        <path
          className={ cx("ad-Shape-path", { "is-filled": path.isFilled }) } />

        <g className="ad-Shape-points">
          { points.map(this.renderPoint) }
        </g>
      </g>
    )
  }
}

Shape.propTypes = {
  onPointClick: PropTypes.func.isRequired,
  path: PropTypes.object.isRequired,
  points: PropTypes.array.isRequired,
}

export default Shape
