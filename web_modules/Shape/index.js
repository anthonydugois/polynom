import React, { Component, PropTypes } from "react"
import Point from "Point"
import Path from "Path"
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
        onMouseDown={ this.props.onMouseDown } />
    )
  };

  render() {
    const { path } = this.props

    return (
      <g className="ad-Shape">
        <Path
          path={ path }
          keyActions={ this.props.keyActions }
          onMouseDown={ this.props.onMouseDown } />

        <g className="ad-Shape-points">
          { path.points.map(this.renderPoint) }
        </g>
      </g>
    )
  }
}

Shape.propTypes = {
  onMouseDown: PropTypes.func.isRequired,
  keyActions: PropTypes.array.isRequired,
  path: PropTypes.object.isRequired,
  pointsById: PropTypes.object.isRequired,
}

export default Shape
