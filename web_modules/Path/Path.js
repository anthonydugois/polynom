import React, { Component, PropTypes } from "react"
import cx from "classnames"
import { pathCode } from "../../src/utils"
import "./styles"

class Path extends Component {
  handleMouseDown = () => {
    this.props.onPathClick()
  };

  render() {
    const { path, pointsById } = this.props
    const d = pathCode(path, pointsById)

    return (
      <g
        className={ cx("ad-Path", { "is-filled": path.isFilled }) }
        onMouseDown={ this.handleMouseDown }>
        <path d={ d } />
      </g>
    )
  }
}

Path.propTypes = {
  onPathClick: PropTypes.func.isRequired,
  path: PropTypes.object.isRequired,
  pointsById: PropTypes.object.isRequired,
}

export default Path
