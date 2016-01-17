import React, { Component, PropTypes } from "react"
import cx from "classnames"
import Point from "Point"
import "./styles"

import pathCode from "../../src/utils/pathCode"

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
        onPointMouseDown={ this.props.onPointMouseDown } />
    )
  };

  render() {
    const { path, points } = this.props

    return (
      <g className={ cx("ad-Shape", { "is-active": path.isActive }) }>
        <path
          className={ cx("ad-Shape-path", { "is-filled": path.isFilled }) }
          d={ pathCode(path, points) } />

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
}

export default Shape
