import React, { Component, PropTypes } from "react"
import cx from "classnames"
import Point from "Point"
import Path from "Path"
import "./styles"

class Shape extends Component {
  renderPoint = (key, index, keys) => {
    const {
      onActivate,
      onDeactivate,
      keyActions,
      path,
      pointsById,
      activePaths,
      activePoints,
      onMouseDown,
    } = this.props

    return (
      <Point
        key={ key }
        onActivate={ onActivate }
        onDeactivate={ onDeactivate }
        keyActions={ keyActions }
        activePaths={ activePaths }
        activePoints={ activePoints }
        path={ path }
        point={ pointsById[key] }
        previousPoint={ index > 0 ? pointsById[keys[index - 1]] : null }
        onMouseDown={ onMouseDown } />
    )
  };

  render() {
    const {
      onActivate,
      onDeactivate,
      keyActions,
      path,
      pointsById,
      activePaths,
      activePoints,
      onMouseDown,
    } = this.props

    return (
      <g className="ad-Shape">
        <Path
          onActivate={ onActivate }
          onDeactivate={ onDeactivate }
          keyActions={ keyActions }
          path={ path }
          pointsById={ pointsById }
          activePaths={ activePaths }
          activePoints={ activePoints }
          onMouseDown={ onMouseDown } />

        <g className={ cx("ad-Shape-points", { "is-shown": path.isActive }) }>
          { path.points.map(this.renderPoint) }
        </g>
      </g>
    )
  }
}

Shape.propTypes = {
  onActivate: PropTypes.func.isRequired,
  onDeactivate: PropTypes.func.isRequired,
  keyActions: PropTypes.array.isRequired,
  path: PropTypes.object.isRequired,
  pointsById: PropTypes.object.isRequired,
  activePaths: PropTypes.array.isRequired,
  activePoints: PropTypes.array.isRequired,
  onMouseDown: PropTypes.func.isRequired,
}

export default Shape
