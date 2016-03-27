import "./styles"

import React, { Component, PropTypes } from "react"
import Snap from "snapsvg"
import { APP_SHIFT } from "../../src/constants/KeyActionTypes"
import * as ObjectTypes from "../../src/constants/ObjectTypes"
import { pathCode } from "../../src/utils"

class Path extends Component {
  handleMouseDown = (e) => {
    e.stopPropagation()

    const {
      keyActions,
      path,
      activePaths,
      activePoints,
    } = this.props

    if (!keyActions.includes(APP_SHIFT)) {
      this.props.onDeactivate(activePaths, activePoints)
    }

    this.props.onActivate([path.id], path.points)
  };

  handlePathMouseDown = (e) => {
    this.props.onMouseDown(e, this.props.path.points[0], ObjectTypes.PATH)
  };

  render() {
    const { path, globalPoints, localPoints } = this.props
    const globalD = pathCode(path, globalPoints)
    const localD = pathCode(path, localPoints)
    const { x, y, width, height } = Snap.path.getBBox(globalD)

    return (
      <g
        className="ad-Path"
        onMouseDown={ this.handleMouseDown }>
        { path.isActive && (
          <rect
            className="ad-Path-bbox"
            x={ x }
            y={ y }
            width={ width }
            height={ height } />
        ) }

        <g onMouseDown={ this.handlePathMouseDown }>
          <path
            className="ad-Path-global"
            d={ globalD } />

          { path.isActive && (
            <path
              className="ad-Path-local"
              d={ localD } />
          ) }
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
  globalPoints: PropTypes.object.isRequired,
  localPoints: PropTypes.object.isRequired,
  activePaths: PropTypes.array.isRequired,
  activePoints: PropTypes.array.isRequired,
  onMouseDown: PropTypes.func.isRequired,
}

export default Path
