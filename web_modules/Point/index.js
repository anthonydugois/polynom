import "./styles"

import React, { Component, PropTypes } from "react"
import cx from "classnames"
import { APP_SHIFT } from "../../src/constants/KeyActionTypes"
import * as ObjectTypes from "../../src/constants/ObjectTypes"
import * as VisibilityTypes from "../../src/constants/VisibilityTypes"

class Point extends Component {
  handleMouseDown = (e) => {
    e.stopPropagation()

    const {
      keyActions,
      activePaths,
      activePoints,
      path,
      point,
    } = this.props

    if (!keyActions.includes(APP_SHIFT)) {
      this.props.onDeactivate(activePaths, activePoints)
    }

    this.props.onActivate([path.id], [point.id])
  };

  handleMainMouseDown = (e) => {
    this.props.onMouseDown(e, this.props.point.id, ObjectTypes.POINT)
  };

  handleFirstAnchorMouseDown = (e) => {
    this.props.onMouseDown(e, this.props.point.id, ObjectTypes.POINT_ANCHOR_1)
  };

  handleSecondAnchorMouseDown = (e) => {
    this.props.onMouseDown(e, this.props.point.id, ObjectTypes.POINT_ANCHOR_2)
  };

  renderCode(w, h, { code, x, y, isActive }) {
    const { zoom, settings } = this.props
    const fz = .7 / zoom

    if (
      (settings.pointCodeShow === VisibilityTypes.ALL) ||
      (settings.pointCodeShow === VisibilityTypes.ACTIVE && isActive)
    ) {
      return (
        <text
          className="ad-MainPoint-code"
          x={ x }
          y={ y }
          dy={ -h }
          dx={ w }
          fontSize={ `${ fz }rem` }>
          { `${ code } (${ +x.toFixed(3) }, ${ +y.toFixed(3) })` }
        </text>
      )
    }

    return null
  }

  renderPoint(point) {
    const { zoom } = this.props
    const [w, h] = [6 / zoom, 6 / zoom]

    return (
      <g className="ad-MainPoint">
        { this.renderCode(w, h, point) }
        <rect
          className="ad-MainPoint-coords"
          strokeWidth={ 2 / zoom }
          x={ point.x - w / 2 }
          y={ point.y - h / 2 }
          width={ w }
          height={ h }
          onMouseDown={ this.handleMainMouseDown } />
      </g>
    )
  }

  renderQuadraticAnchors(point, previousPoint) {
    const { zoom } = this.props
    const r = 3 / zoom
    const strokeWidth = 1 / zoom
    const strokeDasharray = `${ 8 / zoom } ${ 8 / zoom }`

    return (
      <g className="ad-Anchor">
        <line
          className="ad-Anchor-line"
          strokeWidth={ strokeWidth }
          strokeDasharray={ strokeDasharray }
          x1={ previousPoint.x }
          y1={ previousPoint.y }
          x2={ point.parameters.x1 }
          y2={ point.parameters.y1 } />

        <line
          className="ad-Anchor-line"
          strokeWidth={ strokeWidth }
          strokeDasharray={ strokeDasharray }
          x1={ point.parameters.x1 }
          y1={ point.parameters.y1 }
          x2={ point.x }
          y2={ point.y } />

        <circle
          className="ad-Anchor-point"
          cx={ point.parameters.x1 }
          cy={ point.parameters.y1 }
          r={ r }
          onMouseDown={ this.handleFirstAnchorMouseDown } />
      </g>
    )
  }

  renderCubicAnchors(point, previousPoint) {
    const { zoom } = this.props
    const code = point.code.toLowerCase()
    const r = 3 / zoom
    const strokeWidth = 1 / zoom
    const strokeDasharray = `${ 8 / zoom } ${ 8 / zoom }`

    return (
      <g className="ad-Anchor">
        { code === "c" && (
          <line
            className="ad-Anchor-line"
            strokeWidth={ strokeWidth }
            strokeDasharray={ strokeDasharray }
            x1={ previousPoint.x }
            y1={ previousPoint.y }
            x2={ point.parameters.x1 }
            y2={ point.parameters.y1 } />
        ) }

        <line
          className="ad-Anchor-line"
          strokeWidth={ strokeWidth }
          strokeDasharray={ strokeDasharray }
          x1={ point.x }
          y1={ point.y }
          x2={ point.parameters.x2 }
          y2={ point.parameters.y2 } />

        { code === "c" && (
          <circle
            className="ad-Anchor-point"
            cx={ point.parameters.x1 }
            cy={ point.parameters.y1 }
            r={ r }
            onMouseDown={ this.handleFirstAnchorMouseDown } />
        ) }

        <circle
          className="ad-Anchor-point"
          cx={ point.parameters.x2 }
          cy={ point.parameters.y2 }
          r={ r }
          onMouseDown={ this.handleSecondAnchorMouseDown } />
      </g>
    )
  }

  render() {
    const { point, previousPoint } = this.props
    const code = point.code.toLowerCase()

    return (
      <g
        className={ cx("ad-Point", { "is-active": point.isActive }) }
        onMouseDown={ this.handleMouseDown }>
        { this.renderPoint(point) }

        { /* If there is a Bezier curve, render anchors */ }
        { (code === "q") &&
            this.renderQuadraticAnchors(point, previousPoint) }
        { (code === "c" || code === "s") &&
            this.renderCubicAnchors(point, previousPoint) }
      </g>
    )
  }
}

Point.propTypes = {
  zoom: PropTypes.number.isRequired,
  onActivate: PropTypes.func.isRequired,
  onDeactivate: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  keyActions: PropTypes.array.isRequired,
  activePaths: PropTypes.array.isRequired,
  activePoints: PropTypes.array.isRequired,
  path: PropTypes.object.isRequired,
  point: PropTypes.object.isRequired,
  previousPoint: PropTypes.object,
  onMouseDown: PropTypes.func.isRequired,
}

export default Point
