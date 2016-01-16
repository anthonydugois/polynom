import React, { Component, PropTypes } from "react"
import cx from "classnames"
import Point from "Point"
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
    const { path, d, points } = this.props

    return (
      <g className={ cx("ad-Shape", { "is-active": path.isActive }) }>
        <path
          className={ cx("ad-Shape-path", { "is-filled": path.isFilled }) }
          d={ d } />

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
  d: PropTypes.string.isRequired,
  points: PropTypes.array.isRequired,
}

export default Shape
