import React, { Component, PropTypes } from "react"
import cx from "classnames"
import Point from "Point"
import pathCode from "../../src/utils/pathCode"
import "./styles"

class Shape extends Component {
  renderPoint = (key, index, keys) => {
    const { path, pointsById } = this.props
    const point = pointsById[key]

    return (
      <Point
        key={ key }
        path={ path }
        point={ point }
        previousPoint={ index > 0 ? pointsById[keys[index - 1]] : null }
        keyActions={ this.props.keyActions }
        onPointMouseDown={ this.props.onPointMouseDown } />
    )
  };

  render() {
    const { path, pointsById } = this.props

    return (
      <g className={ cx("ad-Shape", { "is-active": path.isActive }) }>
        <path
          className={ cx("ad-Shape-path", { "is-filled": path.isFilled }) }
          d={ pathCode(path, pointsById) } />

        <g className="ad-Shape-points">
          { path.points.map(this.renderPoint) }
        </g>
      </g>
    )
  }
}

Shape.propTypes = {
  onPointMouseDown: PropTypes.func.isRequired,
  keyActions: PropTypes.array.isRequired,
  path: PropTypes.object.isRequired,
  pointsById: PropTypes.object.isRequired,
}

export default Shape
