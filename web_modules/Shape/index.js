import React, { Component, PropTypes } from "react"
import cx from "classnames"
import Point from "Point"
import pathCode from "../../src/utils/pathCode"
import "./styles"

class Shape extends Component {
  renderPoint = (key, index, keys) => {
    const { pointsById } = this.props
    const point = pointsById[key]

    return (
      <Point
        key={ key }
        point={ point }
        previousPoint={ index > 0 ? pointsById[keys[index - 1]] : null }
        onPointClick={ () => this.props.onPointClick(point.id) }
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
  onPointClick: PropTypes.func.isRequired,
  onPointMouseDown: PropTypes.func.isRequired,
  path: PropTypes.object.isRequired,
  pointsById: PropTypes.object.isRequired,
}

export default Shape
