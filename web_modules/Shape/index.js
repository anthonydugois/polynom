import React, { Component, PropTypes } from "react"
import Point from "Point"
import Path from "Path"
import { pathCode } from "../../src/utils"
import boundingBox from "svg-path-bounding-box"
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
    const { path, pointsById } = this.props
    const d = pathCode(path, pointsById)
    const { minX, minY, width, height } = boundingBox(d)

    return (
      <g className="ad-Shape">
        { path.isActive && (
          <rect
            className="ad-Shape-rect"
            x={ minX }
            y={ minY }
            width={ width }
            height={ height } />
        ) }

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
