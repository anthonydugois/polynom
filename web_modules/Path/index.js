import "./styles"

import React, { Component, PropTypes } from "react"
import cx from "classnames"
import Snap from "snapsvg"
import { APP_CTRL } from "../../src/constants/KeyActionTypes"
import * as ObjectTypes from "../../src/constants/ObjectTypes"
import { pathCode } from "../../src/utils"

class Path extends Component {
  handleMouseDown = (e) => {
    e.stopPropagation()

    const {
      path,
      activePaths,
      activePoints,
    } = this.props

    if (!this.props.keyActions.includes(APP_CTRL)) {
      this.props.onDeactivate(activePaths, activePoints)
    }

    this.props.onActivate([path.id], path.points)
  };

  handlePathMouseDown = (e) => {
    this.props.onMouseDown(e, this.props.path.points[0], ObjectTypes.PATH)
  };

  render() {
    const { path, pointsById } = this.props
    const d = pathCode(path, pointsById)
    const { x, y, width, height } = Snap.path.getBBox(d)

    return (
      <g
        className={ cx("ad-Path", { "is-filled": path.isFilled }) }
        onMouseDown={ this.handleMouseDown }>
        { path.isActive && (
          <rect
            className="ad-Path-bbox"
            x={ x }
            y={ y }
            width={ width }
            height={ height } />
        ) }

        <path
          d={ d }
          onMouseDown={ this.handlePathMouseDown } />
      </g>
    )
  }
}

Path.propTypes = {
  onActivate: PropTypes.func.isRequired,
  onDeactivate: PropTypes.func.isRequired,
  keyActions: PropTypes.array.isRequired,
  path: PropTypes.object.isRequired,
  pointsById: PropTypes.object.isRequired,
  activePaths: PropTypes.array.isRequired,
  activePoints: PropTypes.array.isRequired,
  onMouseDown: PropTypes.func.isRequired,
}

export default Path
