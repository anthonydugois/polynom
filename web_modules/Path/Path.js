import React, { Component, PropTypes } from "react"
import cx from "classnames"
import * as ObjectTypes from "../../src/constants/ObjectTypes"
import { pathCode } from "../../src/utils"
import "./styles"

class Path extends Component {
  handleMouseDown = () => {
    this.props.onPathClick()
  };

  handlePathMouseDown = (e) => {
    this.props.onMouseDown(e, this.props.path.points[0], ObjectTypes.PATH)
  };

  render() {
    const { path, pointsById } = this.props
    const d = pathCode(path, pointsById)

    return (
      <g
        className={ cx("ad-Path", { "is-filled": path.isFilled }) }
        onMouseDown={ this.handleMouseDown }>
        <path
          d={ d }
          onMouseDown={ this.handlePathMouseDown } />
      </g>
    )
  }
}

Path.propTypes = {
  onPathClick: PropTypes.func.isRequired,
  path: PropTypes.object.isRequired,
  pointsById: PropTypes.object.isRequired,
  onMouseDown: PropTypes.func.isRequired,
}

export default Path
