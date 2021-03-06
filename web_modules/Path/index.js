import "./styles"

import React, { Component, PropTypes } from "react"
import cx from "classnames"
import { path as snapPath } from "snapsvg"
import { SHIFT } from "../../src/constants/KeyActionTypes"
import * as ObjectTypes from "../../src/constants/ObjectTypes"
import { pathCode } from "../../src/utils"

class Path extends Component {
  handleMouseDown = (e) => {
    e.stopPropagation()

    const {
      keyActions,
      activePaths,
      activePoints,
      path,
    } = this.props

    if (!keyActions.includes(SHIFT)) {
      this.props.onDeactivate(activePaths, activePoints)
    }

    this.props.onActivate([path.id], path.points)
  };

  handlePathMouseDown = (e) => this.props.onMouseDown(
    e,
    this.props.path.points[0],
    ObjectTypes.PATH
  );

  render() {
    const {
      zoom,
      settings,
      path,
      globalPoints,
      localPoints,
    } = this.props

    const globalD = pathCode(path, globalPoints)
    const localD = pathCode(path, localPoints)
    const { x, y, width, height } = snapPath.getBBox(globalD)
    const strokeWidth = 1 / zoom

    return (
      <g
        className={ cx("ad-Path", { "is-active": path.isActive }) }
        onMouseDown={ this.handleMouseDown }>
        { settings.pathBoundingBoxShow && path.isActive && (
          <rect
            className="ad-Path-bbox"
            strokeWidth={ strokeWidth }
            x={ x }
            y={ y }
            width={ width }
            height={ height } />
        ) }

        <g onMouseDown={ this.handlePathMouseDown }>
          <path
            className="ad-Path-global"
            fill={ path.isFilled && "currentColor" }
            stroke={ path.isBordered && "currentColor" }
            strokeWidth={ path.isBordered && 5 }
            d={ globalD } />
          <path
            className="ad-Path-local"
            strokeWidth={ strokeWidth }
            d={ localD } />
        </g>
      </g>
    )
  }
}

Path.propTypes = {
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

export default Path
