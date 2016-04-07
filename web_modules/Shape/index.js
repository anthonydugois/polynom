import "./styles"

import React, { Component, PropTypes } from "react"
import Point from "Point"
import Path from "Path"

class Shape extends Component {
  renderPoint = (key, index, keys) => {
    const {
      onActivate,
      onDeactivate,
      isDragging,
      zoom,
      keyActions,
      path,
      settings,
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
        isDragging={ isDragging }
        zoom={ zoom }
        keyActions={ keyActions }
        activePaths={ activePaths }
        activePoints={ activePoints }
        path={ path }
        settings={ settings }
        point={ localPoints[key] }
        previousPoint={ index > 0 ? localPoints[keys[index - 1]] : null }
        onMouseDown={ onMouseDown } />
    )
  };

  render() {
    const {
      onActivate,
      onDeactivate,
      zoom,
      keyActions,
      path,
      settings,
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
          zoom={ zoom }
          keyActions={ keyActions }
          path={ path }
          settings={ settings }
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
  settings: PropTypes.object.isRequired,
  globalPoints: PropTypes.object.isRequired,
  localPoints: PropTypes.object.isRequired,
  activePaths: PropTypes.array.isRequired,
  activePoints: PropTypes.array.isRequired,
  onMouseDown: PropTypes.func.isRequired,
}

export default Shape
