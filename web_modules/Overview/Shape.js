import React, { Component, PropTypes } from "react"
import Point from "Point"
import cx from "classnames"

class Shape extends Component {
  static propTypes = {
    path: PropTypes.object.isRequired,
  };

  renderPoint(point, previousPoint) {
    return (
      <Point
        key={ point.id }
        point={ point }
        previousPoint={ previousPoint || null } />
    )
  }

  render() {
    const {
      path,
    } = this.props

    return (
      <g className={ cx("ad-Shape", { "is-active": path.isActive }) }>
        <path
          className={ cx("ad-Path", { "is-filled": path.isFilled }) } />

        <g className="ad-Points">
          {
            path.points.map((point, index, points) =>
              this.renderPoint(point, index > 0 && points[index - 1]))
          }
        </g>
      </g>
    )
  }
}

export default Shape

/*import React from "react"
import cx from "classnames"

import PointGroup from "PointGroup"

import getPath from "../../src/utils/path"

function Shape(props) {
  const {
    shape,
    activePath,
    path,
    setActivePath,
    drag,
  } = props

  const {
    closed,
    relative,
    filled,
    activePoint,
    points,
  } = path

  const circles = points.map((point, index, _points) => {
    const prev = index !== 0 ? _points[index - 1] : false

    return (
      <PointGroup
        key={ index }
        pointGroup={ index }
        shape={ shape }
        activePoint={ activePoint }
        point={ point }
        prev={ prev }
        drag={ drag } />
    )
  })

  return (
    <g className={ cx("ad-Shape", { "is-active": shape === activePath }) }>
      <path
        className={ cx("ad-Path", { "ad-Path--filled": filled }) }
        d={ getPath(points, closed, relative) }
        onClick={ (e) => setActivePath(e, shape) }/>

      <g className="ad-Points">
        { circles }
      </g>
    </g>
  )
}

export default Shape*/
