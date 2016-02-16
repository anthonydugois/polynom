import React, { Component, PropTypes } from "react"
import cx from "classnames"
import Snap from "snapsvg"
import { APP_CTRL } from "../../src/constants/KeyActionTypes"
import * as ObjectTypes from "../../src/constants/ObjectTypes"
import { pathCode } from "../../src/utils"
import "./styles"

class Path extends Component {
  handleMouseDown = () => {
    if (this.props.keyActions.includes(APP_CTRL)) {
      this.props.onPathAddActive()
    } else {
      this.props.onPathActive()
    }
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
  onPathAddActive: PropTypes.func.isRequired,
  onPathActive: PropTypes.func.isRequired,
  path: PropTypes.object.isRequired,
  pointsById: PropTypes.object.isRequired,
  keyActions: PropTypes.array.isRequired,
  onMouseDown: PropTypes.func.isRequired,
}

export default Path
