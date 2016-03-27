import "./styles"

import React, { Component, PropTypes } from "react"
import Point from "Point"
import Path from "Path"

class Shape extends Component {
  renderPoint = (key, index, keys) => {
    const {
      onActivate,
      onDeactivate,
      project,
      keyActions,
      path,
      localPoints,
      activePaths,
      activePoints,
      onMouseDown,
    } = this.props

    return (
      <Point
        key={ key }
        onActivate={ onActivate }
        onDeactivate={ onDeactivate }
        project={ project }
        keyActions={ keyActions }
        activePaths={ activePaths }
        activePoints={ activePoints }
        path={ path }
        point={ localPoints[key] }
        previousPoint={ index > 0 ? localPoints[keys[index - 1]] : null }
        onMouseDown={ onMouseDown } />
    )
  };

  render() {
    const {
      onActivate,
      onDeactivate,
      keyActions,
      path,
      globalPoints,
      localPoints,
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
          globalPoints={ globalPoints }
          localPoints={ localPoints }
          activePaths={ activePaths }
          activePoints={ activePoints }
          onMouseDown={ onMouseDown } />

        { path.isActive && (
          <g className="ad-Shape-points">
            { path.points.map(this.renderPoint) }
          </g>
        ) }
      </g>
    )
  }
}

Shape.propTypes = {
  onActivate: PropTypes.func.isRequired,
  onDeactivate: PropTypes.func.isRequired,
  keyActions: PropTypes.array.isRequired,
  path: PropTypes.object.isRequired,
  globalPoints: PropTypes.object.isRequired,
  localPoints: PropTypes.object.isRequired,
  activePaths: PropTypes.array.isRequired,
  activePoints: PropTypes.array.isRequired,
  onMouseDown: PropTypes.func.isRequired,
}

export default Shape
