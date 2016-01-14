import React, { Component, PropTypes } from "react"
import Point from "Point"
import cx from "classnames"
import "./styles"

class Shape extends Component {
  renderPoint = (point, index, points) => {
    return (
      <Point
        key={ point.id }
        point={ point }
        previousPoint={ index > 0 ? points[index - 1] : null }
        onPointClick={ () =>
          this.props.onPointClick(point.id) } />
    )
  };

  render() {
    const {
      path,
      points,
    } = this.props

    return (
      <g className={ cx("ad-Shape", { "is-active": path.isActive }) }>
        <path
          className={ cx("ad-Shape-path", { "is-filled": path.isFilled }) } />

        { points.map(this.renderPoint) }
      </g>
    )
  }
}

Shape.propTypes = {
  onPointClick: PropTypes.func.isRequired,
  path: PropTypes.object.isRequired,
  points: PropTypes.array.isRequired,
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
