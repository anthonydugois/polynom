import React, { Component, PropTypes } from "react"
import cx from "classnames"
import Point from "./Point"
import "./styles"

class PointGroup extends Component {
  static propTypes = {
    point: PropTypes.object.isRequired,
  }

  render() {
    const {
      point,
    } = this.props

    return (
      <g className={ cx("ad-PointGroup", { "is-active": point.isActive }) }>
        <Point
          x={ point.parameters.x }
          y={ point.parameters.y } />
      </g>
    )
  }
}

export default PointGroup
